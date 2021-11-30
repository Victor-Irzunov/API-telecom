import Router from "express"
const router = new Router()


router.get('/breeds/image/random', async (req, res) => {
    try{
    // res.json('==--=-o--')
        console.log(res.json())
    }
    catch (err){

    }
})


module.exports = router