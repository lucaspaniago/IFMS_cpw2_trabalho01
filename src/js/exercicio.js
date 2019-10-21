var expressao = '';
var operando = '0';
var vetorDeOperandos = [];
//escrevaVetorNoLog(vetorDeOperandos);
var vetorDeOperadores = [];
var operandoEhResultadoAnterior = false;
var ultimaOperacao = [];
var semOperacao = false;

function escrevaDigito(valor) {
    if (semOperacao) {
        operando = '';
        semOperacao = false;
    }
    /**
     * se (valor digitado == 0 && operando atual == '0') eu não faço quase nada. Então, negando isso,
     * tenho esse if abaixo:
     */
    if (valor != 0 || operando != '0') {
        /**
         * Se quer digitar um número, sem que tenha nada no vetor de operandos (ou seja está com o valor
         * inicial, que é '0'), significa que ele vai sobrescrever um resultado e/ou está digitando o primeiro dígito deste novo número
         * que é diferente de 0.
         * Daí este if:
         */
        if (operando == '0' || operandoEhResultadoAnterior) {
            operando = valor;
            operandoEhResultadoAnterior = false;
        }
        else {
            operando += valor;
        }

        atualizaAreaDeTrabalho(valor)
    }
    else {
        operandoEhResultadoAnterior = false;
    }
    //===========================>
    console.log('operando atual: ' + operando + '\nvetor de operandos')
    escrevaVetorNoLog(vetorDeOperandos);
}

function escrevaOperador(operador) {
    if (querSobrescreverSinal()) {
        //retira último caracter da string expressao
        expressao = expressao.slice(0, -1);
        //adiciona o operador como último caracter na string expressao
        expressao += operador;
        //substitui o operador no vetor de operadores
        vetorDeOperadores[vetorDeOperadores.length - 1] = operador;
    }
    else {
        consolidaOperando();

        //insere operador no vetor de operadores
        vetorDeOperadores.push(operador);

        expressao += ' ' + operando + ' ' + operador;
    }

    atualizaExpressao();

    operandoEhResultadoAnterior = true;
}

function resolvaExpressao() {
    if (!operandoEhResultadoAnterior && vetorDeOperadores.length == 0 && vetorDeOperandos.length == 0) {
        expressao = operando;
        atualizaExpressao();
        expressao = '';
        semOperacao = true;
    }
    else {
        if (operandoEhResultadoAnterior && vetorDeOperadores.length == 0) {
            consolidaOperando();
            expressao = operando;

            //insere operador no vetor de operadores
            vetorDeOperadores.push(ultimaOperacao[0]);
            escrevaVetorNoLog(vetorDeOperadores);
            operando = ultimaOperacao[1];
            consolidaOperando();
            escrevaVetorNoLog(vetorDeOperandos);

            expressao += ' ' + ultimaOperacao[0];

        }
        else {
            ultimaOperacao[0] = vetorDeOperadores[vetorDeOperadores.length - 1];
            ultimaOperacao[1] = operando;

            consolidaOperando();
        }

        realizaOperacoesMatematicas();

        /**
         * Atualiza a variável expressão para atualizar a expressão dentro do input expressão.
         * E depois zera a variável expressão para deixá-la apta para receber a nova expressão.
         */
        expressao += ' ' + operando;
        atualizaExpressao();
        expressao = '';

        zeraVetor(vetorDeOperadores);

        /**
         * Coloco o resultado da expressão na variável operando, pois ele pode ser o próximo
         * operando, de fato. Mas pode ser sobrescrito se o usuário digitar outro dígito,
         * iniciando a composição de outro número.
         */
        operando = vetorDeOperandos[0];
        operandoEhResultadoAnterior = true;

        zeraVetor(vetorDeOperandos);

        atualizaAreaDeTrabalho();
    }
}

