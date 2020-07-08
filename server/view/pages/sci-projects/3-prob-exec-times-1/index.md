' Title: Computer Science Course Conclusion Project
' Subtitle: Probabilistic Models for the Execution Time of Individual Tasks in Stochastic Scheduling
' Date: June 7th 2020

### I have published my thesis here: https://arxiv.org/abs/2006.09864 . Check it out!

# Abstract

The execution time of programs is a key element in many areas of computer science, mainly those where achieving good performance (e.g., scheduling in cloud computing) or a predictable one (e.g., meeting deadlines in embedded systems) is the objective. Despite being random variables, execution times are most often treated as deterministic in the literature, with few works taking advantage of their randomness; even in those, the underlying distributions are assumed as being normal or uniform for no particular reason. In this work we investigate these distributions in various machines and algorithms. A mathematical problem arises when dealing with samples whose populational minimum is unknown, so a significant portion of this monograph is dedicated to such problem. We propose several different effective or computationally cheap ways to overcome the problem, which also apply to execution times. These methods are tested experimentally, and results point to the superiority of our proposed inference methods. We demonstrate the existence of execution time distributions with long tails, and also conclude that two particular probability distributions were the most suitable for modelling all execution times. While we do not discuss direct applications to stochastic scheduling, we hope to promote the usage of probabilistic execution times to yield better results in, for example, task scheduling. 

# Objectives

In this project we investigate the underlying distribution of execution times of programs, attempting to reason about:

1. the suitability of varied probabilistic models for execution times;
2. the causes for the observed randomness;
3. which shapes of probability distributions are observed and how this affects scheduling; and
4. methods to deal with problems faced while investigating the previous points.

The main hindrance we found was performing maximum likelihood estimation over variables whose ``location'' (or populational minimum) is large and unknown, which we have thoroughly investigated and thus far proposed six inference methods that are discussed and justified in the thesis. On top of that, experiments were performed to test the capacity of a specified set of distribution families to fit samples of execution times obtained experimentally. Results demonstrate the existence of execution time distributions with heavy tails on either side, which could indeed have significant impact in scheduling decisions. We show that the exponentiated Weibull and the odd log-logistic generalized gamma distributions achieve very good performance when fitting samples of execution times.

# Results

* [R Package "elfDistr"](https://cran.r-project.org/package=elfDistr)
* [R Package "ggamma"](https://cran.r-project.org/package=ggamma)
* [R Package "ollggamma"](https://cran.r-project.org/package=ollggamma)
* [Project GitHub Repository](https://github.com/matheushjs/ElfProbTET)

# Experimental Data

[The experimental data can be found here](/public/data/3-prob-exec-times-1/). File naming is on the format
`[algorithm]-[machine]-[problem-size1]-...-[problem-sizeN].txt`, and the file has 1000 samples for each of these problem
sizes, in the same order that they appear in the file name.

For example, `dijkstra_helix_500K_1M_2M_10M.txt` refers to the Dijkstra program ran on the Helix machine with problem
sizes 500K, 1M, 2M and 10M; the first 1000 samples refer to the 500K problem size, the next 1000 samples to the 1M problem size,
and so on.

# Funding & Support

* Computational resources from <a target="_blank" href="http://www.cemeai.icmc.usp.br/">CeMEAI</a> (FAPESP grant 2013/07375-0).

# Machines' Specs

| Name | CPU | Memory | Disk | Motherboard |
| --- | --- | --- | --- | --- |
| Andromeda | AMD FX(tm)-8350 Eight-Core Processor | 4x Corsair 8GB DIMM DDR3 Synchronous 800 MHz | Seagate HD 2TB ST2000DM001-1ER1 | Gigabyte 970A-D3 |
| HalleyHD | Intel Core i7-4790 CPU 3.60GHz | 4x AMI 8GB DIMM DDR3 Synchronous 1600 MHz | Seagate HD 2TB ST2000DM001-1CH1 | Gigabyte Z97X-SLI-CF |
| HalleySSD | Intel Core i7-4790 CPU 3.60GHz | 4x AMI 8GB DIMM DDR3 Synchronous 1600 MHz | Kingston SSD 240GB SA400S3 | Gigabyte Z97X-SLI-CF |
| Helix | Intel Core i5-4440 CPU 3.10GHz | 4x Kingston 4GB DIMM DDR3 Synchronous 1333 MHz | Kingston SSD 240GB SA400S3 | Gigabyte Z87-D3HP-CF |

# Histogram Collection

#### **Standard Inference Method**

<div class="container" style="margin-bottom: 3em;">
  <p>Can't see the file? Download the <a href="/images/articles/histograms-standard.pdf">PDF here</a>.</p>
  <div style="height: 80vh;" class="shadow">
    <embed src="/images/articles/histograms-standard.pdf" style="width: 100%; height: 100%;" type="application/pdf">
  </div>
</div>

#### Using $\hat{c}_1$

<div class="container" style="margin-bottom: 3em;">
  <p>Can't see the file? Download the <a href="/images/articles/histograms-c1.pdf">PDF here</a>.</p>
  <div style="height: 80vh;" class="shadow">
    <embed src="/images/articles/histograms-c1.pdf" style="width: 100%; height: 100%;" type="application/pdf">
  </div>
</div>

#### Using $\hat{c}_2$

<div class="container" style="margin-bottom: 3em;">
  <p>Can't see the file? Download the <a href="/images/articles/histograms-c2.pdf">PDF here</a>.</p>
  <div style="height: 80vh;" class="shadow">
    <embed src="/images/articles/histograms-c2.pdf" style="width: 100%; height: 100%;" type="application/pdf">
  </div>
</div>

#### Using $\hat{c}_3$

<div class="container" style="margin-bottom: 3em;">
  <p>Can't see the file? Download the <a href="/images/articles/histograms-c3.pdf">PDF here</a>.</p>
  <div style="height: 80vh;" class="shadow">
    <embed src="/images/articles/histograms-c3.pdf" style="width: 100%; height: 100%;" type="application/pdf">
  </div>
</div>

#### Using $\hat{c}_4$

<div class="container" style="margin-bottom: 3em;">
  <p>Can't see the file? Download the <a href="/images/articles/histograms-c4.pdf">PDF here</a>.</p>
  <div style="height: 80vh;" class="shadow">
    <embed src="/images/articles/histograms-c4.pdf" style="width: 100%; height: 100%;" type="application/pdf">
  </div>
</div>

#### Adding $c$ as parameter to be inferred

<div class="container" style="margin-bottom: 3em;">
  <p>Can't see the file? Download the <a href="/images/articles/histograms-inferC.pdf">PDF here</a>.</p>
  <div style="height: 80vh;" class="shadow">
    <embed src="/images/articles/histograms-inferC.pdf" style="width: 100%; height: 100%;" type="application/pdf">
  </div>
</div>

#### Using the proposed iterative method

<div class="container" style="margin-bottom: 3em;">
  <p>Can't see the file? Download the <a href="/images/articles/histograms-iteratedC.pdf">PDF here</a>.</p>
  <div style="height: 80vh;" class="shadow">
    <embed src="/images/articles/histograms-iteratedC.pdf" style="width: 100%; height: 100%;" type="application/pdf">
  </div>
</div>

