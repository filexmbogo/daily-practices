const express =require('express')
const  path =require('path')
const port= process.env.port||3000
const app= express()
const cookieparser= require ('cookie-parser')

const router= require('./Routes/index')
const route= require('./Routes/admin')
const authorize= require('./middleware/authorize')

app.use(router)
app.use(route)
app.use(cookieparser())
app.use(express.static(path.join(__dirname,'./public')))
app.set('views',path.join(__dirname,"./src/views"))
app.set('view engine','ejs')

app.get('/admin/query',(req,res)=>{res.cookie('admin','filex',{maxAge:1000*60})
if (req.cookies.admin&& req.cookies.admin=='filex'){
   res.render('admin',{title:'Admin'})}
})

app.listen(port,(console.log(`portifolio server is running at port ${port}`)))





