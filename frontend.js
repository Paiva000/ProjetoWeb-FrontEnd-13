import { api } from './back.js'; 

const form = document.getElementById('taskForm');
const input = document.getElementById('taskInput');
const lista = document.getElementById('taskList');

async function carregarTarefas() {
    lista.innerHTML = '<li>Carregando...</li>';
    const tarefas = await api.buscarTarefas();

    lista.innerHTML = '';
    tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        if (tarefa.concluida) li.classList.add('concluida');

        
        li.innerHTML = `<span>${tarefa.titulo}</span>
            <button class="btn-edit">editar</button>
            <button class="btn-del">x</button>`;

        
        li.querySelector('span').addEventListener('click', async () => {
            await api.alternarStatus(tarefa.id);
            carregarTarefas();
        });

        
        li.querySelector('.btn-edit').addEventListener('click', async () => {
            const novoTitulo = prompt('Editar tarefa:', tarefa.titulo);
            if (novoTitulo && novoTitulo.trim()) {
                await api.editarTarefa(tarefa.id, novoTitulo.trim());
                carregarTarefas();
            }
        });

        
        li.querySelector('.btn-del').addEventListener('click', async () => {
            await api.deleteTarefa(tarefa.id); 
            carregarTarefas();
        });

        lista.appendChild(li); 
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


carregarTarefas();
