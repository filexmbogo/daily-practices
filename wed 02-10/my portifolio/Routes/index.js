const {Router}= require ('express')
const  router =Router()
router.get("/",(req,res)=>{
    res.status(200).render('index',{title:'index'})        
})






module.exports=router