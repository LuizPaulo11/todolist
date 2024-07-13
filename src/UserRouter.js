const express = require('express');
const router = express.Router();
const connection = require('./connection');

router.get('/', (req, res) => {
    connection.query('SELECT * FROM users', (error, results) => {
        if (error) {
            return res.status(500).send('Erro ao obter os usuários');
        }
        res.json(results);
    });
});

// criar uma rota para adicionar tabefas onde de para eu adicionar um tirulo e uma descriçao e seleciionar se a prioridade é baixa,media ou alta
// criar outra para atualizar
// criar uma para deletar tarefa
// 

module.exports = router;