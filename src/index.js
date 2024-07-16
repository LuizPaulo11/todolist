const express = require('express');
const dotenv = require('dotenv');
const connection = require('./connection');
const app = express();


dotenv.config();


let UserRouter = require('./UserRouter');


app.use('/api', UserRouter);


const port = process.env.PORT || 3000;

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
    

    connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
        if (error) {
            console.error('Erro ao conectar ao banco de dados:', error);
        } else {
            console.log('Conexão com o MySQL estabelecida com sucesso!');
        }
    });
});
