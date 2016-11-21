var state = 0;
var search = null;

function list(xml) {
  var div = document.createElement("DIV");
  div.innerHTML = xml;
  xml = div.children[0];
  var i = 0;
  for (; i < xml.children.length; i++) {
    console.log(xml.children);
    console.log(xml.children[0]);
    console.log(xml.children[0].name);
    var a = document.createElement("A");
    a.style = "font-size:24pt;";
    a.innerHTML = xml.children[i].name;
    var p = document.createElement("P");
    p.innerHTML = xml.children[i].description;
    var content = document.getElementById("content");
    content.appendChild(a);
    content.appendChild(p);
  }
}

window.onload = function () {
  var content = document.getElementById("content");
  content.innerHTML = "";
  if (state == 0) {
    var input = document.createElement("INPUT");
    var button = document.createElement("BUTTON");
    var breakLine = document.createElement("BR");
    button.innerHTML = "Search";
    button.onclick = function () {
      search = input.value;
    }
    content.appendChild(input);
    content.appendChild(button);
    content.appendChild(breakLine);
    var r = new XMLHttpRequest();
    r.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (r.status === 200) {
          list(this.responseText);
        }
      }
    };
    r.open('GET', "index.xml");
    r.send();
  }
}
