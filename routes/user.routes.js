import { Router } from 'express'
import { modelUser } from '../database/config.js'

const router = Router()

// Ruta para el login del usuario
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    // Validar si el usario ya existe en la db
    const userLogin = await modelUser.findOne({ username, password })
    if (!userLogin) {
      return res.status(401).json({ message: 'Error en la autenticacion.' })
    }

    return res.status(200).json({ message: 'Autenticación satisfactoria!' })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Se produjo un error en el sistema.' })
  }
})

// Ruta para el registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body

    // Validar si se proporcionan el nombre de usuario y la contraseña
    if (!username || !password) {
      return res.status(400).json({
        message: 'Se requiere un nombre de usuario y una contraseña.',
      })
    }

    // Validacion si el usuario ya es existente por su username.
    const existingUser = await modelUser.findOne({ username })

    if (existingUser) {
      return res.status(400).json({
        message: 'Usuario ya se encuentra registrado.',
      })
    }

    const newUser = new modelUser({
      username,
      password,
    })

    const userSave = await newUser.save()
    return res.status(201).json({ message: 'Usuario creado', user: userSave })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Se produjo un error en el sistema.' })
  }
})

export default router
