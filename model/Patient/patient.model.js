const mongoose=require('mongoose');

//doctors Schema


//patient Schema
const patientSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    
    age:{
        type:String,
        required:true,
    },
    adhar:{
        type:String,
        required:true,
    },
    village:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    pin:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
},
{
    timestamps:true,
})

//doctors model

const Patient=mongoose.model('Patient',patientSchema);

module.exports=Patient;