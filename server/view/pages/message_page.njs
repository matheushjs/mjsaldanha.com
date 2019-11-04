<!--
Message Page
  A page to display an information message to the user.

Parameters:
  'message': The message to display to the user. If it's empty, a standard message is displayed.
-->

{% extends "../partials/main.njs" %}

{% block header %}
<div class="container">
  {% if message %}
    <h2>{{ message }}</h2>
  {% else %}
    <h2>Oops, something went wrong!</h2>
  {% endif %}
</div>
{% endblock %}
