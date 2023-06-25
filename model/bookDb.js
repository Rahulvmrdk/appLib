const mongoose = require('mongoose')



mongoose.connect('mongodb+srv://rahulvmrdk:rahul@cluster0.tkapjnb.mongodb.net/library?retryWrites=true&w=majority')
.then(()=>{
    console.log('db connected')
})
.catch(err=>console.log(err))

let Schema = mongoose.Schema;

const LibSchema = new Schema({
    BookName:String,
    author:String,
    language:String,
    genre:String,
    bookNum:Number

});


var libModel = mongoose.model('book',LibSchema);

module.exports = libModel;