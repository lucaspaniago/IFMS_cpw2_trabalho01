function decimalParaBinario() {
    let decimal = document.getElementById('decimal').value;
    console.log("decimal: " + decimal);
    if (decimal != '') {
        //deleta a div com os resultados existentes e, posteriormente, cria outra div para conter os próximos resultados
        let conteudoResultado = document.getElementById('conteudoResultado');

        conteudoResultado.innerText = "";

        let divResultado = document.createElement('div');
        divResultado.setAttribute('id', 'resultado');
        conteudoResultado.appendChild(divResultado);

        let rotulo = decimal + " → ";
        let binario = "";
        if (decimal == 0) {
            binario = 0;
        }
        else {
            while (decimal > 0) {
                let bit = parseInt(decimal % 2).toString();
                binario = bit + binario;
                //console.log ("binario: " + binario);
                //console.log (decimal + ' % 2 = ' + (decimal % 2));
                decimal = Number.parseInt(decimal / 2);
            }
        }

        //console.log(binario);
        divResultado.appendChild(document.createTextNode(rotulo + binario));
    }
    else {
        let conteudoResultado = document.getElementById('conteudoResultado');

        conteudoResultado.innerText = "";
    }

}