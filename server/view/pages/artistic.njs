{% extends "partials/main.njs" %}

{% block header %}
  <h2>{{ title }}</h2>
{% endblock %}

{% block body %}
  <div class="container">
    <p><small>
    This file is licensed under the <a href="//creativecommons.org/licenses/by-sa/4.0/deed.en" target="_blank">Creative Commons Attribution-Share Alike 4.0 International license</a>.
    You may use this image as long as you give appropriate credit to the author, Matheus H. J. Saldanha.
    </small></p>

    <picture>
      <figcaption class="my-2">{{ description | safe }}</figcaption>
      <img src="/images/artistic/{{filepath}}" class="img-fluid rounded border shadow">
    </picture>
  </div>
{% endblock %}