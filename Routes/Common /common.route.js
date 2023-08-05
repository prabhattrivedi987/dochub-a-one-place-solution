const express=require('express');

const commonRoute=express.Router();

commonRoute.get('/',(req,res)=>{
    res.render('index');
})


module.exports=commonRoute;