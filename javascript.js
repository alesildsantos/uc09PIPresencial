function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('fLog').value=("");
    document.getElementById('fBai').value=("");
    document.getElementById('fCid').value=("");
    document.getElementById('fEst').value=("");
    //document.getElementById('fIbg').value=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('fLog').value=(conteudo.logradouro);
    document.getElementById('fBai').value=(conteudo.bairro);
    document.getElementById('fCid').value=(conteudo.localidade);
    document.getElementById('fEst').value=(conteudo.uf);
    //document.getElementById('fIbg').value=(conteudo.ibge);
} //end if.
else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
}
}

function pesquisacep(valor) {

//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if(validacep.test(cep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('fLog').value="...";
        document.getElementById('fBai').value="...";
        document.getElementById('fCid').value="...";
        document.getElementById('fEst').value="...";
        //document.getElementById('ibge').value="...";

        //Cria um elemento javascript.
        var script = document.createElement('script');

        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

    } //end if.
    else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }
} //end if.
else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
}
};