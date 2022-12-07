// export express
const { request } = require('express')
const express=require('express')  
const ds=require('./dataservice')
const db=require('./depositservice')
const jwt=require('jsonwebtoken')
const cors = require('cors')
// app creation
const app=express()
app.use(express.json())

app.use(cors({
    origin:'http://localhost:4200'
}))

const jwttokenmiddleware=((req,res,next)=>{
    try{
        const token=req.headers["x-access-token"]
        const data=jwt.verify(token,'supersecretkey@123')
        if(req.body.acno==data.currentaccountnumber){
            next()
        }
    }
    catch{
        return{
            statusCode:400,
            status:false,
            message:"login firstt"
        }
    }
})

// resolving http request
app.get('/get',(req,res)=>{
    res.status(405).send("this is get method")

})

const appMiddleware=(req,res,next)=>{
console.log("Application Specific Middle")
next()
}
///using middleware
app.use(appMiddleware)

app.post('/post',(req,res)=>{
    res.send("this is post method")
})
//register api call
app.post('/register',(req,res)=>{
    ds.register(req.body.acno,req.body.password,req.body.uname)
    .then(user=>{
    if(user){
        res.status(user.statusCode).json(user)
    }   if(user){
        res.status(user.statusCode).json(user)
    }
    })
    // else{}
    //     res.status(result.statusCode).json(result)
    // }
})
app.post('/login',(req,res)=>{
    ds.login(req.body.acno,req.body.password)
    .then(user=>{
        if(user){
            res.status(user.statusCode).json(user)
        }
    })

})

app.post('/deposite',jwttokenmiddleware,(req,res)=>{
    db.deposite(req.body.acno,req.body.password,req.body.amount)
    .then(user=>{
        console.log("USER:",user)
    if(user){
        console.log("STATUS success")
        res.status(user.statusCode).json(user)
    }
})
})

app.post('/withdraw',jwttokenmiddleware,(req,res)=>{
    db.withdraw(req.body.acno,req.body.password,req.body.amount)
    .then(user=>{
    if(user){
        res.status(user.statusCode).json(user)
    }
})
})

app.post('/transaction',(req,res)=>{
        db.transaction(req.body.acno)
        .then(user=>{
            if(user){
                res.status(user.statusCode).json(user)
            }
        })
})
app.delete('/delete/:acno',(req,res)=>{
    db.deleteacno(req.params.acno)
    .then(user=>{
        if(user){
            res.status(user.statusCode).json(user)
        }
    })
})

app.listen(3400,()=>{
    console.log("server listening to port number 3010")
})
