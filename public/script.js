var loaderData = new Array();
var oldStyle = "";
var idtoadd = 0;
var editthis = 0;
var existingKeyframes = new Array();
var dark = false;

window.addEventListener("DOMContentLoaded", () => {
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
        // console.log("dark class added");
      }
      loaderboxParent.append(loaderbox);
      loaderboxParent.data("index", index);
      loaderboxParent.data("id", loader.loaderid);
      loaderboxParent.append(`<h4>${loader.lname}</h4> <h5>${loader.contributor}</h5> <div class="likes"><img src=${dislike}><h6>${loader.likes}</h6></div>`);

      $(".container").append(loaderboxParent);
      $("style#loaderStyle").append(loader.css);
      idtoadd = idtoadd <= loader.loaderid ? loader.loaderid + 1 : idtoadd;
      oldStyle = ` ${oldStyle} ${loader.css}`;
    });
    $("#id-to-add").text("loader" + idtoadd);
    makeKeyframes();
  }
  $(".container").on("click", "div.loaderbox-parent", function () {
    editthis = $(this).data("index");
    $(".code-snippet-container").removeClass("active");
    $("#showCode").addClass("active");
    $("#showCode > h4").text(loaderData[editthis].lname);
    showCodeHTML.setValue(loaderData[editthis].html);
    showCodeCSS.setValue(loaderData[editthis].css);
  });
  $(".container").on("click", "div.likes", function (e) {
    e.stopPropagation();
    var id = $(this).parent().data().id;
    var data = dislike === $(this).children("img").attr("src");
    $.ajax({
      method: "PUT",
      url: `${url}api/like/${id}`,
      data: `like=${data}`,
    }).done((data) => {
      if (data.val == 1) $(this).children("img").removeClass("dark");
      else if (data.val == -1 && dark) $(this).children("img").addClass("dark");
      var element = $(this).children("h6");
      element.text(parseInt(element.text()) + data.val);
      var img = data.val === 1 ? like[Math.floor(Math.random() * like.length)] : dislike;
      $(this).children("img").attr("src", img);
    });
  });

  // Click Events
  $(".code-snippet-container > img").click(() => {
    $(".code-snippet-container").removeClass("active");
  });
  $("#btnAddCode").click(() => {
    var hasClass = $("#addCode").hasClass("active");
    $(".code-snippet-container").removeClass("active");
    if (!hasClass) $("#addCode").addClass("active");
  });
  function fillThemeSelect() {
    themes.forEach((theme) => {
      $("#theme-select").append(`<option value="${theme}">${theme}</option>`);
    });
  }
  $("#theme-select").change(function () {
    addCodeHTML.setTheme(`ace/theme/${$(this).val()}`);
    addCodeCSS.setTheme(`ace/theme/${$(this).val()}`);
    showCodeHTML.setTheme(`ace/theme/${$(this).val()}`);
    showCodeCSS.setTheme(`ace/theme/${$(this).val()}`);
    editCodeHTML.setTheme(`ace/theme/${$(this).val()}`);
    editCodeCSS.setTheme(`ace/theme/${$(this).val()}`);
  });

  $("#page-theme-toggle").click(function () {
    var img = $(this).children("img");
    dark = img.attr("src") == sun ? false : true;
    img.attr("src", dark ? sun : moon);

    darkElement.forEach((element) => {
      if (dark) {
        $(element).removeClass("dark");
      } else {
        $(element).addClass("dark");
      }
    });
    dark = !dark;
  });
  $("#btn-popupBox").click(() => {
    $(".popup-container").css("display", "none");
    $("body").css("overflow", "auto");
  });

  $(".instruction").click(function () {
    $(this).toggleClass("active");
  });
  $("#inpage-links > a").click(function (e) {
    var id = $(this).attr("href");
    $("body,html").animate({ scrollTop: $(id).offset().top }, "slow", function () {
      $(id).addClass("active");
    });
    e.preventDefault();
  });

  $("#btnEditCode").click(() => {
    var html = changeid(loaderData[editthis].html);
    var css = changeid(loaderData[editthis].css);
    $(".code-snippet-container").removeClass("active");
    $("#editCode").addClass("active");
    editCodeHTML.setValue(html);
    editCodeCSS.setValue(css);
    $("#editCode > h4").text(loaderData[editthis].lname);
    $("#editCodeOutput").html(`<div>${html}</div>`);
    $("style#loaderStyle").text(oldStyle + css);
  });

  // Add Code Button
  // Send a Post request to the server
  $("#btnAddThisCode").click(function () {
    var obj = {
      lname: $("#addLoaderName").val(),
      html: addCodeHTML.getValue(),
      css: addCodeCSS.getValue(),
      contributor: $("#addContributorName").val(),
      loaderid: idtoadd,
    };
    if (obj.lname.length < 3 || obj.html.length < 6 || obj.css.length < 26) {
      alert("Less Number of Characters Provided");
    } else if (ifIDPresent(obj) && checkKeyframes(obj.css)) {
      $(this).attr("disabled", true);
      $.post(`${url}api/addthiscode`, obj)
        .done((data) => {
          obj.likes = 0;
          loaderData.push(obj);
          LoadLoaderData();
          $("#addLoaderName").val("");
          addCodeHTML.session.setValue("");
          addCodeCSS.session.setValue("");
          $("#addContributorName").val("");
          $(".code-snippet-container").removeClass("active");
          $(this).attr("disabled", false);
        })
        .catch((err) => {
          alert("Error!!! Cannot Add the Loader");
          $(this).attr("disabled", false);
        });
    }
  });

  addCodeHTML.session.on("change", function (delta) {
    delay(function () {
      $("#addCodeOutput").html(addCodeHTML.getValue());
    });
  });
  addCodeCSS.session.on("change", function (delta) {
    delay(function () {
      $("style#loaderStyle").text(oldStyle + addCodeCSS.getValue());
    });
  });

  editCodeHTML.session.on("change", function (delta) {
    delay(function () {
      $("#editCodeOutput > div").html(editCodeHTML.getValue());
    });
  });
  editCodeCSS.session.on("change", function (delta) {
    $("style#loaderStyle").text(oldStyle + editCodeCSS.getValue());
  });

  // Quote Generation And Clicking Response
  function generateQuote() {
    $.get(`${url}getquote`).done(function (data) {
      $("#quote").text(data);
    });
  }
  fillThemeSelect();
  generateQuote();
  $("#add-code-snippet").removeClass("active");
  $("#code-snippet").removeClass("active");

  $.getJSON(`${url}api/getloaders`).done(function (data) {
    loaderData = data;
    LoadLoaderData();
  });
  $("#go-to-top").click(function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });

  function ifIDPresent(obj) {
    var htmlre = new RegExp("loader" + idtoadd);
    var cssre = new RegExp("#loader" + idtoadd);
    var htmlren = new RegExp("loader[^" + idtoadd + "]");
    var cssren = new RegExp("#loader[^" + idtoadd + "]");
    // console.log(htmlre + " " + cssre + " " + cssren + " " + htmlren);
    if (htmlre.test(obj.html) && !htmlren.test(obj.html) && cssre.test(obj.css) && !cssren.test(obj.css)) return true;
    else {
      alert("Wrong ID/s Provided");
      return false;
    }
  }
  function changeid(str) {
    var num = loaderData[editthis].loaderid;
    var re = new RegExp("loader" + num, "g");
    // console.log(re);
    var newid = "editloader" + num;
    // console.log(newid);
    str = str.replaceAll(re, newid);
    // console.log(str);
    return str;
  }

  function makeKeyframes() {
    var keyframeRE = new RegExp("@keyframes\\s\\w*", "gi");
    var arr = oldStyle.match(keyframeRE);
    existingKeyframes = [...arr];
    // console.log(existingKeyframes);
    showExistingKeyframes(existingKeyframes);
  }
  function showExistingKeyframes(arr) {
    $("#existingKeyframes ul").html("");
    arr.forEach(function (a) {
      $("#existingKeyframes ul").append(`<li>${a}</li>`);
    });
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
  var delay = (function () {
    var timer = 0;
    return function (callback) {
      clearTimeout(timer);
      timer = setTimeout(callback, 1000);
    };
  })();
});
