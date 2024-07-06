const mongose = require("mongoose");
const connect = mongose.connect("mongodb://localhost:27017/login-tut");

connect.then(()=>{
    console.log("Databse connected Successfully!");
})
.catch(()=>{
    console.log("Error occured while connecting to the serever.");
})

// create a schema

const LoginSchema = new mongose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

// collection part
const collection = new mongose.model("users", LoginSchema);

module.exports = collection;