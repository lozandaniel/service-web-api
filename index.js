import express from 'express'
import postRouter from './routes/user.routes.js'

const app = express()
const PORT = 4000
app.use(express.json())

app.use('/api', postRouter)

// Puerto iniciado en el puerto especificado
app.listen(PORT, () => {
  console.log('Iniciando en el puerto' + PORT)
})
