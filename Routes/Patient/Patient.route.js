const express=require('express');
const Patient=require('../../model/Patient/patient.model');
const bcrypt=require('bcryptjs');
const patientRoute=express.Router();

//patient registration page
patientRoute.get('/patientRegister',(req,res)=>{
    res.render('patientRegister');
})

//register doctor into database
patientRoute.post('/patientRegister',async(req,res)=>{
    const {password,adhar}=req.body;
        try {
    //check if user exists by email
            const userFound=await Patient.findOne({adhar});
    //throw an error
            if(userFound){
                return res.send('Patient Already Found!')
                            }
    //hash the user password
        //gen salt
            const salt=await bcrypt.genSalt(10);
        //hashing password
            const hashPassword=await bcrypt.hash(password,salt);
    //create user into database
            const patient=await Patient.create({
                 name:req.body.name,
                 email:req.body.email,
                 phone:req.body.phone,
                 gender:req.body.gender,
                 age:req.body.age,
                 adhar:req.body.adhar,
                    village:req.body.village,
                    city:req.body.city,
                    state:req.body.state,
                    pin:req.body.pin,
                
                password:hashPassword,
        })
        res.render('patientLogin');

    } catch (error) {
        console.log(error);
    }

})

//patient login Page
patientRoute.get('/patientLogin',(req,res)=>{
    res.render('patientLogin');
})

// verify login doctor from database
patientRoute.post('/patientLogin',async(req,res)=>{
    //verify login
    const {email,adhar,password}=req.body;
    
    try {
//check email exist 
    const userFound=await Patient.findOne({adhar});
    if(!userFound){
        return res.send('Invalid Login Credentials');
    }
//check for password
    const isValidPassword=await bcrypt.compare(password,userFound.password);
    if(!isValidPassword){
        return res.send('Inavlid Login Credentials');
    }
    
    //save the loginUser details into session
    req.session.loginUser=userFound;  


    res.render('patientProfile',{
        patient:userFound,
    });

} catch (error) {
        console.log(error);
    }

})


module.exports=patientRoute;