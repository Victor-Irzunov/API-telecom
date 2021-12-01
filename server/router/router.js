import Router from "express"
import axios from "axios";
const router = new Router()
import Dogs from "../models/Dogs.js"
import Breeds from "../models/Breeds.js"


router.get('/data', async (req, res) => {
    try{
    axios.all([
        axios.get('https://dog.ceo/api/breeds/image/random/2'),
        axios.get('https://dog.ceo/api/breeds/image/random/2')
    ])
        .then(axios.spread(async (res1, res2) => {
            let arr = []
            res1.data.message.map(obj => arr.push(obj))
            res2.data.message.map(obj => arr.push(obj))


            for(let i=0; i < arr.length; i++){
                let arrStrings = arr[i].split('/').slice(-2)
                let obj = { 'breed': arrStrings[0], 'image': arr[i], 'title': arrStrings[1].split('.')[0] }

                const breed = new Breeds({title: obj.breed})
                await breed.save(err => {
                    if (err) return console.log(err)

                    const dogs = new Dogs({'breed':breed._id, 'image': obj.image, 'title': obj.title})
                    dogs.save(err => {
                        if (err) return console.log(err)
                    })
                })
            }
        }))
        .catch(err => {
            console.log(err)
        })
    }catch (e){
        console.log('error: ', e)
    }
    res.send('ok')
})

router.get('/', async (req, res) => {
    try{
        const dataBreeds = await Breeds.find()
        const dataDogs = await Dogs.find()
        const data = {dogs : [...dataDogs], breeds: [...dataBreeds] }

        res.json(data)
    }catch (e){
        console.log('error: ', e)
    }
})




export default router