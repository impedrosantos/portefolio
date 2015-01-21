/*
  AUTOR: Pedro Santos 12551
  2014 - 2015
*/

/*
  Inicializacao das variaveis
*/
var http_request = false;
var xml_tree;

/*
  Carregar xml
*/
function loadXML(xmlFile) {

  http_request = false;
  if (window.XMLHttpRequest) { // Mozilla, Safari,...
    http_request = new window.XMLHttpRequest();

  } else if (window.ActiveXObject) { // InternetExplorer
    try {
      http_request = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {
      try {
        http_request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {}
    }
  }

  if (!http_request) {
    alert('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }

  http_request.open("GET", xmlFile, false);

  http_request.send(null);
  xml_tree = http_request.responseXML;
}

/*
  Mostra na pagina principal os campos de uma proposta, lidos a partir de um ficheiro xml: propostas.xml
*/
function loadSelect() {
  xmlDoc = loadXML('xml/propostas.xml');

  document.write("<h2>Proposta</h2>");
  title = xml_tree.getElementsByTagName("TITLE");
  for (t = 0; t < title.length; t++) {
    document.write(title[t].childNodes[0].nodeValue);
    document.write("<br>");
  }

  document.write("<h2>Introdução</h2>");
  intro = xml_tree.getElementsByTagName("INTRO");
  for (i = 0; i < intro.length; i++) {
    document.write(intro[i].childNodes[0].nodeValue);
    document.write("<br>");
  }

  document.write("<h2>Objetivos</h2>");
  goals = xml_tree.getElementsByTagName("GOALS");
  for (g = 0; g < goals.length; g++) {
    document.write(goals[g].childNodes[0].nodeValue);
    document.write("<br>");
  }

  document.write("<h2>Faseamento</h2>");
  phasing = xml_tree.getElementsByTagName("PHASING");
  for (p = 0; p < phasing.length; p++) {
    document.write(phasing[p].childNodes[0].nodeValue);
    document.write("<br>");
  }

  document.write("<h2>Tecnologias a utilizar</h2>");
  tech = xml_tree.getElementsByTagName("TECHNOLOGIES");
  for (th = 0; th < tech.length; th++) {
    document.write(tech[th].childNodes[0].nodeValue);
    document.write("<br>");
  }

  document.write("<h2>Bibliografia</h2>");
  bibl = xml_tree.getElementsByTagName("BIBLIOGRAPHY");
  for (b = 0; b < bibl.length; b++) {
    document.write(bibl[b].childNodes[0].nodeValue);
    document.write("<br>");
  }
}
