var state = 0;
var search = null;
var searchBool = false;
var tabs = [];

function showTab(tab,id) {
  var tabObj = tabs[tab];
  var i = 0;
  var content = document.getElementById("files");
  content.innerHTML = "";
  for (; i < tabObj.files.length; i++) {
    var a = document.createElement("A");
    a.innerHTML = tabObj.names[i] + " (" + tabObj.files[i] + ")";
    a.href = "./archive/" + id + "/" + tabObj.files[i];
    a.id = "file";
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
        var div = document.createElement("DIV");
        div.innerHTML = xml;
        xml = div.children[0];
        var name = document.createElement("A");
        name.innerHTML = xml.children[0].getAttribute("name");
        name.id = "longName";
        var description = document.createElement("P");
        description.innerHTML = xml.children[0].getAttribute("value");
        description.id = "longDescription";
        var content = document.getElementById("content");
        content.appendChild(name);
        content.appendChild(document.createElement("BR"));
        content.appendChild(description);
        var i = 1;
        tabs = [];
        for (; i < xml.children.length; i++) {
          var a = document.createElement("A");
          a.innerHTML = xml.children[i].getAttribute("value");
          a.href = "#" + id;
          a.setAttribute("onclick","showTab(" + (i - 1) + ",\"" + id + "\");");
          a.id = "tab";
          content.appendChild(a);
          var xmlInner = xml.children[i].children;
          var k = 0;          
          tabs[i - 1] = new Object();
          tabs[i - 1].files = [];
          tabs[i - 1].names = [];
          for (; k < xmlInner.length; k++) {
            tabs[i - 1].files.push(xmlInner[k].getAttribute("value"));
            tabs[i - 1].names.push(xmlInner[k].getAttribute("name"));
          }
        }
        content.appendChild(document.createElement("BR"));
        content.appendChild(document.createElement("BR"));
        var files = document.createElement("DIV");
        files.id = "files";
        content.appendChild(files);
        showTab(0,id);
      } else {
        document.location = document.location.origin + document.location.pathname;
        document.location.reload();
      }
    }
  };
  r.open('GET', "./archive/" + id + "/index.xml");
  r.send();
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
    eval("a.onclick = function () {document.location = document.location.origin + document.location.pathname + \"#\" + \"" + xml.children[i].id + "\";document.location.reload();}");
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
  if (id.length > 1) {
    view(id);
    state = 1;
  } else {
    state = 0;
  }
  var content = document.getElementById("content");
  content.innerHTML = "";
  if (state == 0) {
    var input = document.createElement("INPUT");
    input.id = "search";
    var button = document.createElement("BUTTON");
    button.id = "searchButton";
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

window.onhashchange = function () {
  window.onload();
}
