/*
  AUTOR: Pedro Santos 12551
  2014 - 2015
*/

/*
  Inicialização das variáveis
*/
var username;
var password;
var trd;
var proposta;
var fontSize = 1;
var http_request = false;
var xml_tree;

/*
  Load XML
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
  Funções previamente preparadas
*/
$(document).ready(function() {
  hide();
  enterToSubmit();

  $("#btn-entrar").click(function() {
    login();
  });
  $("#btn-logout").click(function() {
    logout();
  });
  $("#username").focus(function() {
    $("#username").css({
      "border": "3px solid rgba(0, 0, 0, 0.15)"
    });
  });
  $("#password").focus(function() {
    $("#password").css({
      "border": "3px solid rgba(0, 0, 0, 0.15)"
    });
  });

  filterTableContents();
  tableClickAction();
  changeDocente();
});

/*
  Filtros para o plugin utilizado para a construção de tabelas
*/
function filterTableContents() {
  // ignora o erro caso uma linda da tabela esteja selecionada ao atualizar a página
  $.fn.dataTableExt.sErrMode = "throw";

  $('#table-construct').dataTable({
    "bPaginate": false,
    "bLengthChange": false,
    "bFilter": true,
    "bInfo": false,
    "bAutoWidth": false
  });
}

/*
  Selecionar uma linha da tabela, verificando se já está alguma selecionada antes
*/
function tableClickAction() {
  var table = $('#table-construct').DataTable();
  $('#table-construct tbody').on('click', 'tr', function() {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
    } else {
      table.$('tr.selected').removeClass('selected');
      $(this).addClass('selected');
      trd = $(this);
    }
  });
  $('#btn-confirm-table').click(function() {

    proposta = $(trd).find("td").first().text();
    $("#proposta-seleccionada").append(proposta);
  });
}

/*
  Funcao que verifica que a tecla 'enter' foi pressionada no teclado e simula o clique no botao entrar
*/
function enterToSubmit() {
  $("input").keypress(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      $("#btn-entrar").click();
    }
  });
}

/*
  Funcao que esconde as divs no inicio da aplicacao
*/
function hide() {
  $("#login-error").hide();
  $("#nomear-juri").hide();
  $("#prorrogacao").hide();
  $("#sucesso-prorrogacao").hide();
  $("#action-cancel").hide();
  $("#disponibilizar-proposta").hide();
  $("#sucesso-proposta-votacao").hide();
  $("#nomear-juri-second-page").hide();
  $("#sucesso-nomeacao").hide();
}

/*
  Funcao que esconde as divs desnecessarias para a acção pretendida
*/
function resetContent() {
  $("#alertas").hide();
  $("#nomear-juri").hide();
  $("#prorrogacao").hide();
  $("#bar-start").css({
    "background-color": "rgba(0, 0, 0, 0.0)"
  });
  $("#bar-prorr").css({
    "background-color": "#fff"
  });
  $("#bar-proposta").css({
    "background-color": "#fff"
  });
  $("#bar-pe-orientar").css({
    "background-color": "rgba(0, 0, 0, 0.0)"
  });
  $("#sucesso-prorrogacao").hide();
  $("#action-cancel").hide();
  $("#disponibilizar-proposta").hide();
  $("#sucesso-proposta-votacao").hide();
  $("#nomear-juri-second-page").hide();
  $("#sucesso-nomeacao").hide();
}

/*
  Funcao que verifica as credenciais inseridas pelo utilizador, e compara-as com o ficheiro - logins.xml.
  Tambem mostra ao utilizador o feedback de erro caso se tenha enganado na password
*/
function login() {
  username = $("#username").val();
  password = $("#password").val();

  xmlDoc = loadXML('xml/logins.xml');

  xUser = xml_tree.getElementsByTagName("USER");
  xPass = xml_tree.getElementsByTagName("PASS");
  xUrl = xml_tree.getElementsByTagName("PAGE");

  for (i = 0; i < xUser.length; i++) {
    yUser = xUser[i].childNodes[0].nodeValue;
    yPass = xPass[i].childNodes[0].nodeValue;
    yUrl = xUrl[i].childNodes[0].nodeValue;

    if (username == yUser && password == yPass) {
      $("#username").val("");
      $("#password").val("");
      window.location = yUrl;
    } else if (username == "" && password == "") {
      $("#login-error").text("Preencha todos os campos!");
      $("#login-error").fadeIn();
      $("#username").css({
        "border": "3px solid #F00"
      });
      $("#password").css({
        "border": "3px solid #F00"
      });
    } else if (username == "") {
      $("#login-error").text("Preencha todos os campos!");
      $("#login-error").fadeIn();
      $("#username").css({
        "border": "3px solid #F00"
      });
    } else if (password == "") {
      $("#login-error").text("Preencha todos os campos!");
      $("#login-error").fadeIn();
      $("#password").css({
        "border": "3px solid #F00"
      });
    } else {
      $("#login-error").text("Nome de utilizador ou senha incorretos!");
      $("#login-error").fadeIn();
    };
  }
}

