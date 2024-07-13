const mysql = require('mysql2');
const dotenv = require('dotenv');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Cria a conexão com o banco de dados MySQL
const connection = mysql.createConnection({
    host: process.env.DB_HOST,       // Host do banco de dados
    user: process.env.DB_USER,       // Usuário do banco de dados
    password: process.env.DB_PASS,   // Senha do banco de dados
    database: process.env.DB_NAME    // Nome do banco de dados
});

// Tenta conectar ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
        return;
    }
    console.log('Conectado ao banco de dados MySQL com ID de conexão ' + connection.threadId);
});

module.exports = connection;  // Exporta a conexão para ser usada em outros módulos
