let mongoose=require("mongoose");
let Userschema=mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    }})
    let Db=mongoose.model("Details",Userschema);
    module.exports=Db;