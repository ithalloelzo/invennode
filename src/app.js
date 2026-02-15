import express from 'express'
import senderRoutes from './routes/senderRoutes.js'
import clientRoutes from './routes/clientRoutes.js'
import productRoutes from './routes/productRoutes.js'
import salesNoteRoutes from './routes/salesNoteRoutes.js'

const app = express()

app.use(express.json()) //api aceitar json

app.use('/senders', senderRoutes) //rotas dos remetentes
app.use('/clients', clientRoutes) //rota dos clientes
app.use('/products', productRoutes) //rota dos produtos
app.use('/salesnotes', salesNoteRoutes)//rota das notas de venda

app.get('/', (req, res) => {
  res.send('Server Running')
})

export default app