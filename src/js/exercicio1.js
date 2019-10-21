function fibonacci() {
    let quantidadeDeElementos = document.getElementById('quantidadeDeElementos').value;
    console.log('quantidadeDeElementos: ' + quantidadeDeElementos);
    if (quantidadeDeElementos != '') {
        let conteudoResultado = document.getElementById('conteudoResultado');

        /** 
        * deleta a div com os resultados 
        * existentes e, posteriormente, cria outra div para conter os próximos resultados
        */



        conteudoResultado.innerHTML = "";
        let divResultado = document.createElement('div');
        divResultado.setAttribute('id', 'resultado');
        conteudoResultado.appendChild(divResultado);
        let a = 1;
        let b = 1;
        let proximoElemento = a + b;

        if (quantidadeDeElementos == 0) {
            let spanComElemento = document.createElement("span");
            let elemento;
            elemento = document.createTextNode('0.');
            spanComElemento.appendChild(elemento);
            divResultado.appendChild(spanComElemento);
        }
        for (let i = 0; i < quantidadeDeElementos; i++) {
            if (i > 0) {
                //console.log("entrei aqui");
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

                proximoElemento = a + b;
                a = b;
                b = proximoElemento;
            }
            else {
                //console.log("entrei aqui");
                let spanComElemento = document.createElement("span");
                let elemento;
                if (quantidadeDeElementos == 1) {
                    elemento = document.createTextNode('1.');
                }
                else {
                    elemento = document.createTextNode('1, ');
                }

                spanComElemento.appendChild(elemento);


                divResultado.appendChild(spanComElemento);
            }
        }

    }

    else {
        console.log('entrei aqui');
        let conteudoResultado = document.getElementById('conteudoResultado');

        /** 
        * deleta a div com os resultados 
        * existentes e, posteriormente, cria outra div para conter os próximos resultados
        */



        conteudoResultado.innerHTML = "";
    }
}

