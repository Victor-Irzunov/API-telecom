import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Breeds = new Schema({
    title : {type: String}
})


const breeds = mongoose.model('Breeds', Breeds)
export default breeds