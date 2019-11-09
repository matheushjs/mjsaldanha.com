{% extends "partials/main.njs" %}


{% block header %}
<div class="container">
  <h2>Secret Pages</h2>
</div>
{% endblock %}


{% block body %}
<div class="container text-center">
  <div class="row">
    <div class="col-sm-4"><a href="secret/all_users">User Listing</a></div>
    <div class="col-sm-4">Visitors: {{ visitors }}</div>
    <div class="col-sm-4"></div>
  </div>
</div>
{% endblock %}