/*
  Funcao Terminar sessao
*/
function logout() {
  window.location.href = "index.html";
}

function home() {
  resetContent();
  $("#bar-start").css({
    "background-color": "rgba(0, 0, 0, 0.16)"
  });
  $("#alertas").show();
  if ($("#confirmed-date").length != 0) {
    $("#confirmed-date").remove();
  }
  if ((proposta).length != 0) {
    $("#proposta-seleccionada").remove(proposta);
  }
}

/*
  Mostra a div seguinte
*/
function mostrarProposta1() {
  $("#show-concluida1").show();
}

/*
  Mostra a div seguinte
*/
function mostrarProposta2() {
  $("#show-concluida2").show();
}

/*
  Mostra a div seguinte
*/
function projOrientar() {
  resetContent();
  $("#bar-pe-orientar").css({
    "background-color": "rgba(0, 0, 0, 0.16)"
  });
  $("#nomear-juri").show();
}

/*
  Mostra a div seguinte
*/
function pedirProrrogacao() {
  resetContent();
  $("#bar-prorr").css({
    "background-color": "#E3E3E3"
  });
  $("#prorrogacao").show();
  return false;
}

/*
  Mostra a div seguinte
*/
function prorrogacaoSucesso() {
  resetContent();
  $("#sucesso-prorrogacao").show();
}

/*
  Mostra a div seguinte
*/
function propostaVotacao() {
  resetContent();
  $("#bar-proposta").css({
    "background-color": "#E3E3E3"
  });
  $("#disponibilizar-proposta").show();
}

/*
  Mostra a div seguinte
*/
function propostaVotacaoSucesso() {
  resetContent();
  $("#sucesso-proposta-votacao").show();
  appendDate();
}

/*
  Mostra a div seguinte
*/
function nomearJuriLast() {
  resetContent();
  $("#nomear-juri-second-page").show();
}

/*
  Mostra a div seguinte
*/
function nomearJuriSucesso() {
  resetContent();
  $("#sucesso-nomeacao").show();
  appendDateNomearJuri();
}

/*
  Mostra a div seguinte
*/
function cancelAction() {
  resetContent();
  $("#action-cancel").show();
}

/*
  Mostra a data escolhida na nova div
*/
function appendDate() {
  var dateValue = document.getElementById("finish-date").value;
  $("#limit-date").append('<p id="confirmed-date">Data final para votação: </p>');
  $("#confirmed-date").append(dateValue);
}

/*
  Mostra a data escolhida na nova div
*/
function appendDateNomearJuri() {
  var dateValue = document.getElementById("finish-date").value;
  $("#limit-date").append('<p id="confirmed-date">Data prevista para a prova pública: </p>');
  $("#confirmed-date").append(dateValue);
}

/*
  Mostra a fotografia do docente na tarefa - Nomear juri
*/
function changeDocente() {
  $("#select1").change(function() {
    var src = $(this).val();
    $("#info-presidente").html(src ? "<img src='" + src + "'>" : "");
  });
  $("#select2").change(function() {
    var src = $(this).val();
    $("#info-arguente").html(src ? "<img src='" + src + "'>" : "");
  });
}

/*
  Aumentar letra
*/
function zoomIn() {
  fontSize += 0.1;
  document.body.style.fontSize = fontSize + "em";
}

/*
  Diminuir letra
*/
function zoomOut() {
  fontSize -= 0.1;
  document.body.style.fontSize = fontSize + "em";
}
