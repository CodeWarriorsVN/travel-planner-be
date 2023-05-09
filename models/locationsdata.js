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
        default: "none",
        enum: {
            values: ["none",'less density','great density'],
            message: '{VALUE} is not a valid population'
        }
    },
    terrain:{
        type: String,
        default: "none",
        enum: { 
            values: ["none",'mountainous','coastal','delta'],
            message: '{VALUE} is not a valid terrain'
        }
    },
    climax:{
        type: String,
        default: "none",
        enum: ["none",'hot', 'cool', 'cold']
    },
    lifestyle:{
        type: String,
        default: "none",
        enum: ["none",'urban', 'countryside']
    }
})

export default mongoose.model('LocationsData', LocationsData)