window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('acao') === 'executarFuncao') {
        deixarTudoInvisivel();
        deixarAlternativasInvi();
    }
};

function deixarTudoInvisivel() {
    
    let classesCaminho = ["caminho-normal", "linha-caminho-normal", "linha1", "ponto-final"];

    classesCaminho.forEach(classe => {
        let selecaoDoCaminho = document.getElementsByClassName(classe);
        for (let i = 0; i < selecaoDoCaminho.length; i++) {
            let selecaoDaClasse = selecaoDoCaminho[i].getElementsByClassName("players");
            for (let j = 0; j < selecaoDaClasse.length; j++) {
                selecaoDaClasse[j].style.display = "none";
            }
        }
    });
    
    alert("Carregamento concluído!");
}

function deixarAlternativasInvi(){
    document.getElementById("alternativas").style.display = "none";
}
const perguntas = [
    {
        pergunta: "Um carro percorre 150km em 3 horas. Qual foi a velocidade média do carro?",
        alternativas: ["50 km/h", "60 km/h"],
        correta: 0
    },
    {
        pergunta: "Um ciclista percorre 30 km em 2 horas e, em seguida, mais 40 km em 2 horas. Qual é a velocidade média total?",
        alternativas: ["35 km/h", "30 km/h"],
        correta: 0
    },
    {
        pergunta: "Se uma pessoa caminha 12 km em 3 horas, qual é sua velocidade média?",
        alternativas: ["4 km/h", "3 km/h"],
        correta: 0
    },
    {
        pergunta: "Um trem viaja 200 km em 4 horas e, em seguida, 100 km em 2 horas. Qual foi sua velocidade média durante a viagem?",
        alternativas: ["50 km/h", "60 km/h"],
        correta: 1
    },
    {
        pergunta: "Um avião viaja 600 km em 2 horas. Qual é a velocidade média do avião?",
        alternativas: ["250 km/h", "300 km/h"],
        correta: 1
    },
    {
        pergunta: "Em um MRU, qual é a característica da velocidade?",
        alternativas: ["Constante", "Variável"],
        correta: 0
    },
    {
        pergunta: "No MRU, o gráfico da posição em função do tempo é:",
        alternativas: ["Uma linha reta", "Uma curva"],
        correta: 0
    },
    {
        pergunta: "Um carro viaja a 60 km/h por 2 horas em uma estrada reta. Qual a distância percorrida?",
        alternativas: ["120 km", "100 km"],
        correta: 0
    },
    {
        pergunta: "Em um MRU, qual das seguintes grandezas permanece constante?",
        alternativas: ["Aceleração", "Velocidade"],
        correta: 1
    },
    {
        pergunta: "Um ciclista se move a 20 m/s em linha reta. Quantos metros ele percorrerá em 10 segundos?",
        alternativas: ["200 m", "150 m"],
        correta: 0
    },
    {
        pergunta: "No MRUV, a aceleração é:",
        alternativas: ["Constante", "Variável"],
        correta: 0
    },
    {
        pergunta: "Qual é a fórmula da posição no MRUV?",
        alternativas: ["s = s0 + vt", "s = s0 + v0t + (at^2)/2"],
        correta: 1
    },
    {
        pergunta: "Se um carro acelera uniformemente de 0 a 20 m/s em 5 segundos, qual é a aceleração?",
        alternativas: ["4 m/s²", "5 m/s²"],
        correta: 0
    },
    {
        pergunta: "Qual das seguintes expressões representa a velocidade no MRUV?",
        alternativas: ["v = v0 + at", "v = v0 - at"],
        correta: 0
    },
    {
        pergunta: "Um objeto em MRUV tem uma aceleração de 2 m/s². Se ele começar com uma velocidade de 10 m/s, qual será sua velocidade após 3 segundos?",
        alternativas: ["16 m/s", "14 m/s"],
        correta: 0
    },
    {
        pergunta: "Na queda livre, qual é a aceleração de um objeto em relação ao solo?",
        alternativas: ["9,8 m/s²", "9,8 km/h²"],
        correta: 0
    },
    {
        pergunta: " Se um objeto é lançado horizontalmente de um penhasco, o tempo para atingir o solo depende de:",
        alternativas: ["Sua velocidade inicial horizontal", "A altura do penhasco"],
        correta: 1
    },
    {
        pergunta: "No MCU, a aceleração centrípeta aponta para:",
        alternativas: ["O centro da trajetória", "Fora da trajetória"],
        correta: 0
    },
    {
        pergunta: "Qual das seguintes grandezas muda constantemente de direção no MCU?",
        alternativas: ["Aceleração centrípeta", "Velocidade"],
        correta: 1
    },
    {
        pergunta: "Quando um objeto é lançado verticalmente para cima, no ponto mais alto sua velocidade é:",
        alternativas: ["Zero", "Máxima"],
        correta: 1
    },
    {
        pergunta: "Qual é fórmula da força elástica?",
        alternativas: ["Fat = μ . N", "Fel = μ . N"],
        correta: 1
    }


];

