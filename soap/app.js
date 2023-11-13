import express from 'express'
import { Sequelize, DataTypes } from 'sequelize'
import soap from 'soap'
import cors from 'cors'
import morgan from 'morgan'

const app = express()
const port = 8888
app.use(cors())
app.use(morgan('combined'))
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

const consultarPersonas = async() => {
  try {
    const personas = await Personas.findAll({ raw: true })
    return personas
  } catch (error) {
    throw error
  }
}

const soapService = {
  ConsultarPersonasService: {
    ConsultarPersonasPort: {
      consultarPersonas: async(args, callback) => {
        try {
          const personas = await consultarPersonas()
          console.log(personas)
          callback(null, { result: personas })
        } catch (error) {
          console.error('Error en la consulta SOAP: ', error.message)
          callback(error, null)
        }
      },
    },
  },
}
app.listen(port, () => {
  console.log(`Servidor SOAP escuchando en el puerto ${port}`)
})
import { readFileSync } from 'fs'
const xml = readFileSync('./consultarPersonas.wsdl', 'utf8')

soap.listen(app, '/consultar_con_soap', soapService, xml, (err, res) => {
  console.log(`SOAP en ${res.path}`)
})
