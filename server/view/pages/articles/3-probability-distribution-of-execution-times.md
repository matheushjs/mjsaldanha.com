' Title: Determining the Probability Distribution of Execution Times
' Subtitle: Matheus Henrique Junqueira Saldanha and Adriano Kamimura Suzuki
' Date: May 2021

Machines' Specs
---

| Name | CPU | Memory | Disk | Motherboard |
| --- | --- | --- | --- | --- |
| Andromeda | AMD FX(tm)-8350 Eight-Core Processor | 4x Corsair 8GB DIMM DDR3 Synchronous 800 MHz | Seagate HD 2TB ST2000DM001-1ER1 | Gigabyte 970A-D3 |
| HalleyHD | Intel Core i7-4790 CPU 3.60GHz | 4x AMI 8GB DIMM DDR3 Synchronous 1600 MHz | Seagate HD 2TB ST2000DM001-1CH1 | Gigabyte Z97X-SLI-CF |
| HalleySSD | Intel Core i7-4790 CPU 3.60GHz | 4x AMI 8GB DIMM DDR3 Synchronous 1600 MHz | Kingston SSD 240GB SA400S3 | Gigabyte Z97X-SLI-CF |
| Helix | Intel Core i5-4440 CPU 3.10GHz | 4x Kingston 4GB DIMM DDR3 Synchronous 1333 MHz | Kingston SSD 240GB SA400S3 | Gigabyte Z87-D3HP-CF |


Data
---

* Execution times dataset:
  * Download on <a href="https://www.kaggle.com/matheushjs/execution-times-of-3-programs-in-4-machines" target="_blank">Kaggle</a>
  * Or download here (might be slow): <a href="/public/data/3-prob-exec-times-1/exec-times-dataset.csv" target="_blank">exec-times-dataset.csv</a>
* Parameters for the exponentiated Weibull: <a href="/public/data/3-prob-exec-times-1/eweibull-dataset.csv" target="_blank">eweibull-dataset.csv</a>
* Parameters for all distribution families: <a href="/public/data/3-prob-exec-times-1/full-dataset.csv" target="_blank">full-dataset.csv</a>

Code
---

##### Inference over the execution times dataset

* Download here: <a href="https://www.kaggle.com/matheushjs/inference-code.zip" target="_blank">ZIP File</a>
* Run with:
```bash
$ cd /tmp/inference-code/
$ R
> source("inference.r");
```

##### Simulation study with exponentiated Weibull

The R code is simply:

```R
require(rmutil);
require(nortest);

set.seed(12345);

data = read.csv("eweibull-dataset.csv");
params_df = data[c("param_s", "param_m", "param_f")];

sum_sample = function(n, s, m, f){
	data = rgweibull(n=1000, s=s, m=m, f=f);
	for(i in 2:n){
		data = data + rgweibull(n=1000, s=s, m=m, f=f);
	}
	return(data);
}

counts = NULL;

for(row in 1:nrow(params_df)){
	params = as.numeric(params_df[row,]);
	
	for(sum_size in seq(10, 10000, by=5)){

		results = NULL;
		for(i in 1:20)
			results = c(results, lillie.test(sum_sample(sum_size, s=params[1], m=params[2], f=params[3]))$p.value);

		count = sum(results > 0.4);
		if(count >= 16){
			print(sum_size);
			counts = c(counts, sum_size);
			break;
		}
	}
}
```

Where the file "eweibull-dataset.csv" is the one that can be downloaded under section "Data".

To change the p-value threshold, modify the line `count = sum(results > 0.4);`, in particular, change `0.4` to the desired threshold.

Results are returned into vector `counts`.

<script>
  $("table").addClass("table table-responsive table-sm");
</script>