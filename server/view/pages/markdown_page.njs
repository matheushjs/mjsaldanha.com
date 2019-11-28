<!--
Message Page
  A page to display an information message to the user.

Parameters:
  'message': The message to display to the user. If it's empty, a standard message is displayed.
-->

{% extends "partials/main.njs" %}

{% block morehead %}
<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML">
</script>
{% endblock %}

{% block header %}
  {{ headerContent }}
{% endblock %}

{% block body %}
  <div class="container">
    {{ bodyContent }}
  </div>
{% endblock %}
