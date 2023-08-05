const express=require('express');
const bcrypt=require('bcryptjs');
const protected=require('../../middleware/protected');

const Doctors=require('../../model/Doctor/doctor.model');

const doctorRoute=express.Router();

//doctor registration page
doctorRoute.get('/doctorRegister',(req,res)=>{
    res.render('doctorRegister');
})


//register doctor into database
doctorRoute.post('/doctorRegister',async(req,res)=>{
    const {name,email,phone,department,designation,license,fee,password}=req.body;
   // console.log(req.body);
    
        try {
    //check if user exists by email
            const userFound=await Doctors.findOne({license});
    //throw an error
            if(userFound){
                return res.send('Doctor Already Found!')
                            }
    //hash the user password
        //gen salt
            const salt=await bcrypt.genSalt(10);
        //hashing password
            const hashPassword=await bcrypt.hash(password,salt);
    //create user into database
            const doctor=await Doctors.create({
                name,
                email,
                phone,
                department,
                designation,
                license,
                fee,
                password:hashPassword,
        })
        res.redirect('/doctorLogin');

    } catch (error) {
        console.log(error);
    }

})

//doctor login page
doctorRoute.get('/doctorLogin',(req,res)=>{
    res.render('doctorLogin');
})

// verify login doctor from database
doctorRoute.post('/doctorLogin',async(req,res)=>{
    //verify login
    const {email,license,password}=req.body;
    
    try {
//check email exist 
    const userFound=await Doctors.findOne({license});
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


    res.render('doctorProfile',{
        doctor:userFound,
    });

} catch (error) {
        console.log(error);
    }

})

//doctor logout
doctorRoute.get('/doctorlogout',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})

//patient can check profile of an individual doctor
doctorRoute.get('/seeprofile/:id',async(req,res)=>{
    const doctor=await Doctors.findById(req.params.id);
    res.render('seeprofile',{
        doctor,
    })
})

//delete the docotor profile
doctorRoute.get('/doctorDelete/:id',async(req,res)=>{
    const deletedDoctor=await Doctors.findByIdAndDelete(req.params.id);
    res.send('Data Deleted Successfully');
})

// update doctor details
//get the details of editStudent
doctorRoute.get('/updateDoctor/:id',async(req,res)=>{
    // console.log(req.params.id);
     try {
         const editDoctor=await Doctors.findById(req.params.id);
         res.render('doctorUpdate',{doctor:editDoctor});
     } catch (error) {
         console.log('Error while getting the details of update Doctor',error);
     }
 })

//update student data into database

doctorRoute.post('/update/:id',async(req,res)=>{
    const userId = req.params.id;
    //console.log(userId);
    const updatedData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      designation: req.body.designation,
      fee: req.body.fee,
};
//console.log(updatedData);
  
    Doctors.findByIdAndUpdate(userId, updatedData, { new: true })
      .then((updatedUser) => {
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        res.redirect('/doctorlogin');
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
})

doctorRoute.get('/appoinmentbydoctor/:id',async(req,res)=>{
    
})







module.exports=doctorRoute;

