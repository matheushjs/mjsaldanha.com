
Here we give details regarding the `elfDistr` package that we developed.
Mainly, we compare our implementation of the generalized gamma distribution with the one offered
  by the `flexsurv` package.

Note that the source code can be found in the [GitHub repository](https://github.com/matheushjs/elfDistr).

## Efficient Implementation of the Generalized Gamma

Our implementation was mainly motivated by the slow performance of existing implementations.
Let us first elaborate on the formulas for the distribution, and then discuss its implementation
  and performance.

The generalized gamma was proposed by Stacy, E. W. [1] with parameters \\(a, d, p\\), but we use the reparametrization
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

## References

[1] - Stacy, E. W. (1962). A generalization of the gamma distribution. The Annals of mathematical statistics, 33(3), 1187-1192.