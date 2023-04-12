const express = require('express')

const router = express.Router()

router.use(express.json())

router.get('/', (req, res) => {
  res.send(` GET ALL`)
})

router.get('/:id', (req, res) => {
  res.send(` GET ID: ${req.params.id}`)
})

router.get('/matricula/:matricula', (req, res) => {
  res.send(`GET Matrícula: ${req.params.matricula}`)
})

router.put('/:id', (req, res) => {
  //atualizar
  res.send(`PUT: ${JSON.stringify(req.body)}`)
})

router.post('/', (req, res) => {
  //salvar
  res.send(`POST: ${JSON.stringify(req.body)}`)
})

router.delete('/', (req, res) => {
  //delete
  res.send(`DELETE: ${req.params.id}`)
})

module.exports = router
