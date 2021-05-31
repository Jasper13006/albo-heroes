import { Schema, model } from "mongoose";

const CharacterSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    last_sync:{
        type:Date,
    }

})

const ColaboratorSchema = new Schema({
    editors:{
        type:[String]
    }
})