function apagar() {

    if (operando != 0) {
        if (operando.slice(0, -1).length != 0) {
            operando = operando.slice(0, -1);
        }
        else {
            operando = 0;
        }

        atualizaAreaDeTrabalho();
    }
}

function negar() {
    operando = -operando;
    atualizaAreaDeTrabalho();
}


function acaoC() {
    operando = 0;
    operandoEhResultadoAnterior = false;
    zeraVetor(vetorDeOperandos);
    zeraVetor(vetorDeOperadores);
    atualizaAreaDeTrabalho();
}

function acaoCE() {
    operando = 0;
    //operandoEhResultadoAnterior = false;
    //zeraVetor(vetorDeOperandos);
    //zeraVetor(vetorDeOperadores);
    atualizaAreaDeTrabalho();
}



/**
 * Funções auxiliares
 */

function zeraVetor(vetor) {
    while (vetor.length > 0) {
        vetor.pop();
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
    console.log('vetor de operanados:');
    escrevaVetorNoLog(vetorDeOperandos);

    /**
     * retira o operador da lista de operadores
     */
    vetorDeOperadores.splice(i, 1);
    console.log('vetor de operadores:');
    escrevaVetorNoLog(vetorDeOperadores);
}

function realizaOperacoesMatematicas() {
    //Sai multiplicando ou dividindo 
    for (let i = 0; i < vetorDeOperadores.length; i++) {
        if (vetorDeOperadores[i] == '*') {
            let resultado = vetorDeOperandos[i] * vetorDeOperandos[i + 1];
            organizaVetoresPosOperacao(i, resultado);
            //Reduzo o índice em uma unidade, pois foi retirado um elemento dos dois vetores
            i--;
        }
        else if (vetorDeOperadores[i] == '/') {
            let resultado = vetorDeOperandos[i] / vetorDeOperandos[i + 1];
            organizaVetoresPosOperacao(i, resultado);
            //Reduzo o índice em uma unidade, pois foi retirado um elemento dos dois vetores
            i--;
        }
    }

    //Sai somando ou subtraindo 
    for (let i = 0; i < vetorDeOperadores.length; i++) {
        if (vetorDeOperadores[i] == '+') {
            let resultado = Number(vetorDeOperandos[i]) + Number(vetorDeOperandos[i + 1]);
            organizaVetoresPosOperacao(i, resultado);
            //Reduzo o índice em uma unidade, pois foi retirado um elemento dos dois vetores
            i--;
        }
        else if (vetorDeOperadores[i] == '-') {
            let resultado = vetorDeOperandos[i] - vetorDeOperandos[i + 1];
            organizaVetoresPosOperacao(i, resultado);
            //Reduzo o índice em uma unidade, pois foi retirado um elemento dos dois vetores
            i--;
        }
    }
}

function consolidaOperando() {
    vetorDeOperandos.push(operando);
}

function escrevaVetorNoLog(vetor) {
    console.log('vetor: ')
    for (let i = 0; i < vetor.length; i++) {
        console.log(vetor[i] + " ");
    }
}

function escrevaExpressao() {
    let expressao = document.getElementById('expressao');
    expressao.value += operando;
}

function atualizaAreaDeTrabalho() {
    document.querySelector("[name='areaDeTrabalho']").value = operando;
}

function atualizaExpressao() {
    document.querySelector("[name='expressao']").value = expressao;
}

function entreiAqui() {
    console.log('entrei aqui');
}

function querSobrescreverSinal() {
    /**
     * se operando estiver contendo o resultado anterior, significa que nenhum digito foi inserido, 
     * e foi apenas digitado um operador (um sinal), ou seja, pretende-se sobrescrever o sinal digitado
     * anteriormente.
     */
    if (operandoEhResultadoAnterior) {
        if (expressao[expressao.length - 1] == '+') return true;
        if (expressao[expressao.length - 1] == '-') return true;
        if (expressao[expressao.length - 1] == '*') return true;
        if (expressao[expressao.length - 1] == '/') return true;
    }

    return false;
}