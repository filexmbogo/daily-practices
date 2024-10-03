const mongoose= require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/database', )
  
    console.log('MongoDB connected successfully!');
const imgschema= new  mongoose.Schema({
    
        name:String,
        data:Buffer,
        contentType:String,
        slider:Boolean
    
})
const image=mongoose.model('image',imgschema)
module.exports=image