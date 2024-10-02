const express=require('express')
const app =express()
const port=3000
const path=require('path')
app.get("/",(req,res)=>
{res.sendFile(path.resolve(__dirname,'./index.html'))})
const {products}=require('./data')
const { error } = require('console')
const newproducts=products.map((product)=>
    {const {id,name,img}=product

     return  {id,img,name}})

app.get("/api/products",(req,res)=>{res.json(newproducts)})
app.get('/api/products/:productid',(req,res)=>{
    const {productid}=req.params
    const single= products.filter((product)=>product.id===Number(productid))
res.json(single)})
app.get('/api/products/v1/query',(req,res)=>{
    const {search,limit}=req.query
    let sorted=[...products]
       if(search)
        {sorted=products.filter((product)=> product.name.startsWith(search))
            console.log('filtered');            
        }
        if(limit){sorted=sorted.splice(0,Number(limit))
        console.log(`result reduced to ${limit}`);        
    }
    res.json(sorted)
})
app.listen(port,()=>{console.log('listening at port 3000');
})

//tuesday morning