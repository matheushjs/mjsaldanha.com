<!--
Account Management page
-->

{% extends "partials/main.njs" %}


{% block morehead %}
<script src="/scripts/loginForms.js"></script>
{% endblock %}


{% block header %}
  <div class="text-center container">
    <h2>Edit Account</h2>
  </div>
{% endblock %}

{% block body %}
  <div class="container text-center">
    <form method="post">

      <div class="form-group form-row">
        <label class="col-form-label col-sm-2">Name:</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" name="callname" value='{{ callname }}' placeholder="How would you like to be called?">
        </div>
      </div>

      <div class="form-group form-row">
        <label class="col-form-label col-sm-2">Current Password:</label>
        <div class="col-sm-10">
          <input style="background-color: lightgrey;" type="password" class="form-control" name="cur_password" placeholder="Enter your current password"
                onfocus="return Elf.accountOnFocus();">
        </div>
      </div>

      <div class="form-group form-row">
        <label class="col-form-label col-sm-2">New Password:</label>
        <div class="col-sm-10">
          <input type="password" class="form-control" name="password" placeholder="Enter new password" disabled>
        </div>
      </div>

      <div class="form-group form-row">
        <label class="col-form-label col-sm-2">Confirm New Password:</label>
        <div class="col-sm-10">
          <input type="password" class="form-control" name="password2" placeholder="Enter new password again" disabled>
        </div>
      </div>
      
      <div class="col-sm-12">
        <button type="submit" class="btn btn-dark" onclick="return Elf.validateAccount();">Finish Editing</button>
      </div>

      <div class="alert alert-info" style="display: none; color: darkblue; width: 50%; margin: 30px auto 0;">
        <strong>Info: </strong> <span class="fail-msg"></span>
      </div>
    </form>
  </div>
{% endblock %}