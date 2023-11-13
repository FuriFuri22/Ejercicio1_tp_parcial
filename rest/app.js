import express from 'express'
import { Sequelize, DataTypes } from 'sequelize'
import cors from 'cors'
import morgan from 'morgan'

const app = express()
const port = 8080

app.use(cors())
app.use(morgan('combined'))
app.use(express.json())

// ----------------------------------------------------------------
const dbConnInfo = {
  name: 'personas',
  user: 'root',
  password: 'root',
  host: 'db',
  dialect: 'mysql',
}

const sequelize = new Sequelize(
  dbConnInfo.name,
  dbConnInfo.user,
  dbConnInfo.password,
  {
    host: dbConnInfo.host,
    dialect: dbConnInfo.dialect,
  },
)

const Personas = sequelize.define(
  'personas',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
)

sequelize.sync()
// ----------------------------------------------------------------

app.post('/insertar_con_rest', async(req, res) => {
  const msgTry = 'Persona nueva insertada con éxito'
  try {
    const { nombres, apellidos, dni } = req.body
    const nuevaPersona = await Personas.create({ nombres, apellidos, dni })

    console.log(msgTry)
    res.status(201).json({
      ok: true,
      status: 201,
      msg: msgTry,
      nuevaPersona,
    })
  } catch (error) {
    console.log('Error')
    console.error(error)
    res.status(500).json({
      ok: false,
      status: 500,
      msg: error.message,
    })
  }
})

app.listen(port, () => {
  console.log(`Servidor Express REST escuchando en el puerto ${port}`)
})
