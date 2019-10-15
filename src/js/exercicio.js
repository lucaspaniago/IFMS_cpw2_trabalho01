var expressao = '';
var operando = '0';
var vetorDeOperandos = ['0'];
//escrevaVetorNoLog(vetorDeOperandos);
var vetorDeOperadores = [];
var operandoEhResultadoAnterior = false;
var ultimaOperacao = [];

function escrevaDigito(valor) {
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
        entreiAqui();
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
    console.log('operandoEhResultadoAnterior: ' + operandoEhResultadoAnterior);

    if (operandoEhResultadoAnterior) {

    }
    else {
        entreiAqui();

        ultimaOperacao.push(vetorDeOperadores[vetorDeOperadores.length - 1]);
        ultimaOperacao.push(operando)
        
        console.log('ultima operacao: ' + ultimaOperacao[0] + ' ' + ultimaOperacao[1]);
        
        consolidaOperando();

        realizaOperacoesMatematicas();

        expressao += ' ' + operando;

        zeraVetor(vetorDeOperadores);

        atualizaExpressao();

        expressao = '';
        operando = vetorDeOperandos[0];

        atualizaAreaDeTrabalho();
        /**
         * PAREI AQUI --- ESTÁ DANDO ERRO
         */
/*asdalks*/
        operandoEhResultadoAnterior = true;
        console.log('operando atual: ' + operando);
    }

}

function apagar() {
    operando = operando.slice(0, -1);
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

    /**
     * consolida o valor contido na variável operando - pois, se digitou um operador, o que
     * veio antes é número - e o insere no vetor de operandos
     */
    //Verifica se é o primeiro operando inserido
    if (vetorDeOperandos.length == 1 && vetorDeOperandos[0] == '0') {
        vetorDeOperandos[0] = operando;
    }
    else {
        vetorDeOperandos.push(operando);
    }
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