require('dotenv').config();
require('./connfig/dbConnect');
const express=require('express');
const path=require('path');
const session=require('express-session');
const MongoStore=require('connect-mongo');
const commonRoute = require('./Routes/Common /common.route');
const doctorRoute = require('./Routes/Doctor/doctor.route');
const patientRoute = require('./Routes/Patient/Patient.route');
const appointmentRoute = require('./Routes/Appointment/appointment.route');

const app=express();

//view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//session configuration
app.use(session({
    secret:process.env.SESSION_KEY, 
    resave:false,
    saveUninitialized:true,
//persisting or saving express session into database
    store:new MongoStore({
        mongoUrl:process.env.MONGO_URL,
    //for when session will expire
        ttl:24*60*60, //is equal to one day
    })

}))


//routes
//common route
app.use('',commonRoute);
//doctor route
app.use('',doctorRoute);
//patient route
app.use('',patientRoute);
//appointment Routes
app.use('',appointmentRoute);






const port=process.env.PORT||5000;
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})