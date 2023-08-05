const mongoose=require('mongoose');

//doctors Schema

const doctorsSchema=new mongoose.Schema({
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
    department:{
        type:String,
        required:true,
    },
    designation:{
        type:String,
        required:true,
    },
    license:{
        type:String,
        required:true,
    },
    fee:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
},
{
    timestamps:true,
})

//doctors model

const Doctors=mongoose.model('Doctors',doctorsSchema);

module.exports=Doctors;