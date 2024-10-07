const express =require('express')
const nodemailer = require('nodemailer')

const  path =require('path')
const port= process.env.port||3000
const app= express()
const cookieparser= require ('cookie-parser')

const project=require('./src/models/projects')
const images=require('./src/models/image')

 // Setup Nodemailer transporter
 let transporter = nodemailer.createTransport({
   service: 'gmail',  // You can use other services like Outlook, Yahoo, etc.
   auth: {
       user: 'filexmbogo691@gmail.com', // Your email address
       pass: 'tqpofjjqkeofrjok',  // Your email password or app-specific password
   }
});
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
app.use(express.urlencoded({ extended: true }));
app.use (express.json())

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
      console.log(result.image);  
   }).catch(error => {
      console.error(error);  
   });

  

   
   


   

}) 

app.post('/forms/contact', (req, res) => {
   console.log("reaching "); 

   const {name,email,subject,message}=req.body
    let mailOptions = {
        from: '   filexmbogo691@gmail.com',  
        to: 'filexmbogo691@gmail.com',  
        subject: 'portifolio request',  
        text: `${name} reached out on you portifolio with ${email} considering ${subject} and left the message ${message}`,
    };
    
    let options={
      from:'filexmbogo691@gmail.com'
      ,to:`${email}`,
      subject:'message received successfully ',
text:'we have received you message successfully we will reach out soon'
    }
    transporter.sendMail(options,(error,info)=>{if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
  } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
  }})
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
    console.log(message);
    

 
  
  
   res.redirect("/")



});
app.get('/admin/query',(req,res)=>{res.cookie('admin','filex',{maxAge:1000*60})
if (req.cookies.admin&& req.cookies.admin=='filex'){
   res.render('admin',{title:'Admin'})}
})

app.listen(port,(console.log(`portifolio server is running at port ${port}`)))




