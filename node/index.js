const express = require('express')
const app = express()
const port = 3000

// set ejs view engine
app.set('view engine', 'ejs')

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql = require('mysql')
const connection = mysql.createConnection(config)

connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conexão ao banco de dados bem-sucedida');
    }
});

const sql = 'INSERT INTO people (name) VALUES ("Leonardo")';
connection.query(sql, (err, res) => {
    console.log('Registro salvo com sucesso!')
})

app.get('/', (req, res) => {
    const peoplesSelect = 'SELECT * FROM people'
    connection.query(peoplesSelect, (err, people) => {
        if (err) {
            console.error(err)
        } else {
            console.log(people)
            res.render('index', { 'people': people })
        }
    })
})

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
})
