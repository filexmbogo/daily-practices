const express =require('express')
const  path =require('path')
const port= process.env.port||3000
const app= express()
const cookieparser= require ('cookie-parser')

const project=require('./src/models/projects')
const images=require('./src/models/image')


const router= require('./Routes/index')
const route= require('./Routes/admin')
const authorize= require('./middleware/authorize')
const { name } = require('ejs')
const mongoose =require('mongoose')
const { error } = require('console')
const connect= async ()=>{
mongoose.connect('mongodb://127.0.0.1:27017/database')
  
    console.log('MongoDB connected successfully!')

const web= new project(
   ({
      slider1:'john',
      slider2:'end',
  slider3:'next',
  category:'web-app',
  client:'harmony -gates',
  projectdate:"22-10-2024",
  projecturl:'https//google//kenya',
  title:'harmonyy gates',
  description:[{body:'nice to work for the harmony gate',date:Date.now()}]
  
  }
)
)
try{await  web.save()}
catch{error}

 const result=   await project.findOne({slider1:'john'}).exec()
const image= await images.findOne({name:'hello'})
 return {result,image}
 
 
}


app.use(router)
app.use(route)
app.use(cookieparser())
app.use(express.static(path.join(__dirname,'./public')))
app.set('views',path.join(__dirname,"./src/views"))
app.set('view engine','ejs')

app.get('/portfolio-details',(req,res)=>{
   const get = async () => {
      
      const Result = (await connect()).result;  // Wait for connect() to resolve
      const image= (await connect()).image;  
      const result={Result,image}
      //console.log(result);
      
      return result;  // Return the actual result
   };
   
   get().then(result => {

   res.render('portfolio-details',{result})
      console.log(result.image);  // Log the actual result
   }).catch(error => {
      console.error(error);  // Handle any errors
   });
  

   
   


   

})
app.get('/admin/query',(req,res)=>{res.cookie('admin','filex',{maxAge:1000*60})
if (req.cookies.admin&& req.cookies.admin=='filex'){
   res.render('admin',{title:'Admin'})}
})

app.listen(port,(console.log(`portifolio server is running at port ${port}`)))




