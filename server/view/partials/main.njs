<!DOCTYPE html>

{% if lang === "ja" %}
<html lang="ja">
{% else %}
<html lang="en">
{% endif %}

  <head>
    <title>{{ trans.global.title }}</title>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="{{ trans.global.description }}">
    <meta name="author" content="Matheus Henrique Junqueira Saldanha">
    <meta name="keywords" content="Matheus Saldanha,Matheus Junqueira,Computer Science,High-Performance Computing,HPC,Neural Networks,Deep Learning">
    <link rel="icon" href="/images/elf_icon.png">

    <!-- Get Bootstrap and JQuery -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css" integrity="sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js" integrity="sha384-o+RDsa0aLu++PJvFqy8fFScvbHFLtbvScb8AjopnFD+iEQ7wo/CG0xlczd+2O/em" crossorigin="anonymous"></script>

    <link rel="stylesheet" href="/styles/custom.css">
    <script src="/scripts/custom.js"></script>

    {% block morehead %}
    {% endblock %}
  </head>

  <body>
    <div class="jumbotron text-center elf-starry-sky">
      <div>
        {% include "./navbar.njs" %}
      </div>

      {% block header %}
      <div class="container">
        <h2>Oops! Something went wrong!</h2>
      </div>
      {% endblock %}
    </div>

    {% block body %}

    {% endblock %}

    <div>
      <div class="container-fluid elf-footer">
        <div class="container text-center mx-auto" style="max-width: 500px; font-size: 0.8rem;">
          <h5>
            {{ trans.footer.webmap }}
          </h5>
          <div class="d-flex flex-wrap justify-content-around my-3">
            {{ trans.footer.links }}
          </div>
        </div>

        <div class="w-100 text-left mt-3">
          {{ trans.footer.creatornote }}
        </div>
      </div>
    </div>
  </body>
</html>
