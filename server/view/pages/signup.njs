{% extends "partials/main.njs" %}


{% block morehead %}
<script src='https://www.google.com/recaptcha/api.js?hl=en'></script>
<script src="/scripts/loginForms.js"></script>
{% endblock %}


{% block header %}
<div class="text-center container">
  <h2>Sign up</h2>
</div>
{% endblock %}


{% block body %}
<div class="container text-center">
  <form class="form-horizontal">
    <div class="form-group form-row" id="callname_group">
      <label class="col-form-label col-sm-2">Name:</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" name="callname" placeholder="How would you like to be called?" required>
      </div>
    </div>
  
    <div class="form-group form-row" id="username_group">
      <label class="col-form-label col-sm-2">Username:</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" name="username" placeholder="Enter your username" required>
      </div>
    </div>
    
    <div class="form-group form-row" id="pwd_group">
      <label class="col-form-label col-sm-2">Password:</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" name="password" placeholder="Enter your password" required>
      </div>
    </div>

    <div class="form-group form-row" id="pwd2_group">
      <label class="col-form-label col-sm-2">Confirm Password:</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" name="password2" placeholder="Enter your password again" required>
      </div>
    </div>
    
    <div class="form-group">
      <div class="g-recaptcha" style="display: inline-block;" data-sitekey="6LewBUgUAAAAADgVXdjSgymYSwI7lQsLF1mDgryY"></div>
    </div>

    <button type="submit" class="btn btn-dark" onclick="return Elf.validateSignup();">
      Submit
    </button>

    <div class="alert alert-info" style="{{ '' if failMsg else 'display: none;' }} color: darkblue; width: 50%; margin: 30px auto 0;">
      <strong>Info: </strong> <span class="fail-msg">{{ failMsg }}</span>
    </div>
  </form>
</div>
{% endblock %}
