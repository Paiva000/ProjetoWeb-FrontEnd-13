// 1. LISTA INICIAL DE TAREFAS (Array de objetos simples)
let tarefas = [
  { id: 1, titulo: "Criar tela de login do sistema", categoria: "A fazer" },
  { id: 2, titulo: "Filtro de relatórios por data", categoria: "Fazendo" },
  { id: 3, titulo: "Corrigir texto do rodapé", categoria: "Feito" }
];

// Variável para gerar o próximo número de ID
let proximoId = 4;

// Variável que guarda qual filtro está selecionado no momento
let filtroAtual = "Todas";

// 2. FUNÇÃO PARA ADICIONAR UMA NOVA TAREFA (CREATE)
function adicionarTarefa() {
  let input = document.getElementById("inputTarefa");
  let texto = input.value.trim();

  // Se o campo estiver vazio, não adiciona
  if (texto === "") {
    return;
  }

  // Cria o objeto da nova tarefa começando sempre em "A fazer"
  let novaTarefa = {
    id: proximoId,
    titulo: texto,
    categoria: "A fazer"
  };

  // Coloca no array e aumenta o contador de ID
  tarefas.push(novaTarefa);
  proximoId = proximoId + 1;

  // Limpa o campo de texto e atualiza a tela
  input.value = "";
  renderizar();
}

// 3. FUNÇÃO PARA MUDAR A CATEGORIA AO CLICAR NA TAREFA (UPDATE)
function mudarStatus(id) {
  for (let i = 0; i < tarefas.length; i++) {
    if (tarefas[i].id === id) {
      if (tarefas[i].categoria === "A fazer") {
        tarefas[i].categoria = "Fazendo";
      } else if (tarefas[i].categoria === "Fazendo") {
        tarefas[i].categoria = "Feito";
      } else {
        tarefas[i].categoria = "A fazer";
      }
    }
  }

  renderizar();
}

// 4. FUNÇÃO PARA EXCLUIR UMA TAREFA (DELETE)
function removerTarefa(event, id) {
  // Impede que o clique no botão Excluir também mude o status do cartão
  event.stopPropagation();

  let novaLista = [];
  for (let i = 0; i < tarefas.length; i++) {
    if (tarefas[i].id !== id) {
      novaLista.push(tarefas[i]);
    }
  }

  tarefas = novaLista;
  renderizar();
}

// 5. FUNÇÃO PARA LIMPAR TODAS AS TAREFAS CONCLUÍDAS ("Feito")
function limparFeitas() {
  let novaLista = [];
  for (let i = 0; i < tarefas.length; i++) {
    if (tarefas[i].categoria !== "Feito") {
      novaLista.push(tarefas[i]);
    }
  }

  tarefas = novaLista;
  renderizar();
}

// 6. FUNÇÃO PARA TROCAR O FILTRO DA LATERAL
function filtrarTarefas(categoria) {
  filtroAtual = categoria;

  // Atualiza o visual dos botões de filtro
  let botoes = ["Todas", "A fazer", "Fazendo", "Feito"];
  for (let i = 0; i < botoes.length; i++) {
    let botao = document.getElementById("filtro-" + botoes[i]);
    if (botoes[i] === filtroAtual) {
      botao.className = "btn-filtro btn-filtro-ativo";
    } else {
      botao.className = "btn-filtro";
    }
  }

  renderizar();
}

// 7. FUNÇÃO PARA DESENHAR AS TAREFAS NA TELA (READ)
function renderizar() {
  let containerLista = document.getElementById("listaTarefas");
  let html = "";
  let quantidadeExibida = 0;

  for (let i = 0; i < tarefas.length; i++) {
    let tarefa = tarefas[i];

    // Verifica se a tarefa passa pelo filtro escolhido
    if (filtroAtual === "Todas" || tarefa.categoria === filtroAtual) {
      quantidadeExibida = quantidadeExibida + 1;

      // Formata o código com 2 dígitos (ex: TS-01)
      let codigo = "TS-" + (tarefa.id < 10 ? "0" + tarefa.id : tarefa.id);

      // Define a cor da etiqueta conforme a categoria
      let classeCor = "cor-afazer";
      if (tarefa.categoria === "Fazendo") {
        classeCor = "cor-fazendo";
      } else if (tarefa.categoria === "Feito") {
        classeCor = "cor-feito";
      }

      // Risca o texto se estiver "Feito"
      let classeTexto = tarefa.categoria === "Feito" ? "texto-tarefa texto-riscado" : "texto-tarefa";

      // Monta o HTML do cartão da tarefa
      html +=
        '<div class="item-tarefa" onclick="mudarStatus(' + tarefa.id + ')">' +
          '<div class="info-tarefa">' +
            '<span class="codigo-tarefa">' + codigo + '</span>' +
            '<span class="' + classeTexto + '">' + tarefa.titulo + '</span>' +
          '</div>' +
          '<div class="acoes-tarefa">' +
            '<span class="etiqueta-status ' + classeCor + '">' + tarefa.categoria + '</span>' +
            '<button type="button" class="btn-excluir" onclick="removerTarefa(event, ' + tarefa.id + ')">Excluir</button>' +
          '</div>' +
        '</div>';
    }
  }

  // Se não houver nenhuma tarefa para mostrar, exibe aviso simples
  if (quantidadeExibida === 0) {
    html = '<div class="mensagem-vazia">Nenhuma tarefa encontrada nesta categoria.</div>';
  }

  containerLista.innerHTML = html;
}

// Permite adicionar tarefa apertando Enter no campo de texto
document.getElementById("inputTarefa").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    adicionarTarefa();
  }
});

// Chama a função pela primeira vez ao abrir a página
renderizar();