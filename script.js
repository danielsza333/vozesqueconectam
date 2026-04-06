// --- NAVEGAÇÃO ---
function trocarAba(event, id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.nav button').forEach(b => b.classList.remove('active'));
    event.currentTarget.classList.add('active');
    window.scrollTo(0,0);
}

function toggleSoftMode() {
    document.body.classList.toggle('soft-mode');
}

// --- BANCO DE DADOS (Simulação de Envio Privado) ---
function enviarParaBanco() {
    const nome = document.getElementById('nome').value;
    const cat = document.getElementById('categoria').value;
    const msg = document.getElementById('msg').value;
    const feedback = document.getElementById('feedback');
    const btn = document.getElementById('btnEnviar');

    if (!msg.trim()) {
        alert("Por favor, preencha o seu relato.");
        return;
    }

    // Efeito de carregamento
    btn.innerHTML = "Criptografando e Enviando... 🔒";
    btn.disabled = true;

    setTimeout(() => {
        // Aqui os dados seriam enviados para um servidor (ex: Firebase ou PHP)
        // Como é um projeto frontend, simulamos salvando no localStorage silenciosamente
        const dadosPrivados = JSON.parse(localStorage.getItem('db_tea_privado')) || [];
        dadosPrivados.push({ nome, cat, msg, data: new Date() });
        localStorage.setItem('db_tea_privado', JSON.stringify(dadosPrivados));

        // Sucesso
        feedback.style.color = "green";
        feedback.innerText = "✅ Recebido! Seu relato foi enviado com segurança para nossa base de dados.";
        
        // Limpar Campos
        document.getElementById('nome').value = "";
        document.getElementById('msg').value = "";
        
        btn.innerHTML = "Enviar Outro Relato 🔒";
        btn.disabled = false;
    }, 1500);
}

// --- QUIZ COMPLEXO ---
const perguntas = [
    {
        q: "O que é 'Masking' ou Camuflagem Social no autismo?",
        a: ["Usar máscaras físicas em locais públicos.", "Esforço consciente para esconder traços autistas e parecer neurotípico.", "Uma técnica de pintura feita por autistas."],
        c: 1
    },
    {
        q: "Por que intervenções precoces são recomendadas?",
        a: ["Para curar o autismo antes da fase adulta.", "Para aproveitar a plasticidade cerebral e desenvolver habilidades funcionais.", "Porque o autismo some depois dos 5 anos se tratado."],
        c: 1
    },
    {
        q: "Qual a importância da Lei Berenice Piana?",
        a: ["Criou o dia nacional do autismo apenas.", "Equiparou o autista à pessoa com deficiência para direitos legais.", "Obriga todos os autistas a usarem o cordão de girassol."],
        c: 1
    },
    {
        q: "O que caracteriza a sensibilidade sensorial no TEA?",
        a: ["Apenas aversão a barulhos altos.", "Respostas atípicas a luz, toque, som, paladar ou cheiro.", "Falta total de sensibilidade física."],
        c: 1
    }
];

let qIndex = 0, pontos = 0;

function carregarQuiz() {
    const box = document.getElementById('quizBox');
    if (qIndex >= perguntas.length) {
        box.innerHTML = `<h3>Quiz Finalizado!</h3><p>Você acertou ${pontos} de ${perguntas.length}.</p>
        <button onclick="reiniciarQuiz()" class="btn-send">Refazer Quiz</button>`;
        return;
    }

    const p = perguntas[qIndex];
    box.innerHTML = `<h3>Questão ${qIndex + 1}</h3><p style="margin-bottom:15px">${p.q}</p>` +
        p.a.map((opt, i) => `<button class="quiz-option" onclick="validarQuiz(${i}, ${p.c})">${opt}</button>`).join("");
}

function validarQuiz(escolha, correta) {
    const btns = document.querySelectorAll('.quiz-option');
    if (escolha === correta) { pontos++; btns[escolha].classList.add('correct'); }
    else { btns[escolha].classList.add('wrong'); btns[correta].classList.add('correct'); }
    
    setTimeout(() => { qIndex++; carregarQuiz(); }, 1200);
}

function reiniciarQuiz() { qIndex = 0; pontos = 0; carregarQuiz(); }

// Inicializa o Quiz ao carregar
window.onload = carregarQuiz;