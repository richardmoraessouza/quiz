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
const modo_facil = document.querySelector("#modo-facil");
const inicio = document.querySelector(".inicio");
const voltar = document.querySelector("#reiniciar");

let facil = [];
let medio = [];
let index = 0;
let acertos = 0;
let erros = 0;
quiz.style.display = "none";
progresso_atual.style.display = "none";
let listeners_adicionados = false;

fetch("facil.json")
  .then((response) => response.json())
  .then((data) => {
    facil = data;
    comeca_quiz(modo_escolhido);
  })
  .catch((error) => console.error("Erro ao carregar JSON:", error));

function modo(modo_escolhido) {
  progresso_atual.style.display = "block";
  quiz.style.display = "block";
  inicio.style.display = "none";
  comeca_quiz(modo_escolhido);

  function comeca_quiz(modo_escolhido) {
    if (index >= modo_escolhido.length) {
      quiz.style.display = "none";
      progresso_atual.style.display = "none";
      resultado_final.style.display = "block";
      acertou.textContent = acertos;
      errou.textContent = erros;
      if (acertos >= 8) {
        feedback.textContent = "🎉 Excelente!";
      } else if (acertos >= 5) {
        feedback.textContent = "👏 Bom trabalho!";
      } else {
        feedback.textContent = "💡 Continue praticando!";
      }
      return;
    }

    progresso_atual.textContent = `${modo_escolhido[index].questão} de ${modo_escolhido.length}`;
    questao.textContent = modo_escolhido[index].questão;
    perguntas.textContent = modo_escolhido[index].pergunta;
    resposta_A.textContent = modo_escolhido[index].a;
    resposta_B.textContent = modo_escolhido[index].b;
    resposta_C.textContent = modo_escolhido[index].c;
    resposta_D.textContent = modo_escolhido[index].d;
    resposta_E.textContent = modo_escolhido[index].e;
  }
  function verificar(elemento_escolhido) {
    const botoes = {
      a: resposta_A,
      b: resposta_B,
      c: resposta_C,
      d: resposta_D,
      e: resposta_E,
    };

    const resposta_correta = facil[index].correto;
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
      comeca_quiz();
    }, 1000);
  }

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
modo_medio.addEventListener("click", modo(medio));
voltar.addEventListener("click", () => {
  inicio.style.display = "block";
  resultado_final.style.display = "none";
  index = 0;
  acertos = 0;
  erros = 0;
});
