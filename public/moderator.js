var loaderData = new Array();
var oldStyle = "";
var idtoadd = 0;
var editthis = 0,
  editthisid = 0;
var existingKeyframes = new Array();
var dark = false;

function LoadLoaderData() {
  $(".container").html("");
  oldStyle = "";
  loaderData.forEach(function (loader, index, arr) {
    var loaderbox = $(loader.html);
    loaderbox.addClass("loaderbox");
    loaderbox.data("index", index);
    var loaderboxParent = $("<div class='loaderbox-parent'></div>");
    if (dark) {
      loaderbox.addClass("dark");
      loaderboxParent.addClass("dark");
    }
    loaderboxParent.append(loaderbox);
    loaderboxParent.data("index", index);
    loaderboxParent.data("id", loader.loaderid);
    loaderboxParent.append(`<h4>${loader.lname}</h4> <h5>${loader.contributor}</h5> <div class="likes"></div>`);

    $(".container").append(loaderboxParent);
    $("style#loaderStyle").append(loader.css);
    idtoadd = idtoadd <= loader.loaderid ? loader.loaderid + 1 : idtoadd;
    oldStyle = ` ${oldStyle} ${loader.css}`;
  });
}
$("#showPassword").click(function () {
  var pass = $("#password");
  var set = pass.attr("type") === "password" ? "text" : "password";
  pass.attr("type", set);
});

$(".code-snippet-container").on("click", "img", function () {
  $(this).parent().removeClass("active");
});

$(".container").on("click", "div.loaderbox-parent", function () {
  editthis = $(this).data("index");
  editthisid = $(this).data("id");
  $("#addCode").addClass("active");
  $("#addLoaderName").val(loaderData[editthis].lname);
  $("#addContributorName").val(loaderData[editthis].contributor);
  addCodeHTML.setValue(loaderData[editthis].html);
  addCodeCSS.setValue(loaderData[editthis].css);
  $("#addCodeOutput").html(loaderData[editthis].html);
  $("#addCodeOutput > div").addClass("loaderbox");
  $("#id-to-add").text("loader" + loaderData[editthis].loaderid);
});

addCodeHTML.session.on("change", function (delta) {
  delay(function () {
    $("#addCodeOutput").html(addCodeHTML.getValue());
    $("#addCodeOutput > div").addClass("loaderbox");
  });
});
addCodeCSS.session.on("change", function (delta) {
  $("style#loaderStyle").text(oldStyle + addCodeCSS.getValue());
});

$.getJSON(`${url}api/getloaders`).done(function (data) {
  loaderData = data;
  LoadLoaderData();
});

$("#btnEditThisCode").click(function () {
  var obj = {
    lname: $("#addLoaderName").val(),
    html: addCodeHTML.getValue(),
    css: addCodeCSS.getValue(),
    contributor: $("#addContributorName").val(),
    loaderid: editthisid,
    password: $("#password").val(),
  };
  if (obj.lname.length < 3 || obj.html.length < 6 || obj.css.length < 26 || obj.password.length < 3) {
    alert("Less Number of Characters Provided");
  } else {
    $(this).attr("disabled", true);
    $.post(`${url}api/updatecode`, obj)
      .done((data) => {
        if (data === "Done") {
          delete obj.password;
          loaderData[editthis] = obj;
          LoadLoaderData();
          $("#addLoaderName").val("");
          addCodeHTML.session.setValue("");
          addCodeCSS.session.setValue("");
          $("#addContributorName").val("");
          $(".code-snippet-container").removeClass("active");
          $(this).attr("disabled", false);
        } else {
          alert("Error!!! Wrong Password");
          $(this).attr("disabled", false);
        }
      })
      .catch((err) => {
        alert("Error!!! Cannot Add the Loader");
        $(this).attr("disabled", false);
      });
  }
});

var delay = (function () {
  var timer = 0;
  return function (callback) {
    clearTimeout(timer);
    timer = setTimeout(callback, 1000);
  };
})();
