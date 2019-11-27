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
        xhr: function(){
          var myXhr = $.ajaxSettings.xhr();
          if(myXhr.upload){
            // For handling the progress of the upload
            myXhr.upload.addEventListener("progress", function(e){
              if(e.loaded == e.total){
                $(".progress-bar")
                  .css("width", "0")
                  .text("");
                $("#message").text("Uploading finished.");
                $(".alert").css("display", "block");
              } else if(e.lengthComputable){
                var progress = String(Math.round(100 * e.loaded / e.total)) + "%";
                $(".progress-bar")
                  .css("width", progress)
                  .text(progress);
                $(".alert").css("display", "none");
              }
            }, false);
          }
          return myXhr;
        },

        complete: function(){
          console.log("Ok");

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
  <p>Select a file to upload. After uploading it should be available <a href="/public/data/">here</a>.</p>
  <form class="mb-3 text-center" enctype="multipart/form-data">
    <div class="form-group row mb-2">
        <label for="myfileinput" class="mr-2 ml-auto col-form-label">Choose file:</label>
        <input type="file" name="file-to-upload" class="w-50 form-control-file mb-3" id="myfileinput" multiple>
    </div>
    <div class="progress mb-4 w-50 mx-auto" style="height: 2rem;">
      <div class="progress-bar progress-bar-striped progress-bar-animated bg-secondary" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <button type="submit" class="btn btn-dark mb-3" onclick="return upload_file();">Upload</button>
    <div class="alert alert-info" style="display: none; color: darkblue; width: 50%; margin: 30px auto 0;">
      <strong>Info:</strong> <span id="message"></span>
    </div>
  </form>
</div>
{% endblock %}
