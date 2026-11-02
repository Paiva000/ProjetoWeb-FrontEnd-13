import { api } from './backend.js';

const form = document.getElementById('taskForm');
const input = document.getElementById('taskInput');
const lista = document.getElementById('taskList');

async function carregarTarefas() {
    lista.innerHTML = '<li>Carregando...</li>';
    const tarefas = await api.buscarTarefas();

    lista.innerHTML = '';
    tarefas.forEach(tarefa => {
        const li = document.creatElement('li');
        if (tarefa.concluida) li.classList.add('concluida');

        li.innerHTML = "<span>${tarefa.titulo}</span>"
        <button class="btn-del">x</button>
        ;
        li.querySelector('span').addEventListener('click', async () => { await api.deleterTarefa(tarefa.id);
        carregarTarefas();
    });
    lsita.appendChild(li);
    });

}

form.addEventListener('submit', async (e) => { 
    e.preventDefault();
    const titulo = input.value.trim();

    if (titulo) {
        await api.criarTarefa(titulo);
        input.value = '';
        carregarTarefas();
    }
});
