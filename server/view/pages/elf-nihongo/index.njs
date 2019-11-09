{% extends "partials/main.njs" %}


{% block morehead %}
<script src="/scripts/elfNihongo.js"></script>
{% endblock %}


{% block header %}
<div class="container">
  <h2>Elf Nihongo</h2>
  <p>日本語の勉強の相棒！</p>
</div>
{% endblock %}


{% block body %}
<div class="container-fluid text-center">
  <div class="row">
    <div class="col-md-6">
      <h2>Text to Translate:</h2>
      <textarea id="input-paste-area" class="border rounded shadow-sm w-100 bg-white" style="height: 50vh;"></textarea>
    </div>
    <div class="col-md-6">
      <h2>Your Translation:</h2>
      <textarea id="input-write-area" class="border rounded shadow-sm w-100 bg-white" style="height: 50vh;"></textarea>
    </div>
  </div>
  <div class="w-50 mx-auto">
    <h2>Google translation:</h2>
    <p class="border rounded shadow-sm bg-white" style="height: 50vh;">
      After a while, freedom of movement returned as if the spell was broken.
    </p>
  </div>
</div>
{% endblock %}
