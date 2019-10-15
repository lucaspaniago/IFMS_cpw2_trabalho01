function decimalParaBinario() {
    //deleta a div com os resultados existentes e, posteriormente, cria outra div para conter os próximos resultados
    let conteudoResultado = document.getElementById('conteudoResultado');
    let divResultadoAntiga = document.getElementById('resultado');
    conteudoResultado.removeChild(divResultadoAntiga);
    let divResultado = document.createElement('div');
    divResultado.setAttribute('id', 'resultado');
    conteudoResultado.appendChild(divResultado);
    
    let decimal = document.getElementById('decimal').value;
    
    let rotulo = decimal + " → "; 
    let binario = "";
    while (decimal > 0) {
        let bit = parseInt(decimal % 2).toString();
        binario = bit + binario;
        //console.log ("binario: " + binario);
        //console.log (decimal + ' % 2 = ' + (decimal % 2));
        decimal = Number.parseInt(decimal / 2);
    }

    //console.log(binario);
    divResultado.appendChild(document.createTextNode(rotulo + binario));
}