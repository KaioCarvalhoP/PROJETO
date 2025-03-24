
document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("nome");
    
    function aplicarMascaraLetras(input) {
    input.addEventListener("input", function() {
        this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    });
}

    const inputs = document.querySelectorAll('.form-control-letras');
    inputs.forEach(aplicarMascaraLetras);

});

// new Cleave('#telefone', {
//     delimiters: ['(', ')', '-'],
//     blocks: [0, 2, 5, 4],
//     numericOnly: true
// });

// new Cleave('#cpf', {
//     delimiters: ['.', '.', '-'],
//     blocks: [3, 3, 3, 2],
//     numericOnly: true
// });

// new Cleave('#cnpj', {
//     delimiters: ['.', '.', '/', '-'],
//     blocks: [2, 3, 3, 4, 2],
//     numericOnly: true
// });

// new Cleave('#cep', {
//     delimiters: ['-'],
//     blocks: [5, 3],
//     numericOnly: true
// });

// new Cleave('#numero', {
//     blocks: [5],
//     numericOnly: true
// });
// new Cleave('#uf', {
//     blocks: [2],
//     uppercase: true,
    
// });

function selecionaCEP(){
    document.getElementById('rua')
    document.getElementById('bairro')
    document.getElementById('cidade')
    document.getElementById('uf')   
}

function dadosPessoais(){
    document.getElementById('nome')
    document.getElementById('email')
    document.getElementById('telefone')
    document.getElementById('cpf')
}

function limpa_formulario() {
    document.getElementById('nome').value=("");
    document.getElementById('email').value=("");
    document.getElementById('telefone').value=("");
    document.getElementById('cpf').value=("");
    document.getElementById('rua').value=("");
    document.getElementById('numero').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('uf').value=("");
}

function callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value=(conteudo.logradouro);
        document.getElementById('bairro').value=(conteudo.bairro);
        document.getElementById('cidade').value=(conteudo.localidade);
        document.getElementById('uf').value=(conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulario();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('rua').value="...";
        document.getElementById('bairro').value="...";
        document.getElementById('cidade').value="...";
        document.getElementById('uf').value="...";

        //Cria um elemento javascript.
        var script = document.createElement('script');

        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=callback';
        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

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
};