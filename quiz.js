const questao = document.querySelector(".questao");
const perguntas = document.querySelector(".pergunta");

const resposta_A = document.querySelector("#a");
const resposta_B = document.querySelector("#b");
const resposta_C = document.querySelector("#c");
const resposta_D = document.querySelector("#d");
const resposta_E = document.querySelector("#e");

const som_acertou = document.querySelector("#acertou");
const som_errou = document.querySelector("#errou");

const progresso_atual = document.querySelector(".progresso_atual");
const quiz = document.querySelector("#quiz");
const resultado_final = document.querySelector("#resultado_final");

const acertou = document.querySelector("#acertos");
const errou = document.querySelector("#erros");
const feedback = document.querySelector("#mensagem_final");

const inicio = document.querySelector(".inicio");
const voltar = document.querySelector("#reiniciar");

const modo_facil = document.querySelector("#modo-facil");
const modo_medio = document.querySelector("#modo-medio");
const modo_dificil = document.querySelector("#modo-dificil");

let index = 0;
let facil = [];
let medio = [];
let dificil = [];
let acertos = 0;
let erros = 0;
let modo_atual = [];

quiz.style.display = "none";
progresso_atual.style.display = "none";
let listeners_adicionados = false;

function toggleRespostas(ativar) {
  const respostas = [
    resposta_A,
    resposta_B,
    resposta_C,
    resposta_D,
    resposta_E,
  ];
  respostas.forEach((resposta) => {
    if (ativar) {
      resposta.classList.remove("desativado");
    } else {
      resposta.classList.add("desativado");
    }
  });
}

fetch("facil.json")
  .then((response) => response.json())
  .then((data) => {
    facil = data;
  })
  .catch((error) => console.error("Erro ao carregar JSON:", error));

fetch("medio.json")
  .then((response) => response.json())
  .then((data) => {
    medio = data;
  })
  .catch((error) => console.error("Erro ao carregar JSON:", error));

fetch("dificil.json")
  .then((response) => response.json())
  .then((data) => {
    dificil = data;
  })
  .catch((error) => console.error("Erro ao carregar JSON", error));

function comeca_quiz() {
  if (index === 0) {
    const modo_escolhido = document.querySelector("#modo-escolhido");
    modo_escolhido.play();
  }

  if (index >= modo_atual.length) {
    quiz.style.display = "none";
    progresso_atual.style.display = "none";
    resultado_final.style.display = "block";
    acertou.textContent = acertos;
    errou.textContent = erros;

    if (acertos >= 8) {
      const acertou_todas = document.querySelector("#acertou-todas");
      acertou_todas.play();
      feedback.textContent = "🎉 Excelente!";
    } else if (acertos >= 5) {
      const acertou_metade = document.querySelector("#acertou-metade");
      acertou_metade.play();
      feedback.textContent = "👏 Bom trabalho!";
    } else {
      const pratique = document.querySelector("#pratique");
      pratique.play();
      feedback.textContent = "💡 Continue praticando!";
    }
    return;
  }

  progresso_atual.textContent = `${modo_atual[index].questão} de ${modo_atual.length}`;
  questao.textContent = modo_atual[index].questão;
  perguntas.textContent = modo_atual[index].pergunta;
  resposta_A.textContent = modo_atual[index].a;
  resposta_B.textContent = modo_atual[index].b;
  resposta_C.textContent = modo_atual[index].c;
  resposta_D.textContent = modo_atual[index].d;
  resposta_E.textContent = modo_atual[index].e;
  toggleRespostas(true);
}

function verificar(elemento_escolhido) {
  toggleRespostas(false);
  const botoes = {
    a: resposta_A,
    b: resposta_B,
    c: resposta_C,
    d: resposta_D,
    e: resposta_E,
  };

  const resposta_correta = modo_atual[index].correto;
  if (elemento_escolhido === resposta_correta) {
    botoes[elemento_escolhido].classList.add("correto");
    som_acertou.play();
    acertos++;
  } else {
    botoes[elemento_escolhido].classList.add("errado");
    som_errou.play();
    erros++;
  }

  index++;

  setTimeout(() => {
    botoes[elemento_escolhido].classList.remove("errado");
    botoes[elemento_escolhido].classList.remove("correto");
    toggleRespostas(true);
    comeca_quiz();
  }, 2000);
}

function modo(modo_escolhido) {
  modo_atual = modo_escolhido;
  progresso_atual.style.display = "block";
  quiz.style.display = "block";
  inicio.style.display = "none";
  comeca_quiz();

  if (!listeners_adicionados) {
    resposta_A.addEventListener("click", () => verificar("a"));
    resposta_B.addEventListener("click", () => verificar("b"));
    resposta_C.addEventListener("click", () => verificar("c"));
    resposta_D.addEventListener("click", () => verificar("d"));
    resposta_E.addEventListener("click", () => verificar("e"));
    listeners_adicionados = true;
  }
}

modo_facil.addEventListener("click", () => modo(facil));
modo_medio.addEventListener("click", () => modo(medio));
modo_dificil.addEventListener("click", () => modo(dificil));
voltar.addEventListener("click", () => {
  inicio.style.display = "block";
  resultado_final.style.display = "none";
  index = 0;
  acertos = 0;
  erros = 0;
});
