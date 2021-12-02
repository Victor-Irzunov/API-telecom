// import {Schema, model} from "mongoose";
import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const Dogs = new Schema({
    breed : {
        type: Schema.Types.ObjectId,
        ref: 'Breeds'
    },
    image : {type:String},
    title : {type: String}
})

const dogs = mongoose.model('Dogs', Dogs);
export default dogs;