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

const valFase = document.getElementById('val-fase');
const valScore = document.getElementById('val-score');
const valVidas = document.getElementById('val-vidas');

let senhaAtual = "";
let nivelAtual = 1;
let pontuacao = 0;
let vidas = 3;

function atualizarInterface() {
    valFase.textContent = nivelAtual;
    valScore.textContent = String(pontuacao).padStart(4, '0');
    valVidas.textContent = '❤️'.repeat(vidas);
}

// Atualiza o tamanho na tela
rangeTamanho.oninput = () => {
    valorTamanho.textContent = rangeTamanho.value;
};

// Gerador de Senhas
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

// Validação da senha para passar de fase
btnHackear.onclick = () => {
    if (!senhaAtual || senhaAtual === "PRESS START") {
        alert("PRIMEIRO GERE UMA SENHA!");
        return;
    }

    // Regras obrigatórias:
    // 1. Tamanho pelo menos 6
    // 2. Conter números
    // 3. Conter símbolos
    const temTamanhoSuficiente = senhaAtual.length >= 6;
    const temNumeros = /[0-9]/.test(senhaAtual);
    const temSimbolos = /[!@#$%^&*]/.test(senhaAtual);

    let motivoErro = "";

    if (!temTamanhoSuficiente) {
        motivoErro = "A senha precisa ter pelo menos 6 caracteres!";
    } else if (!temNumeros) {
        motivoErro = "A senha precisa conter NÚMEROS (123)!";
    } else if (!temSimbolos) {
        motivoErro = "A senha precisa conter SÍMBOLOS (#$%)!";
    }

    if (motivoErro !== "") {
        // SENHA INVÁLIDA -> PERDE VIDA / GAME OVER
        vidas--;
        atualizarInterface();

        if (vidas <= 0) {
            // GAME OVER
            textoStatus.textContent = "GAME OVER";
            textoStatus.className = "game-over-texto";
            mensagemStatus.textContent = `SISTEMA BLOQUEADO! ${motivoErro}`;
            btnReiniciar.textContent = "RECOMEÇAR JOGO 🔁";
            overlayStatus.classList.remove('escondido');
            
            // Reseta progresso total
            nivelAtual = 1;
            pontuacao = 0;
            vidas = 3;
        } else {
            // ERRO
            textoStatus.textContent = "FALHA DE SEGURANÇA";
            textoStatus.className = "game-over-texto";
            mensagemStatus.textContent = `${motivoErro} Você perdeu 1 vida!`;
            btnReiniciar.textContent = "TENTAR NOVAMENTE 🔁";
            overlayStatus.classList.remove('escondido');
        }
    } else {
        // PASSA DE FASE
        pontuacao += 100 * nivelAtual;
        nivelAtual++;
        atualizarInterface();

        textoStatus.textContent = "STAGE CLEAR!";
        textoStatus.className = "vitoria-texto";
        mensagemStatus.textContent = `SENHA APROVADA! +${100 * (nivelAtual - 1)} PTS. Avançando para a FASE ${nivelAtual}.`;
        btnReiniciar.textContent = `IR PARA FASE ${nivelAtual} 🚀`;
        overlayStatus.classList.remove('escondido');
    }
};

// Botão para fechar o overlay e continuar
btnReiniciar.onclick = () => {
    overlayStatus.classList.add('escondido');
    displaySenha.textContent = "PRESS START";
    senhaAtual = "";
    atualizarInterface();
};

atualizarInterface();