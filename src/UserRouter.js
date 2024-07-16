const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const connection = require('./connection');

router.use(express.json());

// Rota para obter dados de todas as tarefas
router.get('/recuperar', (req, res) => {
    connection.query('SELECT * FROM tarefas', (error, results) => {
        if (error) {
            return res.status(500).send('Erro ao obter as tarefas');
        }
        res.json(results);
    });
});

// Rota para procurar uma tarefa por ID
router.get('/tasks/:id', (req, res) => {
    const { id } = req.params;

    connection.query('SELECT * FROM tarefas WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).send('Erro ao procurar a tarefa');
        }

        if (results.length === 0) {
            return res.status(404).send('Tarefa não encontrada');
        }

        res.status(200).json(results[0]);
    });
});

// Rota para criar nova tarefa
router.post('/newtasks', [
    body('title').notEmpty().withMessage('O título é obrigatório'),
    body('descricao').notEmpty().withMessage('A descrição é obrigatória'),
    body('data_vencimento').isDate().withMessage('Data de vencimento inválida'),
    body('prioridade').isIn(['alta', 'média', 'baixa']).withMessage('Prioridade deve ser alta, média ou baixa')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, descricao, data_vencimento, prioridade } = req.body;
    const newTask = { title, descricao, data_vencimento, prioridade };

    connection.query('INSERT INTO tarefas SET ?', newTask, (error, results) => {
        if (error) {
            return res.status(500).send('Erro ao criar nova tarefa');
        }
        res.status(201).json({ id: results.insertId, ...newTask });
    });
});

// Rota para atualizar tarefa por ID
router.put('/tasks/:id', [
    param('id').isInt().withMessage('ID deve ser um número inteiro'),
    body('title').notEmpty().withMessage('O título é obrigatório'),
    body('descricao').notEmpty().withMessage('A descrição é obrigatória'),
    body('data_vencimento').isDate().withMessage('Data de vencimento inválida'),
    body('prioridade').isIn(['alta', 'média', 'baixa']).withMessage('Prioridade deve ser alta, média ou baixa')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, descricao, data_vencimento, prioridade } = req.body;

    const updatedFields = { title, descricao, data_vencimento, prioridade };

    connection.query('UPDATE tarefas SET ? WHERE id = ?', [updatedFields, id], (error, results) => {
        if (error) {
            return res.status(500).send('Erro ao atualizar a tarefa');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Tarefa não encontrada');
        }

        res.status(200).send('Tarefa atualizada com sucesso');
    });
});

// Rota para deletar uma tarefa por ID
router.delete('/tasks/:id', [
    param('id').isInt().withMessage('ID deve ser um número inteiro')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    connection.query('DELETE FROM tarefas WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).send('Erro ao deletar a tarefa');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Tarefa não encontrada');
        }

        res.status(200).send('Tarefa deletada com sucesso');
    });
});

module.exports = router;
