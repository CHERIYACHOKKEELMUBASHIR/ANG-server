const jwt=require('jsonwebtoken')
const db=require('./db')
// database = {
//     1000: { acno: 1000, uname: "Mubashir", password: 1000, balance: 100000 ,transaction:[]}
//   }
  //register

  const register=(acno,pswd,name)=>{

    return db.User.findOne({acno}) //"acno:acno"
    .then(user=>{
      if(user){

      return{
        statusCode:422,
        status:false,
        message:"User already exists"
      }
    }else{
      const newUser= new db.User({
        acno,
        name,
        pswd,
        balance:0,
        transaction:[]

      })
      newUser.save()//for saving data into db
      return{
        statusCode:200,
        status:true,
        message:"User registered successfully"
      }


    }
  })
}
  //    if(accountnumber in database){
  //      return {
  //       statusCode:422,
  //       status:false,
  //       message:"user already exist"
  //      }
  //    }else{
  //      database[accountnumber]={
  //        "acno":accountnumber,
  //        "uname":name,
  //        "password":password
 
  //      }
  //      console.log(database)
  //      return {
  //       statusCode:200,
  //       status:true,
  //       message:"user created successfully"

  //      }
  //    }
 
  //  }
//login

const login=(acno,password)=>{
  return db.User.findOne({"acno":acno,"pswd":password})
  .then(user=>{
    if(user){
      currentname=user.name
      currentacno=acno
      const token=jwt.sign({
        currentaccountnumber:acno
      },'supersecretkey@123')
      return{
        statusCode:200,
        status:true,
        message:"login successfull",
        token,
        currentname,
        currentacno
      }
    }else{
      return{
        statusCode:402,
        status:false,
        message:"login failed"
      }
    }
    })
}

  // const login=(acno,pswd)=> {
  //   // alert("login clicked")
   
  //   if (acno in database) {
  //     if (pswd == database[acno]['password']) {
      
  //       var username=database[acno]['uname']
  //       var accountnumber=database[acno]['acno']
  //       const token=jwt.sign({
  //         currentaccountnumber:acno
  //     },'supersceretkey@123')
  //       // localStorage.setItem('user',JSON.stringify(this.username))
  //       return {
  //           statusCode:200,
  //           status:true,
  //           message:"login succesfull",
  //           username,
  //           accountnumber,
  //           token

  //       }
  //     } else {
  //       // alert("incorrect password")
  //       return {
  //           statusCode:422,
  //           status:false,
  //           message:"not registered",
  //       }
  //     }
  //   }
  //   else {
  //   //   alert("not a user,register first")
  //     return {
  //       statusCode:422,
  //           status:false,
  //           message:"password error",
  //     }
  //   }

  // }
  
   module.exports={register,login}