{% extends "partials/main.njs" %}


{% block header %}
<div class="container">
  <h2>User Listing</h2>
</div>
{% endblock %}


{% block body %}
<div class="container">
  <table class="table table-striped table-bordered">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Username</th>
        <th scope="col">Hashpass</th>
      </tr>
    </thead>
    <tbody>
      {% for user in users %}
        <tr>
          <td>{{ user.id }}</td>
          <td>{{ user.callname }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.hashpass }}</td>
        </tr>
      {% endfor %}
    </tbody>
  </table>
</div>
{% endblock %}
