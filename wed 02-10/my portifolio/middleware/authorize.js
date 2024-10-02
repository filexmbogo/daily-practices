
bodyParser = require('body-parser');
const authorize =(req,res,next)=>{
    const {name,code}=req.query
   if (name&&name==='filex'){
        if (code&&Number(code)==1813){
            next()            
        }
    }
    else{
    res.send('you bright and stuck')  }
}
module.exports=authorize