<!--
Navbar partial
  A navbar element to be added to all pages.

Parameters:
  session: session object
  session.callname: Identifies an authenticated user. If empty, navbar is rendered for an unknown/unauthenticated user.
  session.specialUser: Identifies a user with special page. If 'true', a button for the special page is added to the navbar.
-->

<nav class="elf-navbar navbar navbar-expand-lg navbar-light">
  <a class="navbar-brand" href="/">
    <img src="/images/elf_logo_512.png" width="26" height="26" style="margin-top: -3px; display: inline-block;">
    MatHJS
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar" aria-controls="myNavbar" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="myNavbar">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" href="/sci-projects/">
          {{ trans.raw.research }}
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="/articles/">
          {{ trans.raw.papers }}
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="/posts/">
          {{ trans.raw.posts }}
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="https://www.github.com/matheushjs" target="_blank">GitHub</a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="/credits">
          {{ trans.raw.credits }}
        </a>
      </li>

      <li class="nav-item">
        <a target="_blank" class="nav-link" href="http://lattes.cnpq.br/2301154612725391">
          {{ trans.raw.curriculum }}
        </a>
      </li>

      {% if specialUser %}
        <li class="nav-item">
          <a class="nav-link" href="/secret">
            {{ trans.raw.specialpage }}
          </a>
        </li>
      {% endif %}
    </ul>

    {% if callname %}
      <span class="navbar-text elf-navbar-welcome" style="padding-right: 10px; color: black;">
        {{ trans.global.greetings1 }}{{ callname }}{{ trans.global.greetings2 }}
      </span>
    {% endif %}

    <ul class="navbar-nav">
      <li class="nav-item" style="margin-right: 0.25rem;">
        <span class="navbar-text">{{ trans.raw.language }}:</span>
        <a href="/en/"><img class="rounded border" src="/images/flags/gb.svg" style="height: 1.5rem;" alt="English"></a>
        <a href="/ja/"><img class="rounded border" src="/images/flags/jp.svg" style="height: 1.5rem;" alt="日本語"></a>
      </li>
      <li style="display: none;" class="nav-item d-lg-block">
        <span style="cursor: default;" class="mx-1 text-secondary navbar-text">|</span>
      </li>
    {% if not callname %}
      <li class="nav-item">
        <a class="nav-link" href="/user/signup">
          {{ trans.raw.signup }}
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/user/login">
          {{ trans.raw.login }}
        </a>
      </li>
    {% else %}
      <li class="nav-item">
        <a class="nav-link" href="/user/account">
          {{ trans.raw.account }}
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/user/logout">
          {{ trans.raw.logout }}
        </a>
      </li>
    {% endif %}
    </ul>
  </div>
</nav>
