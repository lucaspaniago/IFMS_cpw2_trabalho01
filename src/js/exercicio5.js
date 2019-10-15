var expressao = "";
var operando = "";
var vetorDeOperandos = [];
var vetorDeOperadores = [];

function escrevaVetorNoLog(vetor) {
    console.log('vetor: ')
    for (let i = 0; i < vetor.length; i++) {
        console.log(vetor[i] + " ");
    }
}

//deleta a div com os resultados existentes e, posteriormente, cria outra div para conter os próximos resultados
function zeraDivResultados() {
    let divExpressaoAntiga = document.getElementById('expressao');
    let divVisorCalculadora = document.getElementById('visorCalculadora');
    divVisorCalculadora.removeChild(divExpressaoAntiga);

    let divExpressao = document.createElement('div');
    divExpressao.setAttribute('id', 'expressao');
    divVisorCalculadora.appendChild(divExpressao);
}

function insereNovaExpressaoNaDivResultados() {
    let divExpressao = document.getElementById('expressao');
    divExpressao.appendChild(document.createTextNode(expressao));
}

function escreveNumero(valor) {
    if (expressao == "") {
        zeraVetor(vetorDeOperandos);
    }

    zeraDivResultados();

    operando += valor
    console.log("expressão: " + expressao)
    let divExpressao = document.getElementById('expressao');
    divExpressao.appendChild(document.createTextNode(expressao + operando));
    console.log('operando: ' + operando);
}

function zeraVetor(vetor) {
    while (vetor.length > 0) {
        vetor.pop();
    }
}

function compoeNovaExpressao() {
    console.log('expressao aqui: ' + expressao);
    expressao = "";

    for (let i = 0; i < vetorDeOperandos.length; i++) {
        expressao += vetorDeOperandos[i];
        if (vetorDeOperandos.length > 0) {
            expressao += vetorDeOperadores[i];
        }
    }
}

function escreveOperador(operador) {
    if (expressao != "") {
        /**
        * consolida o número digitado no vetor de operandos - pois, se digitou um operador, o que 
        * veio antes é número - e o insere no vetor de operandos */
        console.log('1operando: ' + operando);
        if (operando != "") {
            vetorDeOperandos.push(operando);
            console.log('vetor de operandos consolidado:')
            escrevaVetorNoLog(vetorDeOperandos);
        }

        //insere o operador no vetor de operadores
        vetorDeOperadores.push(operador);
        console.log('vetor de operadores:');
        escrevaVetorNoLog(vetorDeOperadores);

        compoeNovaExpressao();
        //console.log('expressão1: ' + expressao);
        operando = "";

        zeraDivResultados();
        insereNovaExpressaoNaDivResultados();
        console.log('expressão: ' + expressao);
    }
    else {
        
    }
}

function organizaVetoresPosOperacao(i, resultado) {
    /**
             * substitui os dois operandos pelo resultado
             */
    //tira um dos operandos
    vetorDeOperandos.splice(i, 1);
    //sobrescreve resultado no lugar do outro operando
    vetorDeOperandos[i] = resultado;
    console.log(vetorDeOperandos[i]);
    escrevaVetorNoLog(vetorDeOperandos);

    /**
     * retira o operador da lista de operadores
     */
    vetorDeOperadores.splice(i, 1);
    console.log('vetor de operadores:');
    escrevaVetorNoLog(vetorDeOperadores);
}

function escreveResultadoNoVisor() {
    /**
     * consolida o número digitado no vetor de operandos - pois, se digitou um operador, o que 
     * veio antes é número - e o insere no vetor de operandos */
    console.log('operando: ' + operando);
    vetorDeOperandos.push(operando);

    console.log('vetor de operadores:');
    escrevaVetorNoLog(vetorDeOperadores);
    console.log('vetor de operandos:');
    escrevaVetorNoLog(vetorDeOperandos);
    //Sai multiplicando ou dividindo 
    for (let i = 0; i < vetorDeOperadores.length; i++) {
        if (vetorDeOperadores[i] == '*') {
            console.log('posiçao do ' + vetorDeOperadores[i] + ': ' + i);
            escrevaVetorNoLog(vetorDeOperandos);
            let resultado = vetorDeOperandos[i] * vetorDeOperandos[i + 1];
            console.log('resultado: ' + resultado);

            organizaVetoresPosOperacao(i, resultado);
        }
        else if (vetorDeOperadores[i] == '/') {
            console.log('posiçao do ' + vetorDeOperadores[i] + ': ' + i);
            escrevaVetorNoLog(vetorDeOperandos);
            let resultado = vetorDeOperandos[i] / vetorDeOperandos[i + 1];
            console.log('resultado: ' + resultado);

            organizaVetoresPosOperacao(i, resultado);
        }
    }

    //Sai somando ou subtraindo 
    for (let i = 0; i < vetorDeOperadores.length; i++) {
        if (vetorDeOperadores[i] == '+') {
            console.log('posiçao do ' + vetorDeOperadores[i] + ': ' + i);
            escrevaVetorNoLog(vetorDeOperandos);
            let resultado = Number(vetorDeOperandos[i]) + Number(vetorDeOperandos[i + 1]);
            console.log('resultado: ' + resultado);

            organizaVetoresPosOperacao(i, resultado);
            //Reduzo o índice em uma unidade, pois foi retirado um elemento dos dois vetores
            i--;
        }
        else if (vetorDeOperadores[i] == '-') {
            console.log('posiçao do ' + vetorDeOperadores[i] + ': ' + i);
            escrevaVetorNoLog(vetorDeOperandos);
            let resultado = vetorDeOperandos[i] - vetorDeOperandos[i + 1];
            console.log('resultado: ' + resultado);

            organizaVetoresPosOperacao(i, resultado);
            //Reduzo o índice em uma unidade, pois foi retirado um elemento dos dois vetores
            i--;
        }
    }


    //compoeNovaExpressao();
    expressao = vetorDeOperandos[0];
    zeraVetor(vetorDeOperadores);
    //zeraVetor(vetorDeOperandos);
    console.log("expressão: -->" + expressao);
    zeraDivResultados();
    insereNovaExpressaoNaDivResultados();
    expressao = "";
    operando = "";
    console.log("expressão: ==>" + expressao);
    console.log('vetor de operadores:');
    escrevaVetorNoLog(vetorDeOperadores);
    console.log('vetor de operandos:');
    escrevaVetorNoLog(vetorDeOperandos);
}

function apagar() {

}