{% extends "partials/main.njs" %}


{% block morehead %}

{% endblock %}


{% block header %}
<div class="container">
  <h2>{{ title }}</h2>
</div>
{% endblock %}


{% block body %}
<div class="container text-justified mb-5">
  <ul>
  {% for item in items %}
    <li><a href="{{ item.link }}">{{ item.title }}</a></li>
  {% else %}
    <li>There are no posts.</li>
  {% endfor %}
  </ul>
</div>
{% endblock %}
