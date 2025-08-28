/*
let titulo = document.querySelector('h1');
titulo.innerHTML = "Jogo dos números";

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = "Escolha um número de 1-100";
*/

let numSorteados = [];
let randomizer = parseInt(Math.random() * 100 + 1);
let numEscolhidos = "";
let numSecreto = gerarNumero();
let tentativas = 1;
let msgTentativas = "";
let button = document.getElementById('reiniciar');

function exibirTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.8; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function mensagemInicial(){
    exibirTexto('h1', "Jogo dos números");
    exibirTexto('p', "Escolha um número de 1-100");
}

mensagemInicial();

function Chute(){
    let chute = document.querySelector('input').value;
    if(chute == numSecreto){
        msgTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        exibirTexto('h1', "Você acertou, o número era: " + numSecreto);
        exibirTexto('p', "Precisou de: "+ tentativas +" "+msgTentativas);
        button.removeAttribute('disabled');
    } else {
        if(chute > numSecreto){
            exibirTexto('p', "Seu número foi maior");
        } else {
            exibirTexto('p', "Seu número foi menor");
        }
        tentativas ++;
        limparCampo();
    }
}

function gerarNumero(){
    numEscolhidos = parseInt(Math.random() * randomizer + 1);
    let quantidadeLista = numSorteados.length;

    //Limpa array
    if (quantidadeLista == 100){
        numSorteados = [];
    }

    if(numSorteados.includes(numEscolhidos)){
        return gerarNumero();
    } else {
        numSorteados.push(numEscolhidos);
        console.log(numSorteados);
        return numEscolhidos;
    }
}

function limparCampo(){
    chute = document.querySelector('input')
    chute.value = "";
}

function Reiniciar(){
    numSecreto = gerarNumero();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    button.setAttribute('disabled', true);
}