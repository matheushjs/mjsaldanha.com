<!--
Message Page
  A page to display an information message to the user.

Parameters:
  'message': The message to display to the user. If it's empty, a standard message is displayed.
-->

{% extends "partials/main.njs" %}

{% block morehead %}
<script>
  window.MathJax = {
    tex: {
      inlineMath: [["$", "$"], ["\\(", "\\)"]],
      processEscapes: true,
    }
  };
</script>

<script type="text/javascript" id="MathJax-script" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
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
