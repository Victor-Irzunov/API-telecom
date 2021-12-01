import express from 'express'
import chalk from 'chalk'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router/router.js'

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use('/', router)



const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://Victor_React_Node:qaz123321@cluster0.jnyxn.mongodb.net/Breeds?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(chalk.cyan(`::::::::...The server is running on the port: ${PORT}...::::::::`)))

    }catch (err){
        console.log('error start: ', err)
    }
}

start()