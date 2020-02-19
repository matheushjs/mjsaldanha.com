{% extends "partials/main.njs" %}


{% block morehead %}
<style>
  h1 {
    margin-bottom: 0.5em;
    padding-top: 1em;
  }
</style>
{% endblock %}


{% block header %}
<div class="container">
  <h2>Scientific Initiation 3</h2>
  <h2>Finding and Exploiting Theoretical Evidences for Applying Statistical Learning Theory in Time Series Forecasting</h2>
</div>
{% endblock %}


{% block body %}
<div class="container text-justify">
  <h1>Abstract</h1>
  <p>
    Machine learning has confirmed its usefulness to various problems, from batch driven applications to time series forecasting (e.g., stock prices, weather, energy consumption, behavior of bacteria, etc).
    Amid a plethora of existing empirical results regarding time series, this project intends to provide theoretical evidences that the Statistical Learning Theory (SLT) is sufficient to ensure learning bounds in such time-dependent scenario.
    Two main assumptions may be disregarded when dealing with time series, namely independent and identically distributed (i.i.d.) sampling and the static joint probability distribution.
    By disregarding them, SLT cannot leverage the Law of Large Numbers nor Hoeffding's inequality to ensure learning upper bounds, thus leading to inconclusive results that could be potentially found by chance.
    In this project, we intend to formalize the conditions to ensure i.i.d. sampling, thus allowing us to make such an upper bound consistent.
    From that, algorithms will be devised in order to better model and forecast synthetic and real-world time series when following the same (static) joint probability distribution.
    Theoretical and experimental results are expected to be assessed and compared to other solutions from the literature.
    In a first formulation, we show that independence holds after the data undergoes embedding (a tool from dynamical systems), which also naturally leads to a potentially better reconstruction algorithm.
  </p>
</div>

<div class="container">
  <h1>Funding & Support</h1>
  <ul>
    <li>
      Computational resources from <a target="_blank" href="http://www.cemeai.icmc.usp.br/">CeMEAI</a> (FAPESP grant 2013/07375-0).
    </li>
  </ul>
</div>
{% endblock %}
