// File For defining various variables
const url = "http://localhost:3000/";
const darkElement = ["header", "#page-theme-toggle > img", "body", ".social-media", ".loaderbox-parent", ".loaderbox", ".instructions"];
const elements = ["addCodeHTML", "addCodeCSS", "showCodeHTML", "showCodeCSS", "editCodeHTML", "editCodeCSS"];
var addCodeHTML = ace.edit("addCodeHTML", { mode: "ace/mode/html", theme: "ace/theme/twilight", minLines: 10, maxLines: 42, fontSize: "16px", fontFamily: "monospace" });
var addCodeCSS = ace.edit("addCodeCSS", { mode: "ace/mode/css", theme: "ace/theme/twilight", minLines: 10, maxLines: 42, fontSize: "16px", fontFamily: "monospace" });
var showCodeHTML = ace.edit("showCodeHTML", { mode: "ace/mode/html", theme: "ace/theme/twilight", minLines: 10, maxLines: 42, readOnly: true, fontSize: "16px", fontFamily: "monospace" });
var showCodeCSS = ace.edit("showCodeCSS", { mode: "ace/mode/css", theme: "ace/theme/twilight", minLines: 10, maxLines: 42, readOnly: true, fontSize: "16px", fontFamily: "monospace" });
var editCodeHTML = ace.edit("editCodeHTML", { mode: "ace/mode/html", theme: "ace/theme/twilight", minLines: 10, maxLines: 42, fontSize: "16px", fontFamily: "monospace" });
var editCodeCSS = ace.edit("editCodeCSS", { mode: "ace/mode/css", theme: "ace/theme/twilight", minLines: 10, maxLines: 42, fontSize: "16px", fontFamily: "monospace" });
const dislike = "https://img.icons8.com/ios/50/000000/like--v1.png";
const like = ["https://img.icons8.com/clouds/100/000000/like.png", "https://img.icons8.com/plasticine/100/000000/hearts.png", "https://img.icons8.com/cotton/64/000000/hearts--v2.png", "https://img.icons8.com/plasticine/100/000000/melting-hert.png", "https://img.icons8.com/dusk/64/000000/diamond-heart.png", "https://img.icons8.com/plasticine/100/000000/music-heart.png"];
const themes = ["twilight", "tomorrow"];
const moon = "https://img.icons8.com/emoji/48/000000/crescent-moon-emoji.png";
const sun = "https://img.icons8.com/emoji/48/000000/sun-emoji.png";
