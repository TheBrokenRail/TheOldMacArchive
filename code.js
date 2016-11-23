var state = 0;
var search = null;
var searchBool = false;
var tabs = [];

function showTab(tab,id) {
  var tabObj = tabs[tab];
  var i = 0;
  var content = document.getElementById("content");
  for (; i < tabObj.length; i++) {
    var a = document.createElement("A");
    a.innerHTML = tabObj.files[i];
    a.href = "./archive/" + id + tabObj.files[i];
    content.appendChild(a);
    content.appendChild(document.createElement("BR"));
  }
}

function view(id) {
  var xml = null;
  var r = new XMLHttpRequest();
  r.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (r.status === 200) {
        xml = this.responseText;
      }
    }
  };
  r.open('GET', "./archive/" + id + "/index.xml");
  r.send();
  var div = document.createElement("DIV");
  div.innerHTML = xml;
  xml = div.children[0];
  var description = document.createElement("P");
  description.innerHTML = xml.children[0].value;
  var content = document.getElementById("content");
  content.appendChild(description);
  var i = 1;
  for (; i < xml.children.length; i++) {
    var a = document.createElement("A");
    a.innerHTML = xml.children[i].value;
    a.href = "#" + id;
    a.setAttribute("onclick","showTab(" + i + "," + id + ");");
    var xmlInner = xml.children[i].children;
    var k = 0;
    tabs = [];
    tabs[i] = new Object();
    for (; k < xmlInner.length; k++) {
      tabs[i].files = [];
      tabs[i].files.push(xmlInner[k].value);
    }
  }
}

function list(xml) {
  var div = document.createElement("DIV");
  div.innerHTML = xml;
  xml = div.children[0];
  var i = 0;
  for (; i < xml.children.length; i++) {
    var a = document.createElement("A");
    a.id = "name";
    a.href = "#" + xml.children[i].id;
    a.setAttribute("onclick", "window.onload()");
    a.innerHTML = xml.children[i].getAttribute("name");
    var p = document.createElement("P");
    p.innerHTML = xml.children[i].getAttribute("description");
    p.id = "description";
    var content = document.getElementById("content");
    if (xml.children[i].getAttribute("name").search(search) != -1 && searchBool == true) {
      content.appendChild(a);
      content.appendChild(p);
    } else if (searchBool == false) {
      content.appendChild(a);
      content.appendChild(p);
    }
  }
}

window.onload = function () {
  var id = location.hash.substring(1);
  if (id.length < 1 || isFinite(id)) {
    view(id);
    state = 1;
  } else {
    state = 0;
  }
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
