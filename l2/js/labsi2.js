/*
  LabSI2 - 2015
*/

$(document).ready(function() {
  hide();
  $("#dados_biblio").show();
  });

function hide() {
  $("#dados_biblio").hide();
  $("#formacao").hide();
  $("#docencia").hide();
  $("#investigacao").hide();
  $("#responsabilidades").hide();
  $("#contacto").hide();
}

function mostrarDadosBiblio () {
  hide();
  $("#dados_biblio").show();
}

function mostrarFormacao () {
  hide();
  $("#formacao").show();
}

function mostrarDocencia () {
  hide();
  $("#docencia").show();
}

function mostrarInvestigacao () {
  hide();
  $("#investigacao").show();
}

function mostrarResponsabilidades () {
  hide();
  $("#responsabilidades").show();
}

function mostrarContacto () {
  hide();
  $("#contacto").show();
}