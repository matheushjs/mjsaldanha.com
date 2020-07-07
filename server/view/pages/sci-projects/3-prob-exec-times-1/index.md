' Title: Computer Science Course Conclusion Project I
' Subtitle: Probabilistic Models for the Execution Time of Individual Tasks in Stochastic Scheduling
' Date: June 7th 2020

# Objectives

The objective of this project focuses on the scheduling problem, but in a way that may also contribute to the two other areas mentioned in the previous section.
More specifically, focus on the problem of *DAG scheduling*[1],
  in which tasks are organized as a dependency graph and the objective is to find the best order for their execution on the available computational resources,
  aiming to achieve the lowest overall execution time (also called *makespan*).
The problem is made more complicated because, as often happens, the DAG being scheduled will be executed alongside multiple other DAGs (varying with time),
  and these will make use of the same available resources.

The scheduling problem has often been approached in a deterministic way, using the average execution time of tasks to perform the scheduling.
Some probabilistic models have also been proposed for the problem (in this case it is called *stochastic scheduling*),
  mostly under the assumption that the probability distribution of tasks is known,
  such as done by Li and Antonio[2] and Zheng and Sakellariou[1].
In both of these papers, in order to validate their results, the authors performed simulations where the the distributions of tasks are somewhat arbitrarily chosen to be either normal or uniform.
In this project, we would like to further investigate whether these are reasonable choices of distributions for execution times.
Under this light, we propose the following:

**Hypothesis 1.**
Given a computer architecture, it is possible to determine a minimal probability model that can be fit to the execution time of any program for a fixed input.

In order to investigate this hypothesis, a set of programs will be implemented and will undergo experiments to generate samples of execution times.
Based on these samples, suitable probability models will be determined, and inference (conventional and/or bayesian) will be performed to find the parameters of these distributions for each sample of execution times.

If Hypothesis 1 is true, simulations will be performed to validate or reproduce the results given in existing studies regarding stochastic scheduling.
If it is not true, the reasons thereof will be investigated, and the hypothesis will be narrowed down to more specific classes of programs and machine circumstances,
  which will undergo the same procedure exposed above.

[1] - ZHENG, W.; SAKELLARIOU, R. Stochastic dag scheduling using a monte carlo approach. Journal of Parallel and Distributed Computing, Elsevier, v. 73, n. 12, p. 1673–1689, 2013.
<br/>
[2] - LI, Y. A.; ANTONIO, J. K. Estimating the execution time distribution for a task graph in a heterogeneous computing system.
  In: IEEE. Proceedings Sixth Heterogeneous Computing Workshop (HCW’97). [S.l.], 1997. p. 172–184.

# Results

* <a target="_blank" href="https://cran.r-project.org/package=elfDistr">R Package "elfDistr"</a>
* <a target="_blank" href="https://cran.r-project.org/package=ggamma">R Package "ggamma"</a>
* <a target="_blank" href="https://cran.r-project.org/package=ollggamma">R Package "ollggamma"</a>
* <a target="_blank" href="https://github.com/matheushjs/ElfProbTET">Project GitHub Repository</a>

# Experimental Data

<a target="_blank" href="/public/data/3-prob-exec-times-1/">The experimental data can be found here</a>. File naming is on the format
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

