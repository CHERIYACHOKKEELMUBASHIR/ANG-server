const mongoose=require('mongoose')

//state connection string
mongoose.connect('mongodb://localhost:27017/ANGJULY',
{useNewUrlParser:true})

//model creation/collection

const User=mongoose.model('User',{
    acno:Number,
    name:String,
    pswd:String,
    balance:Number,
 transcation:Array
})

module.exports={User}