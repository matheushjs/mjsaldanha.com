---
title: Optimization Problems
date: 2017-10-14 22:27:20
tags:
- problem solving
- computer science
---

Optimization is a class of problems in computer science that follows a few fixed characteristics.

For a start, consider that we have the domain space $\mathbb{R}^3$ of points in the space, and $T: \mathbb{R}^3 \rightarrow \mathbb{R}$ a function that returns the temperature of each point. We would like to **find the point of lowest temperature**.

The domain being real prevents us from testing all possibilities. Lets then define $\epsilon := 0.001$ the smallest step to take in each $x, y, z$ coordinate. Also, let's arbitrarily define a starting point $x_0 := (-1e5, -1e5, -1e5)$. Finally, let's try every point of the form $P = x_0 + \epsilon \times (n_0,n_1,n_2)$ in a way that $P$ is always within the box from $x_0$ to $x_1 = -x_0 = (1e5, 1e5, 1e5)$. We will basically walk around this box of edge length $2e5$ in steps of $0.001$. Your code at this point might look like this:

```C
	minTemp = DOUBLE_MAX; // Arbitrary high double
	min = (0,0,0);
	eps = 0.001;
	for(x = -1e5; x < 1e5; x += eps){
		for(y = -1e5; y < 1e5; y += eps){
			for(z = -1e5; z < 1e5; z += eps){
				if( T(x,y,z) < minTemp ){
					minTemp = T(x,y,z);
					min = (x,y,z);
				}
	}}}
```

Congratulations, we've developed an optimization algorithm. Optimization is all about walking throughout domain spaces trying to minimize functions.

In [^1], optimization is formalized as being:

$$minimize\ \{f_1(x), f_2(x), ..., f_k(x)\}$$

$$subject\ to\ x \in S$$

Where $f_i: \mathbb{R}^n \to \mathbb{R}$ are the *objective functions* that we desire to minimize simultaneously. *Decision vectors* $x = (x_1, x_2, ..., x_n)$ belong to the non-empty set $S \subset \mathbb{R}^n$, also called *viable solution set*. *Objective vectors* are the images of the decision vectors, *i.e.* $z = f(x) = (f_1(x), f_2(x), ..., f_k(x))$. The set of images of all Pareto-optimal points forms the *viable objective region*.

A decision vector $x' \in S$ is a *Pareto-optimal* solution if there is no other point $x \in S$ such that $f_i(x) \leq f_i(x')$ for all index $i$; and such that $f_j(x) < f_j(x')$ for at least one index $j$. In other words, there is no $x$ with any coordinate "better" than that of $x'$, and with no coordinates "worse" than that of $x'$.

There are a number of ways to perform optimization, including the naive algorithm above. Compared to exact methods, approximate ones tend to be more interesting: neural networks, support vector machines, evolutionary algorithms *etc*. More on that in future posts, though.

Farewell.
Matheus H. J. Saldanha

[^1]: Branke, Jürgen, Kalyanmoy Deb, and Kaisa Miettinen, eds. Multiobjective optimization: Interactive and evolutionary approaches. Vol. 5252. Springer Science & Business Media, 2008.

