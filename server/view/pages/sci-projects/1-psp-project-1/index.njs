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
  <h2>Scientific Initiation 1</h2>
  <h2>Protein Structure Prediction with Parallel Algorithms Orthogonal to Parallel Platforms</h2>
</div>
{% endblock %}


{% block body %}
<div class="container text-justify">
  <h1>Abstract</h1>
  <p>
    Due to the abundance and importance of proteins, a greater knowledge about these molecules is known to be of great interest to science.
    However, laboratory experiments for studying them are expensive and lengthy, which led to the arising of studies on computational methods for predicting the behavior of proteins, which includes its tridimensional structure (3D).
    The problem of determining the 3D structure of a protein based on its aminoacid sequence is NP-complete, and attempts to solve this problem with sequential algorithms are shown to be insufficient, which indicates a clear need for applying parallel computing in such problem.
    In this project, parallel algorithms for prediction of protein structures, found in the literature, will be investigated in an effort to find opportunities for adapting them to different parallel platforms.
    Thereafter, a set of algorithms will be elaborated such that it is diverse in terms of the parallel architectures and parallel programming models used.
    The set will be implemented, evaluated and made publicly available, so as to support the development of more elaborate prediction algorithms that use a collection of algorithms as a means to achieve better predictions.
  </p>
</div>

<div class="container">
  <h1>Funding & Support</h1>
  <ul>
    <li>
      Funds from FAPESP, grant
      <a target="_blank" href="https://bv.fapesp.br/pt/bolsas/176774/predicao-de-estruturas-de-proteinas-com-algoritmos-paralelos-ortogonais-as-plataformas-paralelas">
      2017/25410-8</a>.
    </li>
    <li>
      Computational resources from <a target="_blank" href="http://www.cemeai.icmc.usp.br/">CeMEAI</a> (FAPESP grant 2013/07375-0).
    </li>
  </ul>
</div>

<div class="container">
  <h1>Public Resources</h1>
  <div class="table-responsive">
    <table class="table table-hover">
      <tbody>
        <tr>
          <th scope="row">Library for High-Perfomance Collision Counting</th>
          <td></td>
          <td>
            <div><a href="https://github.com/matheushjs/ElfCudaLibs/tree/master/ElfColCnt" target="_blank">GitHub Repository</a></div>
          </td>
        </tr>
        <tr>
          <th scope="row">Parallel ABC Algorithm on Protein Structure Prediction</th>
          <td><a href="https://matheushjs.github.io/ElfPSP_ParallelABC/files.html" target="_blank">Documentation</a></td>
          <td>
            <div><a href="https://github.com/matheushjs/ElfPSP_ParallelABC" target="_blank">GitHub Repository</a></div>
          </td>
        </tr>
        <tr>
          <th scope="row">Ant Colony Optimization on Protein Structure Prediction</th>
          <td><a href="https://matheushjs.github.io/ElfPSP_AntColony/files.html" target="_blank">Documentation</a></td>
          <td>
            <div><a href="https://github.com/matheushjs/ElfPSP_AntColony" target="_blank">GitHub Repository</a></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="container-fluid">
  <div class="container">
    <h1>See the Poster!</h1>
  </div>
  <div style="position: relative;">
    <a href="/images/sci-projects/1/poster_1920.jpg" style="position: absolute; top: 5px; right: 40px;">
      <img src="/octicons/svg/screen-full.svg" alt="expand image" style="height: 2.5rem;">
    </a>
    <div class="text-center border border-secondary rounded shadow elf-add-poster" style="height: 50vh; overflow: auto;">
      
    </div>
  </div>
</div>

<script>
  // The poster is a really heavy image, so we really really want it to load last.
  $(window).on("load", function(){
    $(".elf-add-poster").append("<img src='/images/sci-projects/1/poster_1920.jpg' style='width: 100%;'>");
  });
</script>
{% endblock %}
