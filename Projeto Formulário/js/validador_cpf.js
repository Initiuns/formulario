$(document).ready(function () {

  $('#DateN').mask("00/00/0000");
  $('#cpf').mask('000.000.000-00', { reverse: true });

  $('#forms').on('submit', function (e) {
    e.preventDefault();

    var form = document.querySelector('.needs-validation');

    if (form.checkValidity() === false) {

      e.stopPropagation();
      form.classList.add('was-validated');

    } else {

      var validaForm = ValidaFormulario();

      if (validaForm.ehValido) {
        alert("Verifique se todos os campos foram preenchidos corretamente")
        console.log('ERRO: ');
      } else {
        EnviaFormulario();
      }
    }
  });

  function validar() {

    var nome = cadastro.nome.value;

    if (nome === "") {
      alert("Digite seu nome !");
      cadastro.nome.focus();
      return false;
    }

  }

  function ValidaFormulario() {

    var result = {
      nome: {},
      email: {},
      dataNascimento: {},
      cpf: {},
      senha: {},
      gender: {},
      valido: false
    };

    var nome = $('#nNome').val();
    var email = $('#nEmail').val();
    var DateN = $('#DateN').val();
    var cpf = $('#cpf').val();
    var senha = $('#senha').val();
    var confsenha = $('#confsenha').val();
    var gender = $('#gender').val();

    if (nome != undefined && nome != '') {
      result.valido = true;
      alert("Campo nome com erro");
    } else {

      result.nome = nome;
      result.valido = false;
    }

    if (email != '' && email.match(/@/g) != null) {
      result.email = nEmail;
      result.valido = true;
    } else {
      result.valido = false;
      alert("Email inválido!");
    }

    if (isDate(DateN)) {
      result.DateN = DateN;
      result.valido = true;
    } else {
      result.valido = false;
      alert('Data de nascimento inválida!');
    }

    if (testaCPF(cpf)) {
      result.valido = true;
      alert('CPF Inválido!');
    } else {

      result.cpf = cpf;
      result.valido = false;
    }

    if (senha != '' && senha.length >= 6) {
      result.senha = senha;
      result.valido = true;
    } else {
      result.valido = false;
      alert("Senha inválida!");
    }

    if (senha != confsenha) {
      alert("As senhas estão diferentes.\nDigite as senhas iguais.");
      return false;
    }

    /*
    if (gender == true) {
      result.gender = gender;
      result.valido = false;
      alert("Marcado!");
    } else {
      alert("Marque o gênero!");
    }
*/
    return result;
  }

  function isDate(txtDate) {
    var currVal = txtDate;
    if (currVal == '')
      return false;
    //Declare Regex 
    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var dtArray = currVal.match(rxDatePattern);
    if (dtArray == null)
      return false;

    dtDay = dtArray[1];
    dtMonth = dtArray[3];
    dtYear = dtArray[5];
    if (dtMonth < 1 || dtMonth > 12)
      return false;
    else if (dtDay < 1 || dtDay > 31)
      return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
      return false;
    else if (dtMonth == 2) {
      var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
      if (dtDay > 29 || (dtDay == 29 && !isleap))
        return false;
    }
    return true;
  }

  function testaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
  }

  function EnviaFormulario() {
    alert("Enviado com sucesso!");
    window.location.href = "assets/confirmado.html";
  }

});