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

<link rel="stylesheet" href="/styles/markdown.css">
<script type="text/javascript" id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/tomorrow-night.min.css">
{% endblock %}

{% block header %}
  <h2>{{ mdMetadata.title if mdMetadata.title else "Post Without Title" }}</h2>
  {% if mdMetadata.subtitle %}
    <p>{{mdMetadata.subtitle}}</p>
  {% endif %}
  <p>{{ mdMetadata.date if mdMetadata.date else "" }}</p>
{% endblock %}

{% block body %}
  <div class="container elf-markdown">
    {{ bodyContent }}
  </div>

<script charset="UTF-8" src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min.js"></script>
<script charset="UTF-8" src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/languages/r.min.js"></script>
<script charset="UTF-8" src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/languages/plaintext.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
{% endblock %}
