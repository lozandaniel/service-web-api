import mongoose, { Schema } from 'mongoose'

// Conexion a la base de datos
mongoose
  .connect(
    // Url de la base de datos de mongoDB
    'mongodb+srv://testuser:testpassword@cluster0.6pgk3zo.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connected to database')
  })
  .catch((error) => {
    console.error(error)
  })

// Definicion del Schema para el usuario
const userSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
})

export const modelUser = mongoose.model('userSchema', userSchema)
