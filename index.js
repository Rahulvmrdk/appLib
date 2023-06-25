//1. importing
const express = require("express");
const libModel = require("./model/bookDb");
const cors = require('cors');
const path = require('path');

//2. ini
const app = new express()
//middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'/build')));


//3.api creation

app.post('/api/create',async(req,res)=>{
    console.log(req.body)
    var data =await libModel(req.body)
    data.save()
    res.send({status:'data saved'})
})

app.get('/api/view',async(req,res)=>{
    var data = await libModel.find();
    res.json(data);
})
//delete all books
app.delete('/api/deletebooks/:id',async(req,res)=>{
    console.log(req.params)
    let id = req.params.id;
    await libModel.findByIdAndDelete(id);
    
    res.json({status:'deleted'})
    
})

//update
app.put('/api/edit/:id',async(req,res)=>{
    let id = req.params.id;

    try{
        var data = await libModel.findByIdAndUpdate(id,req.body)
        res.json({status:"updated"})
    }
    catch(err){
        res.status(500).send(err)
    }
})

app.get('/*', function(req, res) { 
    res.sendFile(path.join(__dirname 
    ,'/build/index.html')); });



//port
app.listen('3008',()=>{
    console.log('port 3008 is up and running')
})