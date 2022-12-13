const inputTarefa = document.querySelector(".inputTarefa");
const btnTarefa = document.querySelector(".btnTarefa");
const tarefas = document.querySelector(".tarefas");

btnTarefa.addEventListener("click", () => {
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
});

inputTarefa.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
  }
});

document.addEventListener("click", function (e) {
  const el = e.target;
  if (el.classList.contains("apagar")) {
    el.parentElement.remove();
    salvarTarefas();
  }
});

function limpaInput() {
  inputTarefa.value = "";
  inputTarefa.focus();
}

function criaLi() {
  const li = document.createElement("li");
  return li;
}

function criaSpan() {
  const span = document.createElement("span");
  span.setAttribute("class", "textoLi");
  return span;
}

function criaBtnApagar(li) {
  const botaoApagar = document.createElement("button");
  botaoApagar.setAttribute("class", "apagar");
  li.appendChild(botaoApagar);
}

function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll("li");
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace("Apagar Tarefa", "").trim();
    listaDeTarefas.push(tarefaTexto);
  }
  const tarefaJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem("tarefas", tarefaJSON);
}

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem("tarefas");
  const listaTarefas = JSON.parse(tarefas);

  for (let tarefa of listaTarefas) {
    criaTarefa(tarefa);
  }
}
adicionaTarefasSalvas();

function criaTarefa(textoInput) {
  const li = criaLi();
  const span = criaSpan();
  span.innerText = textoInput;
  tarefas.appendChild(li);
  li.appendChild(span);
  limpaInput();
  criaBtnApagar(li);
  salvarTarefas();
}
