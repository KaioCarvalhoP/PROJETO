document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("nome");

  function aplicarMascaraLetras(input) {
    input.addEventListener("input", function () {
      this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    });
  }

  const inputs = document.querySelectorAll(".form-control-letras");
  inputs.forEach(aplicarMascaraLetras);
});

document.addEventListener("DOMContentLoaded", function () {
  const mostrarCPF = document.getElementById("cpf-radio");
  const mostrarCNPJ = document.getElementById("cnpj-radio");
  const cpf = document.getElementsByClassName("cpf")[0];
  const cnpj = document.getElementsByClassName("cnpj")[0];
  const cpfLabel = document.getElementById("cpf-label");
  const cnpjLabel = document.getElementById("cnpj-label");

  function adicionarCPF() {
    if (mostrarCPF.checked) {
      cpf.style.display = "block";
      cnpj.style.display = "none";
      cpfLabel.required = true;
      cnpjLabel.required = false;
    } else {
      cpf.style.display = "none";
    }
  }

  function adicionarCNPJ() {
    if (mostrarCNPJ.checked) {
      cnpj.style.display = "block";
      cpf.style.display = "none";
      cnpjLabel.required = true;
      cpfLabel.required = false;
    } else {
      cnpj.style.display = "none";
    }
  }

  mostrarCPF.addEventListener("change", adicionarCPF);
  mostrarCNPJ.addEventListener("change", adicionarCNPJ);
});

function limpa_formulario() {
  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("cpf").value = "";
  document.getElementById("rua").value = "";
  document.getElementById("numero").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("uf").value = "";
}

function callback(conteudo) {
  if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById("rua").value = conteudo.logradouro;
    document.getElementById("bairro").value = conteudo.bairro;
    document.getElementById("cidade").value = conteudo.localidade;
    document.getElementById("uf").value = conteudo.uf;
  } //end if.
  else {
    //CEP não Encontrado.
    limpa_formulario();
    alert("CEP não encontrado.");
  }
}

function pesquisacep(vrl) {
  let valor = vrl.value;
  var cep = valor.replace(/\D/g, "");

  if (cep.length == 8) {
    console.log(cep.length);

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById("rua").value = "...";
        document.getElementById("bairro").value = "...";
        document.getElementById("cidade").value = "...";
        document.getElementById("uf").value = "...";

        //Cria um elemento javascript.
        var script = document.createElement("script");

        //Sincroniza com o callback.
        script.src =
          "https://viacep.com.br/ws/" + cep + "/json/?callback=callback";
        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);
        console.log(script);
      } //end if.
      else {
        //cep é inválido.
        limpa_formulario();
        alert("Formato de CEP inválido.");
      }
    } //end if.
    else {
      //cep sem valor, limpa formulário.
      limpa_formulario();
    }
  }
}
