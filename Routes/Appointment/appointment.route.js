const express=require('express');
const Appointment=require('../../model/Appointment/appointment.model');
const Doctors=require('../../model/Doctor/doctor.model');
const appointmentRoute=express.Router();

//all doctors page
appointmentRoute.get('/alldoctors',async(req,res)=>{
    const doctors=await Doctors.find();
    res.render('alldoctorspage',{
        doctors,
    });
})

// all appointments in database
appointmentRoute.get('/bookedappointments',async(req,res)=>{
    const appointments=await Appointment.find();
        res.render('bookedappointment',{
            appointments,
        })
})

//appointment by specfic adhar
appointmentRoute.post('/appointmentbyadhar',async(req,res)=>{
    const patientname=await Appointment.find({name:req.body.name});
    res.render('appointmentbyname.ejs',{
        patientname,
    })
})

//appointment by doctor
appointmentRoute.post('/appointmentbydoctor',async(req,res)=>{
    const doctors=await Doctors.find({department:req.body.department});
    res.render('doctorsbydepartment',{
        doctors,
    })
})

//payments by patient Id
appointmentRoute.get('/booking/:id',async(req,res)=>{
    const doctor=await Doctors.findById(req.params.id);
    res.render('patientdetail',{
        doctor:doctor,
    });
})

//save all the  appointments into database
appointmentRoute.post('/appointments',async(req,res)=>{
    const {name,age,phone,address,doctor,fee,date,type,gender}=req.body;
      const appointment=await Appointment.create({
            name,
            age,
            phone,
            address,
            doctor,
            fee,
            date,
            type,
            gender,

      })
      res.render('appointmentdetails',{
        appointment,
      });
})

appointmentRoute.get('/payment/:id',async(req,res)=>{
    const paymentDetail=await Appointment.findById(req.params.id);
    res.render('product',{
    paymentDetail,
    key:process.env.PUBLISHABLE_KEY,})
})

//take payment by  card
appointmentRoute.post('/payment/:id',async(req,res)=>{
    const patient=await Appointment.findById(req.params.id);
    stripe.customers.create({
        // email:req.body.stripeEmail,
        source:req.body.stripeToken,
        name:"<%=patient.name%>",
        address:"<%=patient.address%>",
    }).then((customers)=>{
        return stripe.charges.create({
            amount:"<%=patient.fee%>*100",
            description:"For  doctor;s Appointment",
            currency:'INR',
            customers:customers.id,
        }).then((charge)=>{
            //console.log(charge);
            res.send('success');

        })
    })
    .catch((error)=>{
        res.send(error);
    })
})





module.exports=appointmentRoute;