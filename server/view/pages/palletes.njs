{% extends "partials/main.njs" %}


{% block morehead %}
<style>
  .elf-pal {
    height: 20vh;
    padding-top: calc(10vh - 1.1rem);
  }
</style>
{% endblock %}


{% block header %}
  <div class="container">
    <h2>Elf Palletes</h2>
  </div>
{% endblock %}


{% block body %}
<div class="container" style="margin-top: 4rem;">
  <h2>Elf Icon & Logo</h2>
  <div class="row">
    <div class="col-2 elf-pal" style="background-color: #212121;"></div>
    <div class="col-2 elf-pal" style="background-color: #126262;"></div>
    <div class="col-2 elf-pal" style="background-color: #00f2ff;"></div>
    <div class="col-2 elf-pal" style="background-color: #0000;"></div>
    <div class="col-2 elf-pal" style="background-color: #0000;"></div>
    <div class="col-2 elf-pal" style="background-color: #0000;"></div>
  </div>
</div>

<div class="container" style="margin-top: 4rem;">
  <h2>Diagram (Rainbow)</h2>
  <div class="row text-center" style="font-size: 1.1rem;">
    <div class="col-2 elf-pal" style="background-color: #92f4a3;">Word</div>
    <div class="col-2 elf-pal" style="background-color: #deff99;">Word</div>
    <div class="col-2 elf-pal" style="background-color: #fbff6d;">Word</div>
    <div class="col-2 elf-pal" style="background-color: #ffa54c;">Word</div>
    <div class="col-2 elf-pal" style="background-color: #ffbfc9;">Word</div>
    <div class="col-2 elf-pal" style="background-color: #cf8cff;">Word</div>
    
  </div>
  <div class="row text-center" style="font-size: 1.1rem;">
    <div class="col-2 elf-pal" style="background-color: #67a3ff;">Word</div>
    <div class="col-2 elf-pal" style="background-color: #99f5ff;">Word</div>
    <div class="col-2 elf-pal" style="background-color: #e2e2e2;">Word</div>
    <div class="col-2 elf-pal" style="background-color: #0000;"></div>
    <div class="col-2 elf-pal" style="background-color: #0000;"></div>
    <div class="col-2 elf-pal" style="background-color: #0000;"></div>
  </div>
</div>
{% endblock %}
