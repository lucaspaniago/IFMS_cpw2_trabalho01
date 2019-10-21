function calculaIMC() {
    let peso = document.getElementById('peso').value;
    let altura = document.getElementById('altura').value;

    if (peso != '' && altura != '') {
        //deleta a div com os resultados existentes e, posteriormente, cria outra div para conter os próximos resultados
        let conteudoResultado = document.getElementById('conteudoResultado');


        conteudoResultado.innerText = "";

        let divResultado = document.createElement('div');
        divResultado.setAttribute('id', 'resultado');
        conteudoResultado.appendChild(divResultado);

        let IMC = peso / (altura * altura);


        let classificação;
        if (IMC < 18.5) {
            classificação = "Abaixo do peso";
        }
        else if (IMC < 25) {
            classificação = "Peso normal";
        }
        else if (IMC < 30) {
            classificação = "Sobrepeso";
        }
        else if (IMC < 35) {
            classificação = "Obesidade I";
        }
        else if (IMC < 40) {
            classificação = "Obesidade II";
        }
        else {
            classificação = "Obesidade III";
        }

        //console.log(binario);
        divResultado.appendChild(document.createTextNode('IMC = ' + IMC.toFixed(2) + ' - Classificação: ' + classificação));
    }
    else {
        let conteudoResultado = document.getElementById('conteudoResultado');
        conteudoResultado.innerText = "";
    }
}