const express = require('express'); //importando o express

const server = express(); //criando uma varivel que chama a função express
server.use(express.json());

const tarefas = [{'id': 1, 'tarefa': 'limpar a casa', 'situacao': 'concluida'}]; //array de tarefas
let cont = tarefas.length;

server.get('/tarefas', (req, res) => { //req seria a requisição e res seria a resposta para o front
    return res.status(200).json(tarefas); // retornando todas as tarefas existentes
});//primeira rota

server.get('/tarefas/:id', (req, res) => {
    const tarefa = tarefas.find(item => item.id == req.params.id);
    if (tarefa) {
      res.status(200).json({...tarefa});
    } else {
      res.status(404).json({ message: 'Tarefa não encontrada' });
    }
});

server.post('/tarefas', (req, res) => {
    const { tarefa, situacao , id} = req.body;
    cont += 1;
    tarefas.push({
      id: cont,
      tarefa: tarefa,
      situacao: situacao
    });
    res.status(200).json({ message: 'Tarefa criada com sucesso'});
});

server.put('/tarefas/:id', (req, res) => {
    const tarefaIndex = tarefas.findIndex(item => item.id == req.params.id);
    if (tarefaIndex !== -1) {
      tarefas[tarefaIndex] = { ...tarefas[tarefaIndex], ...req.body };
      res.status(200).json({ message: 'Tarefa atualizada com sucesso'});
    } else {
      res.status(404).json({ message: 'tarefa não encontrada' });
    }
});

server.delete('/tarefas/:id', (req, res) => {
    const tarefaIndex = tarefas.findIndex(item => item.id == req.params.id);
    if (tarefaIndex !== -1) {
        tarefas.splice(tarefaIndex, 1);
        res.status(204);
      } else {
        res.status(404).json({ message: 'Tarefa não encontrada' });
      } //percorre todo o vetor com os dados e exclui uma posição
});

server.listen(3000); //executando o meu servidor na porta 3000 do localhost