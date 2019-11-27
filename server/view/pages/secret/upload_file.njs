{% extends "partials/main.njs" %}

{% block morehead %}
  <script>
    function upload_file(){
      $.ajax({
        // Your server script to process the upload
        url: "",
        type: "POST",

        // Form data
        data: new FormData($("form")[0]),

        // Tell jQuery not to process data or worry about content-type
        // You *must* include these options!
        cache: false,
        contentType: false,
        processData: false,

        // Custom XMLHttpRequest
        xhr: function () {
          var myXhr = $.ajaxSettings.xhr();
          if (myXhr.upload) {
            // For handling the progress of the upload
            myXhr.upload.addEventListener("progress", function (e) {
              if (e.lengthComputable) {
                $(".progress-bar").css("width", String(100 * e.loaded / e.total) + "%");
              }
            }, false);
          }
          return myXhr;
        }
      });

      return false;
    }
  </script>
{% endblock %}

{% block header %}
<div class="container">
  <h2>Upload File</h2>
</div>
{% endblock %}

{% block body %}
<div class="container">
  {% if message %}
  <h3 class="mb-5">{{message}}</h3>
  {% endif %}
  <p>Select a file to upload. After uploading it should be available <a href="/public/data/">here</a>.</p>
  <form class="mb-3 text-center" enctype="multipart/form-data">
    <div class="form-group row mb-2">
        <label for="myfileinput" class="mr-2 ml-auto col-form-label">Choose file:</label>
        <input type="file" name="file-to-upload" class="w-50 form-control-file mb-3" id="myfileinput">
    </div>
    <button type="submit" class="btn btn-dark" onclick="return upload_file();">Upload</button>
  </form>

  <div class="progress">
    <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
</div>
{% endblock %}
