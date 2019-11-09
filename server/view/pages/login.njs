{% extends "partials/main.njs" %}


{% block morehead %}
  <script src="/scripts/loginForms.js"></script>
{% endblock %}


{% block header %}
  <div class="text-center container">
    <h2>
      {{ trans.raw.login }}
    </h2>
  </div>
{% endblock %}


{% block body %}
<div class="container text-center">
  <form>
    <div class="form-group form-row" id="username_group">
      <label class="col-form-label col-sm-2">
        {{ trans.raw.username }}
      </label>
      <div class="col-sm-10">
        <input type="text" class="form-control" name="username" placeholder="{{ trans.login.placeholder1 }}" required>
      </div>
    </div>
    
    <div class="form-group form-row" id="pwd_group">
      <label class="col-form-label col-sm-2">{{ trans.raw.password }}</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" name="password" placeholder="{{ trans.login.placeholder2 }}" required>
      </div>
    </div>
    
    <button type="submit" class="btn btn-dark" onclick="return Elf.validateLogin();">
      {{ trans.login.submit }}
    </button>

    <div class="alert alert-info" style="{{ '' if failMsg else 'display: none;' }} color: darkblue; width: 50%; margin: 30px auto 0;">
      <strong>{{ trans.login.info }}</strong> <span class="fail-msg">{{ failMsg }}</span>
    </div>
  </form>
</div>
{% endblock %}
