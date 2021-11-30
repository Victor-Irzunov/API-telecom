import express, {response} from 'express'
import chalk from 'chalk'
import mongoose from 'mongoose'
// import router from './router/router.js'
import axios from "axios";

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
// app.use('/', router)




app.get('/', async (req, res) => {

    const array = []
    const array2 = []

    axios.all([
        axios.get('https://dog.ceo/api/breeds/image/random/50'),
        axios.get('https://dog.ceo/api/breeds/image/random/50')
    ]).then(axios.spread((res1, res2) => {
        console.log('------------------------------------------------------------------------------------------')
        res1.data.message.map(obj => array.push(obj))
        res2.data.message.map(obj => array.push(obj))


        for(let i=0; i < array.length; i++){
            let a = array[i].split('/').slice(-2)
            let b = { 'breed': a[0], 'image': array[i], 'title': a[1].split('.')[0] }
            array2.push(b)
        }
        console.log('array2: ', array2)


    })).catch(err => {
        console.log(err);
    });

})









const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://Victor_React_Node:qaz123321@cluster0.jnyxn.mongodb.net/Breeds?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(chalk.cyan(`::::::::...The server is running on the port: ${PORT}...::::::::`)))

    }catch (err){
        console.log('error start: ', err)
    }
}

start()