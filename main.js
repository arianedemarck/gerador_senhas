// Defina a senha do seu cronograma aqui:
const senhaCorreta = "1234";

const telaLogin = document.getElementById('tela-login');
const telaCronograma = document.getElementById('tela-cronograma');

const campoSenha = document.getElementById('campo-senha');
const btnEntrar = document.getElementById('btn-entrar');
const btnSair = document.getElementById('btn-sair');
const mensagemErro = document.getElementById('mensagem-erro');

btnEntrar.onclick = validarSenha;

// Permite entrar apertando a tecla Enter
campoSenha.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        validarSenha();
    }
});

function validarSenha() {
    if (campoSenha.value === senhaCorreta) {
        telaLogin.classList.add('escondido');
        telaCronograma.classList.remove('escondido');
        mensagemErro.textContent = '';
        campoSenha.value = '';
    } else {
        mensagemErro.textContent = 'Senha incorreta! Tente novamente.';
    }
}

btnSair.onclick = () => {
    telaCronograma.classList.add('escondido');
    telaLogin.classList.remove('escondido');
};