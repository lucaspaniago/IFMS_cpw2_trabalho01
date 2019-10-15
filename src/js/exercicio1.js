function fibonacci() {
    let quantidadeDeElementos = document.getElementById('quantidadeDeElementos').value;
    let conteudoResultado = document.getElementById('conteudoResultado');
    //console.log('Quantidade de elementos: ' + quantidadeDeElementos);

    //deleta a div com os resultados existentes e, posteriormente, cria outra div para conter os próximos resultados
    let divResultadoAntiga = document.getElementById('resultado');
    conteudoResultado.removeChild(divResultadoAntiga);
    let divResultado = document.createElement('div');
    divResultado.setAttribute('id', 'resultado');
    conteudoResultado.appendChild(divResultado);

    let a = 0;
    let b = 1;

    for (let i = 0; i < quantidadeDeElementos; i++) {
        if (i > 0) {
            console.log("entrei aqui");
            let proximoElemento = a + b;
            let spanComElemento = document.createElement("span");
            let elemento;
            if (i + 1 < quantidadeDeElementos) {
                elemento = document.createTextNode(b + ', ');
            }
            else {
                elemento = document.createTextNode(b + '.');
            }
            spanComElemento.appendChild(elemento);

            divResultado.appendChild(spanComElemento);

            a = b;
            b = proximoElemento;
        }
        else {
            //console.log("entrei aqui");
            let spanComElemento = document.createElement("span");
            let elemento;
            if (quantidadeDeElementos == 1) {
                elemento = document.createTextNode('0.');
            }
            else {
                elemento = document.createTextNode('0, ');
            }

            spanComElemento.appendChild(elemento);
            divResultado.appendChild(spanComElemento);
        }
    }
}