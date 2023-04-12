console.log('oi kekel')

//app.js
const express = require('express') //importar
const app = express() //instanciar
app.use(express.json()) //

//rota GET
app.get('/teste', (req, res) => {
  res.send('HeloOoOO')
})

//start servidor
app.listen(9000, async () => {
  console.log('servidor rodando')
})