let perguntaAtual = 0;

function rolarDado() {
    if (dadoBloqueado) return; 

    let dado = document.getElementById("img-dado");
    let novo_numero = (Math.floor(Math.random() * 1000) % 6) + 1;

    dado.style.rotate = (dado.style.rotate == "0deg") ? "720deg" : "0deg";
    dado.src = `../../imgs/mecanicas/dice-${novo_numero}.svg`;
    dado.alt = `Dado de ${novo_numero} lados`;

    
    document.getElementById('vezDoJogador').innerText = `Vez do Jogador ${turnoJogador}`;

    mostrarPergunta(novo_numero);
}

function mostrarPergunta(novo_numero) {
    const perguntaObj = perguntas[perguntaAtual];
    document.getElementById("perguntaTexto").textContent = perguntaObj.pergunta;

    const alternativasBtns = document.querySelectorAll(".alternativa");
    alternativasBtns.forEach((btn, index) => {
        btn.textContent = perguntaObj.alternativas[index];
        btn.onclick = () => verificarResposta(index, novo_numero);
    });

    document.getElementById("perguntaTexto").style.display = "block";
    document.getElementById("alternativas").style.display = "block";

    dadoBloqueado = true; 
}

function verificarResposta(indiceEscolhido, novo_numero) {
    const perguntaObj = perguntas[perguntaAtual];
    if (indiceEscolhido === perguntaObj.correta) {
        document.getElementById("mensagemAcerto").style.display = "block";
        atualizarPlayer(turnoJogador, novo_numero);
    } else {
        document.getElementById("mensagemErro").style.display = "block";
    }

    setTimeout(() => {
        document.getElementById("mensagemAcerto").style.display = "none";
        document.getElementById("mensagemErro").style.display = "none";

        document.getElementById("perguntaTexto").textContent = "";
        document.getElementById("alternativas").style.display = "none"

        
        alternarTurno();
        proximaPergunta();
        
        dadoBloqueado = false; // aqui é aonde o dado voltará a ser clicável
    }, 1000); // 1 segundo
}

function alternarTurno() {
    turnoJogador = (turnoJogador === 1) ? 2 : 1;
    document.getElementById('vezDoJogador').innerText = `Vez do Jogador ${turnoJogador}`;
}

function proximaPergunta() {
    perguntaAtual = (perguntaAtual + 1) % perguntas.length;
}

let turnoJogador = 1;
let posicoesJogadores = { player1: 0, player2: 0 }; 
let dadoBloqueado = false; // Variável para controlar o estado do dado

function atualizarPlayer(turnoJogador, novo_numero) {
    let jogadorAtual = turnoJogador === 1 ? "player1" : "player2";
    let posicaoAtual = posicoesJogadores[jogadorAtual];
    let novaPosicao = posicaoAtual + novo_numero;

    if (novaPosicao > 22) {
        novaPosicao = posicaoAtual;
    }

    let casaAnterior = `casa${posicaoAtual}`;
    document.querySelector(`#${jogadorAtual}-${casaAnterior}`).style.display = "none";

    let proximaCasa = `casa${novaPosicao}`;
    document.querySelector(`#${jogadorAtual}-${proximaCasa}`).style.display = "block";

    posicoesJogadores[jogadorAtual] = novaPosicao;

    verificarVitoria();
}

function verificarVitoria() {
    let player1Casa22 = document.querySelector("#player1-casa22").style.display === "block";
    let player2Casa22 = document.querySelector("#player2-casa22").style.display === "block";

    if (player1Casa22) {
        alert("Jogador 1 ganhou!");
        setTimeout(() => location.reload(), 1000);
    } else if (player2Casa22) {
        alert("Jogador 2 ganhou!");
        setTimeout(() => location.reload(), 1000);
    }
}