<!--
Message Page
  A page to display an information message to the user.

Parameters:
  'message': The message to display to the user. If it's empty, a standard message is displayed.
-->

{% extends "partials/main.njs" %}

{% block header %}
  {{ headerContent }}
{% endblock %}

{% block body %}
  <div class="container">
    {{ bodyContent }}
  </div>
{% endblock %}
