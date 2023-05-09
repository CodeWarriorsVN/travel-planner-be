import mongoose from "mongoose";

const LocationsData = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    slug:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    name_with_type: {
        type: String,
        required: true,
    },
    code:{
        type: String,
        required: true,
    },
    population:{
        type: String,
        required: true,
        enum: {
            values: ['less density','great density',],
            message: '{VALUE} is not a valid population'
        }
    },
    terrain:{
        type: String,
        required: true,
        enum: { 
            values: ['mountainous','coastal','delta'],
            message: '{VALUE} is not a valid terrain'
        }
    },
    climax:{
        type: String,
        required: true,
        enum: ['hot', 'cool', 'cold']
    },
    lifestyle:{
        type: String,
        required: true,
        enum: ['urban', 'countryside']
    }
})

export default mongoose.model('LocationsData', LocationsData)