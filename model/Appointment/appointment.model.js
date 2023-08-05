const mongoose=require('mongoose');

//appointment schema
const  appointmentSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        requiredP:true,
    },
    doctor:{
        type:String,
        required:true,
    },
    fee:{
        type:Number,
        required:true,
    },
    type:{
        type:String,
        required:true,
        enum:["physical","virtual"],
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female","other"],
    },

   
    prescription:{
        type:String,
    },
    
    link:{
        type:String,
    }
},{
    timestamps:true,
});

//appointment model
const Appointment=mongoose.model('Appointment',appointmentSchema);

module.exports=Appointment;