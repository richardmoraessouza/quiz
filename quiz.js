const questao = document.querySelector(".questao");
const perguntas = document.querySelector(".pergunta");
const resposta_A = document.querySelector("#a");
const resposta_B = document.querySelector("#b");
const resposta_C = document.querySelector("#c");
const resposta_D = document.querySelector("#d");
const resposta_E = document.querySelector("#e");
const acertou = document.querySelector("#acertou");
const errou = document.querySelector("#errou");
const progresso_atual = document.querySelector(".progresso_atual");
const quiz = document.querySelector("#quiz");
const resultado_final = document.querySelector("#resultado_final");
let index = 9;
let facil = [];

function comeca_quiz() {
  if (index >= facil.length) {
    quiz.style.display = "none";
    progresso_atual.style.display = "none";
    resultado_final.style.display = "block";
  }
  progresso_atual.textContent = `${facil[index].questão} de ${facil.length}`;
  questao.textContent = facil[index].questão;
  perguntas.textContent = facil[index].pergunta;
  resposta_A.textContent = facil[index].a;
  resposta_B.textContent = facil[index].b;
  resposta_C.textContent = facil[index].c;
  resposta_D.textContent = facil[index].d;
  resposta_E.textContent = facil[index].e;
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
    acertou.play();
  } else {
    botoes[elemento_escolhido].classList.add("errado");
    errou.play();
  }
  index++;

  setTimeout(() => {
    botoes[elemento_escolhido].classList.remove("errado");
    botoes[elemento_escolhido].classList.remove("correto");
    comeca_quiz();
  }, 1000);
}

resposta_A.addEventListener("click", () => verificar("a"));
resposta_B.addEventListener("click", () => verificar("b"));
resposta_C.addEventListener("click", () => verificar("c"));
resposta_D.addEventListener("click", () => verificar("d"));
resposta_E.addEventListener("click", () => verificar("e"));

fetch("facil.json")
  .then((response) => response.json())
  .then((data) => {
    facil = data;
    comeca_quiz();
  })
  .catch((error) => console.error("Erro ao carregar JSON:", error));
