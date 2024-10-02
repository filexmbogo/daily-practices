const Router=require('express')
const { title } = require('process')
const router=Router()
const cookieparser= require ('cookie-parser')


router.get('/admin/',(req,res)=>{res.cookie('admin','filex',{maxAge:1000*60})
res.send('procceed')
res.end()
console.log(req.cookies)})

module.exports=router