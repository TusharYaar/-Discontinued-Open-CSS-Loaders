var loaderData = new Array();
var oldStyle = "";
var idtoadd = 0;
var editthis = 0;
var existingKeyframes = new Array();
const darkElement = ["header", "#page-theme-toggle > div", "body", ".social-media"];
window.addEventListener("DOMContentLoaded", () => {
  var template = "<div class='loaderbox-parent'></div>";

  function LoadLoaderData() {
    $(".container").html("");
    oldStyle = "";
    loaderData.forEach(function (loader, index, arr) {
      var loaderbox = $(loader.html);
      loaderbox.addClass("loaderbox");
      loaderbox.data("index", index);
      var loaderboxParent = $(template);
      loaderboxParent.append(loaderbox);
      loaderboxParent.data("index", index);
      loaderboxParent.append("<h4>" + loader.name + "</h4>");
      loaderboxParent.append("<h5>" + loader.contributer + "</h5>");
      $(".container").append(loaderboxParent);
      $("style").append(loader.css);
      idtoadd = idtoadd <= loader.loaderid ? loader.loaderid + 1 : idtoadd;
      oldStyle += " " + loader.css;
    });
    $("#id-to-add").text("loader" + idtoadd);
    makeKeyframes();
  }
  $(".container").on("click", "div.loaderbox-parent", function () {
    editthis = $(this).data("index");
    console.log(editthis);
    $(".code-snippet-container").removeClass("active");
    $("#code-snippet").addClass("active");
    $("#code-snippet > h3").text(loaderData[editthis].name);
    $("#code-snippet .language-html").html(alterHTML(loaderData[editthis].html));
    $("#code-snippet .language-css").html(loaderData[editthis].css);
    Prism.highlightElement($("#code-snippet .language-css")[0]);
    Prism.highlightElement($("#code-snippet .language-html")[0]);
  });

  // Click Events
  $(".code-snippet-container > img").click(() => {
    $(".code-snippet-container").removeClass("active");
  });
  $("#btn-add-code-snippet").click(() => {
    var hasClass = $("#add-code-snippet").hasClass("active");
    $(".code-snippet-container").removeClass("active");
    if (!hasClass) $("#add-code-snippet").addClass("active");
  });
  $("#theme-select").change(function () {
    $("#prism-theme").attr("href", $(this).val());
  });

  $("#page-theme-toggle").click(function () {
    darkElement.forEach((element) => {
      $(element).toggleClass("dark");
    });
  });
  $("#btn-popupBox").click(() => {
    $(".popup-container").css("display", "none");
    $("body").css("overflow", "auto");
  });

  $(".instruction").click(function () {
    $(this).toggleClass("active");
  });
  $("#inpage-links > a").click(function () {
    var id = $(this).attr("href");
    $(id).toggleClass("active");
  });

  $("#btn-edit-code-snippet").click(() => {
    $(".code-snippet-container").removeClass("active");
    $("#edit-code-snippet").addClass("active");
    $("#edit-code-snippet-html-input").val(changeid(loaderData[editthis].html));
    $("#edit-code-snippet code.language-html").html(changeid(alterHTML(loaderData[editthis].html)));
    $("#edit-code-snippet-css-input").val(changeid(loaderData[editthis].css));
    $("#edit-code-snippet code.language-css").html(changeid(loaderData[editthis].css));
    $("#edit-code-snippet > h4").text(loaderData[editthis].name);
    $("#edit-code-snippet-output").html("<div>" + changeid(loaderData[editthis].html) + "</div>");
    $("style").text(oldStyle + $("#edit-code-snippet-css-input").val());
    Prism.highlightElement($("#edit-code-snippet code.language-html")[0]);
    Prism.highlightElement($("#edit-code-snippet code.language-css")[0]);
  });

  // Add Code Button
  // Send a Post request to the server
  $("#btn-add-code").click(function () {
    var obj = {
      name: $("#add-loader-name").val(),
      html: $("#code-snippet-html-input").val(),
      css: $("#code-snippet-css-input").val(),
      contributer: $("#code-snippet-contributor").val(),
      loaderid: idtoadd,
    };
    if (obj.name.length < 3 || obj.html.length < 3 || obj.css.length < 3) {
      alert("Less Number of Characters Provided");
    } else if (ifIDPresent(obj) && checkKeyframes(obj.css)) {
      $("#add-loader-name").val("");
      $("#code-snippet-html-input").val("");
      $("#code-snippet-css-input").val("");
      $("#code-snippet-contributor").val("");

      $(".code-snippet-container").removeClass("active");
      $.post("https://wb26iz.deta.dev/api/addthiscode", obj)
        .done((data) => {
          loaderData.push(data);
          LoadLoaderData();
        })
        .catch((err) => {
          alert("Error!!! Cannot Add the Loader");
        });
    }
  });

  $("#code-snippet-html-input").keyup(() => {
    $("#add-code-snippet-output").html($("#code-snippet-html-input").val());
  });
  $("#code-snippet-css-input").keyup(() => {
    $("style").text(oldStyle + $("#code-snippet-css-input").val());
  });
  $("#edit-code-snippet-html-input").keyup(() => {
    $("#edit-code-snippet-output > div").html($("#edit-code-snippet-html-input").val());
  });
  $("#edit-code-snippet-css-input").keyup(() => {
    $("style").text(oldStyle + $("#edit-code-snippet-css-input").val());
  });

  // Quote Generation And Clicking Response
  function generateQuote() {
    $.get("https://wb26iz.deta.dev/api/getquote").done(function (data) {
      $("#quote").text(data);
    });
  }
  generateQuote();
  // run as soon as page loads
  // Calls functions to show the loaders
  // call the async request to generate quote
  $("#add-code-snippet").removeClass("active");
  $("#code-snippet").removeClass("active");

  $.getJSON("https://wb26iz.deta.dev/api/allloader").done(function (data) {
    loaderData = data.value;
    LoadLoaderData();
  });

  function ifIDPresent(obj) {
    var htmlre = new RegExp("loader" + idtoadd);
    var cssre = new RegExp("#loader" + idtoadd);
    var htmlren = new RegExp("loader[^" + idtoadd + "]");
    var cssren = new RegExp("#loader[^" + idtoadd + "]");
    console.log(htmlre + " " + cssre + " " + cssren + " " + htmlren);
    if (htmlre.test(obj.html) && !htmlren.test(obj.html) && cssre.test(obj.css) && !cssren.test(obj.css)) return true;
    else {
      alert("Wrong ID/s Provided");
      return false;
    }
  }
  function alterHTML(myStr) {
    let res = "";
    for (var i = 0; i < myStr.length; i++) {
      if (myStr[i] == "<") res += "&lt;";
      else if (myStr[i] == ">") res += "&gt;";
      else res += myStr[i];
    }
    return res;
  }
  function changeid(str) {
    var num = loaderData[editthis].loaderid;
    var re = new RegExp("loader" + num, "g");
    console.log(re);
    var newid = "editloader" + num;
    console.log(newid);
    str = str.replaceAll(re, newid);
    console.log(str);
    return str;
  }

  function makeKeyframes() {
    var keyframeRE = new RegExp("@keyframes\\s\\w*", "gi");
    var arr = oldStyle.match(keyframeRE);
    existingKeyframes = [...arr];
    console.log(existingKeyframes);
  }
  function checkKeyframes(style) {
    var keyframeRE = new RegExp("@keyframes\\s\\w*", "gi");
    var keyframes = style.match(keyframeRE);
    var exist = true;
    for (var i = 0; i < keyframes.length; i++) {
      if (existingKeyframes.indexOf(keyframes[i]) !== -1) {
        exist = false;
        alert("The Keyframes Name already exists!! Please choose another");
        return false;
      }
    }
    if (exist) return true;
    else return false;
  }
});
