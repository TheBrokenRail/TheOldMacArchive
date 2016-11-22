var state = 0;
var search = null;
var searchBool = false;

function list(xml) {
  var div = document.createElement("DIV");
  div.innerHTML = xml;
  xml = div.children[0];
  var i = 0;
  for (; i < xml.children.length; i++) {
    var a = document.createElement("NAME");
    a.innerHTML = "<p>" + xml.children[i].getAttribute("name") + "</p>";
    var p = document.createElement("P");
    p.innerHTML = "<p>" + xml.children[i].getAttribute("description") + "</p>";
    var content = document.getElementById("content");
    if (xml.children[i].getAttribute("name").search(search) != -1 && searchBool == true) {
      content.appendChild(a);
      content.appendChild(p);
    }
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
      searchBool = true;
      window.onload();
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
