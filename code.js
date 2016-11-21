var state = 0;

window.onload = function () {
  var content = document.getElementById("content");
  content.innerHTML = "";
  if (state == 0) {
    var input = document.createElement("INPUT");
    var button = document.createElement("BUTTON");
    var breakLine = document.createElement("BR");
    button.innerHTML = "Search";
    content.appendChild(input);
    content.appendChild(button);
    content.appendChild(breakLine);
  }
}
