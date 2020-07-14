{% extends "partials/main.njs" %}


{% block morehead %}
<script src="/scripts/elfResearch.js"></script>
{% endblock %}


{% block header %}
<div class="container">
  <h2>Scientific Articles</h2>
</div>
{% endblock %}


{% block body %}
<div class="container text-justified">
  <p>
    Each article written has its own page, with information that should be publicly available for the readers.
  </p>
</div>

<div id="spinner-container" class="container text-center mb-5">
    <span class="spinner-border"></span>
    <span>Loading...</span>
  </div>

<div class="container" style="margin-top: 40px">
  <table class="table table-hover table-sm">
    <thead>
      <tr>
        <th scope="col">Year</th>
        <th scope="col">Published at</th>
        <th scope="col">Title</th>
      </tr>
    </thead>
    <tbody id="article-table">
    </tbody>
  </table>
</div>
<script>Elf.listArticles($("#article-table"), $("#spinner-container"));</script>
{% endblock %}
