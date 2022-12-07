const db=require('./dataservice')
const dab=require('./db')

// deposite

const deposite = (acno,pswd,amt)=>{
  var amount=parseInt(amt) //number (amt)
  return dab.User.findOne({"acno":acno,"pswd":pswd})
  .then(user=>{
    console.log("USER",user)
    if(user){
    user.balance+=amount
    user.transcation.push({
      "amount":amount,
      "type":"deposite",
      "status":"success"
    })
    user.save()
    return{
      statusCode:200,
      status:true,
      message:`Rupees ${amount} sucessfully credited to your account, and your balance is ${user.balance}`
    }
  }else{
    return{
      statusCode:402,
      status:false,
      message:"transaction failed"
    }
  }
  })
}
// const depo=(acno,password,amount)=>{

//     if (acno in database) {
//       if (password == database[acno]['password']) {
        
//         database[acno]["balance"]= Number(database[acno]["balance"])+Number(amount)
//         database[acno]["transaction"].push({
//             "mode":"online",
//             "type":"deposite",
//             "amount":amount
//           })
//         console.log(database)
//         balance=database[acno]['balance']

//         return{
//           statusCode:200,
//             status:true,
//             message:"deposit sucessfull",
//             balance

//         }
        

//       } else {
//         return{
//         statusCode:404,
//         status:false,
//         message:"inccorect password",
//       }}

//     }
//     else {
//       return{
//         statusCode:404,
//             status:false,
//             message:"Not a user",
//       }

//     }
//   }
  //withdraw
  const withdraw = (acno,pswd,amt)=>{
    var amount=parseInt(amt) //number (amt)
    return dab.User.findOne({"acno":acno,"pswd":pswd})
    .then(user=>{
      console.log("USER",user)
      if(user){
      user.balance>amount
      user.balance-=amount
      user.transcation.push({
        "amount":amount,
        "type":"withdraw",
        "status":"success"
      })
      user.save()
      return{
        statusCode:200,
        status:true,
        message:`Rupees ${amount} sucessfully debited to your account, and your balance is ${user.balance}`
      }
    }else{
      return{
        statusCode:402,
        status:false,
        message:"transaction failed"
      }
    }
    })
  }
// const withdraw=(acno,password,amount)=>{


//   if(acno in database){
//     if(password==database[acno]['password']){
//       if(Number(amount)<database[acno]["balance"]){
//         database[acno]["balance"]-=Number(amount)
//         database[acno]["transaction"].push({
//           "mode":"online",
//           "type":"withdrawel",
//           "amount":amount
//         })

//         balance=database[acno]['balance']

        
//         return{
//           statusCode:200,
//             status:true,
//             message:"widthraw sucessfull",
//             balance

//         }
        
//       } else{
//         return{
//           statusCode:404,
//             status:false,
//             message:"insufient balance",
//             balance

//         }
        
//       }
//     }else{
//       return{
//         statusCode:404,
//         status:false,
//         message:"inccorect password",
//       }
//     }

//   }else{
//     return{
//       statusCode:404,
//           status:false,
//           message:"Not a user",
//     }
//   }
// }
const transaction=(acno)=>{
  return dab.User.findOne({acno})
  .then(user=>{
    if(user){
    return{
      statusCode:200,
      status:true,
      message:"Data recieved successfully",
      transaction:user.transcation
    }
  }
}
)}
const deleteacno=(acno)=>{
  return dab.User.deleteOne({acno})
  .then(user=>{
    if(user){
    return{
      statusCode:200,
      status:true,
      message:"successfully deleted",
     
    }
  }else{
    return{
      statusCode:422,
      status:false,
      message:"Request invalid",
    
    
    }
    
  }
}
)}
module.exports={deposite,withdraw,transaction,deleteacno}