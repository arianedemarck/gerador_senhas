const displaySenha = document.getElementById('display-senha');
const rangeTamanho = document.getElementById('range-tamanho');
const valorTamanho = document.getElementById('valor-tamanho');

const chkMaiusculas = document.getElementById('chk-maiusculas');
const chkNumeros = document.getElementById('chk-numeros');
const chkSimbolos = document.getElementById('chk-simbolos');

const btnGerar = document.getElementById('btn-gerar');
const btnHackear = document.getElementById('btn-hackear');

const overlayStatus = document.getElementById('overlay-status');
const textoStatus = document.getElementById('texto-status');
const mensagemStatus = document.getElementById('mensagem-status');
const btnReiniciar = document.getElementById('btn-reiniciar');

let senhaAtual = "";
let nivelAtual = 1;

// Atualiza o valor do tamanho na tela
rangeTamanho.oninput = () => {
    valorTamanho.textContent = rangeTamanho.value;
};

// Gerador de Senha
btnGerar.onclick = () => {
    const minusculas = 'abcdefghijklmnopqrstuvwxyz';
    const maiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeros = '0123456789';
    const simbolos = '!@#$%^&*';

    let alfabeto = minusculas;
    if (chkMaiusculas.checked) alfabeto += maiusculas;
    if (chkNumeros.checked) alfabeto += numeros;
    if (chkSimbolos.checked) alfabeto += simbolos;

    senhaAtual = "";
    const tamanho = parseInt(rangeTamanho.value);

    for (let i = 0; i < tamanho; i++) {
        const indice = Math.floor(Math.random() * alfabeto.length);
        senhaAtual += alfabeto[indice];
    }

    displaySenha.textContent = senhaAtual;
};

// Testa a senha e avança de fase
btnHackear.onclick = () => {
    if (!senhaAtual || senhaAtual === "PRESS START") {
        alert("PRIMEIRO GERE UMA SENHA!");
        return;
    }

    // A cada fase, o tamanho mínimo da senha aumenta
    const tamanhoMinimo = 5 + nivelAtual;
    const perdeu = senhaAtual.length < tamanhoMinimo;

    if (perdeu) {
        // GAME OVER
        textoStatus.textContent = "GAME OVER";
        textoStatus.className = "game-over-texto";
        mensagemStatus.textContent = `SENHA FRACA! Para a Fase ${nivelAtual}, você precisa de pelo menos ${tamanhoMinimo} caracteres.`;
        btnReiniciar.textContent = "TRY AGAIN 🔁";
        overlayStatus.classList.remove('escondido');
        nivelAtual = 1; // Reseta o nível ao perder
    } else {
        // PASSA DE FASE (STAGE CLEAR)
        nivelAtual++;
        textoStatus.textContent = "STAGE CLEAR!";
        textoStatus.className = "vitoria-texto";
        mensagemStatus.textContent = `ACESSO PERMITIDO! Avançando para a FASE ${nivelAtual}.`;
        btnReiniciar.textContent = `IR PARA FASE ${nivelAtual} 🚀`;
        overlayStatus.classList.remove('escondido');
    }
};

// Botão para continuar ou reiniciar
btnReiniciar.onclick = () => {
    overlayStatus.classList.add('escondido');
    displaySenha.textContent = "PRESS START";
    senhaAtual = "";
};