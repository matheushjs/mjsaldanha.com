
Here we give details regarding the `ggamma` package that we developed.
Mainly, we compare our implementation of the generalized gamma distribution with the one offered
  by the `flexsurv` package.

Note that the source code can be found in the [GitHub repository](https://github.com/matheushjs/ggamma).

## Efficient Implementation of the Generalized Gamma

Our implementation was mainly motivated by the slow performance of existing implementations.
Let us first elaborate on the formulas for the distribution, and then discuss its implementation
  and performance.

### Formulas

The generalized gamma was proposed by Stacy, E. W. [1] with parameters $a, d, p$, but we use the reparametrization
$$
  a = a
$$
$$
  b = p
$$
$$
  k = \frac{d}{p}
$$
similar to how `flexsurv` does (they offer two parametrizations, this is one of them).

The distribution function is
$$
  f(x) = \frac{b x^{bk-1} \exp[-(x/a)^b]}{a^{bk} \Gamma(k)}
$$
and the cumulative distribution function is
$$
F(x) = \frac{\gamma(k, (x/a)^p)}{\Gamma(k)}
$$
where $\gamma(s, x) = \int_0^x t^{s-1} e^{-t} dt$ is the lower incomplete gamma function.

In order to find the quantile function, we would need to invert such $F(x)$, which is not a trivial task due to the use of the gamma function.
However, recall that the cumulative distribution function for a $Gamma(\alpha, \beta)$ with $\alpha = k$ and $\beta = 1$ is
$$
  G(x) = \frac{\gamma(k, x)}{\Gamma(k)}
$$
so $F(x)$ can be rewritten as
$$
  F(x) = G((x/a)^p)
$$

We thus run into a case of a $G(h(x)) = G \circ h$ whose inverse is $h^{-1} \circ G^{-1}$, which would give the quantile function for $F$ in terms of the quantile function for the Gamma distribution $G^{-1}$. The relation is as follows
$$
  F^{-1}(y) = a \cdot (G^{-1}(y))^\frac{1}{p}
$$
which is how we compute the quantile function for the generalized gamma.

### Implementation

Our previous experience with implementing the `elfDistr` package showed that using C++ not necessarily leads to better performance.
To test this, we use the following code (we actually tested more scenarios, but these two will suffice here):
```R
require(Rcpp)
require(microbenchmark)

dggamma1 = function(x, a, b, k, log=F){
	result = log(b) - lgamma(k) + (b*k - 1)*log(x) - (b*k)*log(a) - (x/a)**b;
	if(!log) result = exp(result);
	return(result);
}

cppFunction("
	NumericVector dggamma4(
		NumericVector &vx,
		NumericVector &va,
		NumericVector &vb,
		NumericVector &vk,
		const bool &log_prob = false
	){
		int maxLength = std::max({
			vx.length(),
			va.length(),
			vb.length(),
			vk.length()
		});
		NumericVector p(maxLength);
		for(int i = 0; i < maxLength; i++){
			const double x = vx[i % vx.length()];
			const double a = va[i % va.length()];
			const double b = vb[i % vb.length()];
			const double k = vk[i % vk.length()];
			p[i] = std::log(b) - R::lgammafn(k) + (b*k - 1)*std::log(x) - (b*k)*std::log(a) - std::pow(x/a, b);
		}
		if(!log_prob)
			p = Rcpp::exp(p);
		return p;
	}
");

x = seq(0, 10, length=10000);
result = microbenchmark(
	dggamma1(x, 1, 1, 1),
	dggamma4(x, 1, 1, 1),
	unit="ms",
	times=1000,
	control=list(warmup=100)
)
print(summary(result))
```

This code yields the following output
```plaintext
> source("test.r")
                  expr      min       lq      mean    median       uq      max neval
1 dggamma1(x, 1, 1, 1) 0.482550 0.500241 0.6422052 0.6042855 0.615583 8.177283  1000
2 dggamma4(x, 1, 1, 1) 1.795065 1.841203 2.1034001 2.2448835 2.268327 3.468884  1000
```
so as can be seen under the `mean` column, the R implementation happens to be faster in this case. Of course, we could tinker the C++ code to use parallel processing, or try to modify code to make better use of cache memories or allow the compiler to vectorize the code more easily. This would actually lead to a very cryptic code with terrible maintainability, and it likely would not reach the 0.6 seconds of the R implementation.

The `flexsurv` package implements the generalized gamma using C++. They do not do any of these code optimizations; far from that, they made aggressive use of object orientation, encapsulating and modularizing things to make the code more maintainable. This is great, code maintainability is extremely important for such a big package. However, encapsulation and modularization unfortunately lead to less efficient code. Consider the following benchmark now:
```R
require(flexsurv)
require(elfDistr)
require(microbenchmark)

flexsurv.test = function(){
	x = runif(0, 10, n=10000);
	return( sum(dgengamma(x, 1, 1, 1, log=T)) );
}

flexsurv.test.orig = function(){
	x = runif(0, 10, n=10000);
	return( sum(dgengamma.orig(x, 1, 1, 1, log=T)) );
}

elf.test = function(){
	x = runif(0, 10, n=10000);
	return( sum(dggamma(x, 1, 1, 1, log=T)) );
}

result = microbenchmark(
	flexsurv.test(),
	flexsurv.test.orig(),
	elf.test(),
	unit="ms",
	times=1000,
	control=list(warmup=100)
)

print(summary(result))
```
where we are comparing the performance of three distribution functions: 1) `flexsurv`'s generalized gamma in its main parametrization; 2) `flexsurv`'s generalized gamma in the same parametrization we used; and 3) our implementation `dggamma`. The output of this code in my machine is:
```plaintext
> source("test.r")
                  expr      min       lq      mean    median        uq       max neval
1      flexsurv.test() 2.086867 2.150671 2.4591341 2.6028125 2.6573650  4.430079  1000
2 flexsurv.test.orig() 2.538304 3.172489 5.0088479 3.5958015 4.2179430 87.284218  1000
3           elf.test() 0.676841 0.697649 0.8304953 0.7983525 0.8657395  2.728748  1000
```
so again under the `mean` column we see that our implementation ends up being faster than theirs.

## References

[1] - Stacy, E. W. (1962). A generalization of the gamma distribution. The Annals of mathematical statistics, 33(3), 1187-1192.