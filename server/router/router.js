import Router from "express"
import axios from "axios";
const router = new Router()
import dogs from "../models/Dogs.js"
import breeds from "../models/Breeds.js"


router.get('/', async (req, res) => {

    const array = []

    axios.all([
        axios.get('https://dog.ceo/api/breeds/image/random/50'),
        axios.get('https://dog.ceo/api/breeds/image/random/50')
    ])
        .then(axios.spread((res1, res2) => {
            let arr = []
            res1.data.message.map(obj => arr.push(obj))
            res2.data.message.map(obj => arr.push(obj))


            for(let i=0; i < arr.length; i++){
                let arrStrings = arr[i].split('/').slice(-2)
                let obj = { 'breed': arrStrings[0], 'image': arr[i], 'title': arrStrings[1].split('.')[0] }
                array.push(obj)

            }
            console.log('array: ', array)


        })).catch(err => {
        console.log(err);
    });
    res.send('super')
})


export default router