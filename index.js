const express = require('express'); //importando o express

const server = express(); //criando uma varivel que chama a função express
server.use(express.json());
const tarefas = []; //array de tarefas

server.get('/tarefas', (req, res) => { //req seria a requisição e res seria a resposta para o front
    return res.json(tarefas); // retornando todas as tarefas existentes
});//primeira rota

server.get('/tarefas/:index', (req, res) => {
    return res.json(req.user);
});

server.post('/tarefas', (req, res) => {
    const { nome } = req.body; // faz a busca do nome informado na requisição
    tarefas.push(nome); //adiciona o nome informado no banco
    return res.json(tarefas);
});

server.put('/tarefas/:index', (req, res) => {
    const { index } = req.params; //recupera o index com os dados
    const { nome } = req.body;

    tarefas[index] = nome;

    return res.json(tarefas);
});

server.delete('/tarefas/:index', (req, res) => {
    const { index } = req.params;
    tarefas.splice(index, 1); //percorre todo o vetor com os dados e exclui uma posição
});

server.listen(3000); //executando o meu servidor na porta 3000 do localhost