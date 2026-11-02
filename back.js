let tarefas = [
    { id: 1, titulo: "Praticas semântica HTML5 e CSS", concluida: true},
    {id: 2, titulo: "Configurar branch do projeto no Git", concluida: false}
];
const simularRede = () => new Promise(resolve => setTimeout(resolve, 300));
export const api = {
    async buscarTarefas() {
        await simularRede();
        return[...tarefas];
},
async criarTarefa(titulo) {
    await simularRede();
    const novaTarefa = {
        id: Date.now(),
        titulo: titulo,
        concluida: false
};
tarefas.push(novaTarefa);
return novatarefa;
},
async alternarStatus(id) {
    await simularRede();
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa){
        tarefa.concluida = !tarefa.concluido;
    }
    return tarefa;
}
async deleteTarefa(id) {
    await simularRede();
    tarefas = tarefas.filter(t => t.id !== id);
    return true;
}
};
