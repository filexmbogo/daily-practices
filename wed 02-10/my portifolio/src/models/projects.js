const mongoose =require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/database')
  
    console.log('MongoDB connected successfully!');
const fs=require('fs')
const image=require('./image')
const path =require('path')

const eachimage= new image()
eachimage.name=('hello')
console.log(path.resolve('../../../public/img/IMG_20240328_183539.jpg'))
eachimage.data=fs.readFileSync(path.resolve('./public/img/IMG_20240328_183539.jpg'))
eachimage.contentType='image/png'
eachimage.slider=true
eachimage.save()

const portifolioshema= new mongoose.Schema({
    slider1:String,
    slider2:String,
slider3:String,
category:String,
client:String,
projectdate:String,
projecturl:String,
title:{type:String,
    unique:true
},
description:[{body:String,date:Date}]

})
const project=mongoose.model('project',portifolioshema)
module.exports= project


