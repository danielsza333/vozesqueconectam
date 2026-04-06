// --- NAVEGAÇÃO E VISUAL ---
function trocarAba(event, id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.nav button').forEach(b => b.classList.remove('active'));
    event.currentTarget.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleSoftMode() {
    document.body.classList.toggle('soft-mode');
}

// --- SIMULAÇÃO DE BANCO DE DADOS ---
function enviarParaBanco() {
    const nome = document.getElementById('nome').value;
    const cat = document.getElementById('categoria').value;
    const msg = document.getElementById('msg').value;
    const feedback = document.getElementById('feedback');
    const btn = document.getElementById('btnEnviar');

    if (!msg.trim()) {
        alert("O campo de mensagem não pode estar vazio.");
        return;
    }

    btn.innerHTML = "Processando Dados... 🔒";
    btn.disabled = true;

    // Simula tempo de resposta do servidor
    setTimeout(() => {
        const dbSimulado = JSON.parse(localStorage.getItem('banco_privado_tea')) || [];
        dbSimulado.push({ nome, cat, msg, data: new Date().toLocaleString() });
        localStorage.setItem('banco_privado_tea', JSON.stringify(dbSimulado));

        feedback.style.color = "#2d5a27";
        feedback.innerText = "✅ Relato enviado com sucesso para nossa base de dados confidencial.";
        
        document.getElementById('nome').value = "";
        document.getElementById('msg').value = "";
        
        btn.innerHTML = "Enviar Novo Relato 🔒";
        btn.disabled = false;
    }, 1500);
}

// --- LÓGICA DO QUIZ ---
const perguntas = [
    {
        q: "O que é 'Camuflagem Social' (Masking)?",
        a: ["Usar fantasias em eventos.", "Ocultar comportamentos autistas para tentar se adaptar socialmente.", "Um sintoma de gripe em autistas."],
        c: 1
    },
    {
        q: "Qual a função do 'Stimming'?",
        a: ["Chamar a atenção de forma proposital.", "Regular o sistema sensorial e as emoções.", "É um hábito sem motivo algum."],
        c: 1
    },
    {
        q: "O diagnóstico de autismo é feito através de:",
        a: ["Exame de imagem como Tomografia.", "Observação clínica e análise de comportamento.", "Apenas teste de DNA."],
        c: 1
    },
    {
        q: "Pessoas autistas têm direito a:",
        a: ["Apenas escolas especiais separadas.", "Inclusão escolar e prioridade em atendimentos.", "Nenhum benefício legal específico."],
        c: 1
    }
];

let indexQuiz = 0, nota = 0;

function carregarQuiz() {
    const box = document.getElementById('quizBox');
    if (indexQuiz >= perguntas.length) {
        box.innerHTML = `<h3>Quiz Concluído!</h3><p>Sua pontuação: ${nota} de ${perguntas.length}</p>
        <button onclick="reiniciarQuiz()" class="btn-send">Refazer Desafio</button>`;
        return;
    }

    const p = perguntas[indexQuiz];
    box.innerHTML = `<h3>Questão ${indexQuiz + 1}</h3><p style="margin: 15px 0">${p.q}</p>` +
        p.a.map((opt, i) => `<button class="quiz-option" onclick="checarQuiz(${i}, ${p.c})">${opt}</button>`).join("");
}

function checarQuiz(escolha, correta) {
    const botoes = document.querySelectorAll('.quiz-option');
    botoes.forEach(b => b.disabled = true);

    if (escolha === correta) { 
        nota++; 
        botoes[escolha].classList.add('correct'); 
    } else { 
        botoes[escolha].classList.add('wrong'); 
        botoes[correta].classList.add('correct'); 
    }
    
    setTimeout(() => { indexQuiz++; carregarQuiz(); }, 1500);
}

function reiniciarQuiz() { indexQuiz = 0; nota = 0; carregarQuiz(); }

window.onload = carregarQuiz;