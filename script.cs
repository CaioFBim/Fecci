let maxPlayers = 0;
let currentPlayer = 1;
let selectedClasses = [];

// Mapeamento das profissões para os nomes exatos dos arquivos da sua pasta
const classFileMap = {
    'mago': 'Mago.jpeg',
    'clerico': 'Clérico.jpeg',
    'clérico': 'Clérico.jpeg', // Aceita com e sem acento
    'paladino': 'Paladino.jpeg',
    'arqueiro': 'Arqueiro.jpeg',
    'barbaro': 'Bárbaro.jpeg',
    'bárbaro': 'Bárbaro.jpeg', // Aceita com e sem acento
    'druida': 'Druida.jpeg'
};

let pendingClass = ""; // Guarda a classe que está aguardando confirmação

function setPlayers(num) {
    maxPlayers = num;
    document.getElementById('screen-players').classList.add('hidden');
    document.getElementById('screen-selection').classList.remove('hidden');
    updateScreenText();
}

function updateScreenText() {
    document.getElementById('player-turn').innerText = `Jogador ${currentPlayer}, escolha sua profissão!`;
    document.getElementById('class-input').value = "";
    document.getElementById('error-msg').innerText = "";
    document.getElementById('class-input').focus();
}

function checkCharacter() {
    const inputField = document.getElementById('class-input');
    const typedClass = inputField.value.trim().toLowerCase();
    const errorMsg = document.getElementById('error-msg');

    // Valida se a profissão existe no mapeamento
    if (!classFileMap[typedClass]) {
        errorMsg.innerText = "Profissão desconhecida! Tente novamente.";
        return;
    }

    // Valida se a profissão já foi escolhida
    // Usamos o nome do arquivo como referência base para evitar conflitos de acentuação
    const baseClass = classFileMap[typedClass]; 
    if (selectedClasses.includes(baseClass)) {
        errorMsg.innerText = "Esta profissão já foi escolhida por outro jogador!";
        return;
    }

    errorMsg.innerText = "";
    pendingClass = baseClass; // Salva o nome oficial do arquivo

    // Prepara e exibe o modal
    document.getElementById('confirm-name-display').innerText = typedClass.toUpperCase();
    document.getElementById('confirm-image').src = pendingClass; // Aqui carregará ex: "Mago.jpeg"
    document.getElementById('confirm-modal').classList.remove('hidden');
}

function confirmSelection() {
    selectedClasses.push(pendingClass);
    document.getElementById('confirm-modal').classList.add('hidden');

    if (currentPlayer < maxPlayers) {
        currentPlayer++;
        updateScreenText();
    } else {
        alert("Todos os personagens selecionados! Preparando o painel de batalha...");
        // AQUI ENTRARÁ O CÓDIGO DA PRÓXIMA ETAPA (O Painel do Jogo)
    }
}

function cancelSelection() {
    document.getElementById('confirm-modal').classList.add('hidden');
    document.getElementById('class-input').focus();
}