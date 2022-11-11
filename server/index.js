// noinspection JSCheckFunctionSignatures

require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors= require('cors')
const router = require('./routes/index')
const errorHandler =require('./middleware/ErrorHandlingMiddleWare')
const PORT = process.env.PORT || 5500


const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

app.use(errorHandler)//обязательно только в конце всех апп так как обработка ошибок
// и сразу идет возрат ошибки клиенту

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(PORT, ()=> console.log('Server started on port ${5000}'))
    } catch (e) {
        console.log(e)
    }
}

start()