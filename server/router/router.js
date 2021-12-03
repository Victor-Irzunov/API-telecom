import Router from "express";
import axios from "axios";
const router = new Router();
import Dogs from "../models/Dogs.js";
import Breeds from "../models/Breeds.js";


router.get('/data', async (req, res) => {
    try{

    axios.all([
        axios.get('https://dog.ceo/api/breeds/image/random/39'),
        axios.get('https://dog.ceo/api/breeds/image/random/39')
    ])
        .then(axios.spread(async (res1, res2) => {
            let arr = [];
            res1.data.message.map(obj => arr.push(obj));
            res2.data.message.map(obj => arr.push(obj));

            for(let i=0; i < arr.length; i++){
                let arrStrings = arr[i].split('/').slice(-2);
                let obj = {'breed': arrStrings[0], 'image': arr[i], 'title': arrStrings[1].split('.')[0]};

                const breed = new Breeds({title: obj.breed});
                await breed.save(err => {
                    if (err) return console.log(err);

                    const dogs = new Dogs({'breed':breed._id, 'image': obj.image, 'title': obj.title});
                    dogs.save(err => {
                        if (err) return console.log(err);
                    });
                });
            }
        }))
        .catch(err => {
            console.log(err);
        });

    }catch (e){
        console.log('error: ', e);
    }
    res.send('ok');
});


router.get('/', async (req, res) => {
    try{
        let { page, limit } = req.query;

        page = page || 1;
        limit = limit || 5;
        let offset = page * limit - limit;

        const count = await Dogs.estimatedDocumentCount();
        const dataBreeds = await Breeds.find().skip(offset).limit(5);
        const dataDogsAll = await Dogs.find();

        const data = [];
        dataBreeds.forEach(obj => {
             dataDogsAll.forEach(el => {
                 if (obj._id.toString() === el.breed.toString()){
                     let objOne = {el, obj};
                     data.push(objOne);
                 }
             });
        });
        res.json({data, count});

    }catch (e){
        console.log('error: ', e);
    }
});


router.get('/select' , async (req, res) => {
    try {
        const {option} = req.query;

        const count = await Breeds.find({title: option}).count();
        const dataBreeds = await Breeds.find({title: option});
        const dataDogs = await Dogs.find({breed: dataBreeds[0]._id});

        const dataDogsCopy = Object.assign(...dataDogs, {});
        const dataBreedsCopy = Object.assign(...dataBreeds, {});

        const data = [{el: dataDogsCopy, obj: dataBreedsCopy}];

        res.json({data, count});

    }catch (e){
        console.log('error: ', e);
    }
});

router.get('/search' , async (req, res) => {
    try {
        const {searchVal} = req.query;

        const count = await Dogs.find({title: searchVal}).count();
        const dataDogs = await Dogs.find({title: searchVal});
        const dataBreeds = await Breeds.find({_id: dataDogs[0].breed});

        const dataDogsCopy = Object.assign(...dataDogs, {});
        const dataBreedsCopy = Object.assign(...dataBreeds, {});

        const data = [{el: dataDogsCopy, obj: dataBreedsCopy}];

        res.json({data, count});

    }catch (e){
        console.log('error: ', e);
    }
});


export default router;