const express = require('express')
const PORT = 3000
const app = express()
const mysql = require('mysql')
const multer = require('multer')
const upload = multer()
const cors = require('cors')

app.use(cors())
app.use(express.json())

const connection = mysql.createConnection({
  user: 'root',
  password: '123456',
  database: 'clientes',
  host: 'localhost',
  port: 3306
})

connection.connect(function (err) {
  if (err) throw err
  console.log('Connected!')
})

app.get('/tipos', (req, res) => {
  const query = `SELECT * FROM tiposdecliente;`

  connection.query(query, (err, result) => {
    if (err) {
      throw err
    } else {
      res.send(result)
    }
  })
})

app.get('/clientes/buscar/email/:email', (req, res) => {
  const email = req.params.email
  const query = `SELECT * FROM cliente WHERE email = '${email}';`

  connection.query(query, (err, result) => {
    if (err) {
      throw err
    } else {
      res.send(result[0])
    }
  })
})

app.get('/clientes/buscar/id/:idcliente', (req, res) => {
  const idcliente = req.params.idcliente
  const query = `SELECT * FROM cliente WHERE idcliente = ${idcliente};`

  connection.query(query, (err, result) => {
    if (err) {
      throw err
    } else {
      res.send(result[0])
    }
  })
})

app.post('/cliente/gravar', upload.any(), (req, res) => {
  const nome = req.body.nome
  const telefone = req.body.telefone
  const email = req.body.email
  const idtiposdecliente = req.body.idtiposdecliente
  const logradouro = req.body.logradouro
  const numero = req.body.numero
  const complemento = req.body.complemento
  const bairro = req.body.bairro
  const cidade = req.body.cidade
  const uf = req.body.uf
  const cep = req.body.cep
  const sql = `INSERT INTO cliente (nome, telefone, email, idtiposdecliente, logradouro, numero, complemento, bairro, cidade, uf, cep) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  connection.query(
    sql,
    [
      nome,
      telefone,
      email,
      idtiposdecliente,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      cep
    ],
    function (err, result) {
      if (err) throw err
      console.log('Linha adicionada!')
      res.status(200).send('Adicionado!')
    }
  )
})

app.listen(PORT, () => console.log('rodando'))
