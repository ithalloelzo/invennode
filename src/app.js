import express from 'express'
import senderRoutes from './routes/senderRoutes.js'

const app = express()

app.use(express.json()) //api aceitar json

app.use('/senders', senderRoutes); //rotas dos remetentes

app.get('/', (req, res) => {
  res.send('Server Running')
})

export default app