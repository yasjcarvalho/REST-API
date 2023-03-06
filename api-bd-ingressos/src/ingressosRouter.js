const express = require('express')

const router = express.Router()

const Ingresso = require('./ingresso')

// Banco de dados de exemplo

const ingressos = [
  { id: 1, evento: 'teste1', local: 'teeste1', data: '0000-00-00', valor: 00 },
  { id: 2, evento: 'teste2', local: 'teeste2', data: '0000-00-01', valor: 150 }
]
// Operações CRUD do recurso aluno
router.get('/', async (req, res) => {
  //https://sequelize.org/docs/v6/core-concepts/model-querying-finders/
  const ingressos = await Ingresso.findAll()
  res.send(ingressos)
})

router.get('/:id', async (req, res) => {
  const ingressoId = req.params.id
  //https://sequelize.org/docs/v6/core-concepts/model-querying-finders/
  const ingresso = await Ingresso.findByPk(ingressoId)
  res.send(ingresso)
})

router.get('/:id/evento', async (req, res) => {
  const ingresso = await Ingresso.findByPk(ingressoId)

  res.send({
    evento: ingresso.evento
  })
})

router.post('/', async (req, res) => {
  let novoIngresso = req.body
  novoIngresso = await Ingresso.create(req.body)
  res.send({
    message: 'Ingresso adicionado com sucesso',
    ingresso: novoIngresso
  })
})

router.put('/:id', async (req, res) => {
  const ingressoId = req.params.id
  const dadosNovosIngresso = req.body

  let ingresso = await Ingresso.findByPk(ingressoId)

  if (ingresso) {
    ingresso.set({ ...dadosNovosIngresso })
    await ingresso.save()
    res.send({ message: 'Ingresso atualizado com sucesso' })
  } else {
    res.status(404).send({ message: 'Ingresso não encontrado' })
  }
})

router.delete('/:id', async (req, res) => {
  const ingressoId = req.params.id
  let ingresso = await Ingresso.findByPk(ingressoId)
  if (ingresso) {
    await ingresso.destroy()
    res.send({ message: 'Ingresso excluído com sucesso' })
  } else {
    res.status(404).send({ Ingresso: 'Aluno não encontrado' })
  }
})

module.exports = router
