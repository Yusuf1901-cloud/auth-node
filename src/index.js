const express = require("express");
const path = require("path");
const bcrypt = require('bcrypt');
const collection = require("./config");


const app = express();
//conver data into json format
app.use(express.json() )
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs'); 
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("login")
})
app.get("/signup", (req, res) => {
    res.render("signup")
})


// Register User
app.post("/signup", async (req, res)=>{
     const data = {
        name: req.body.username,
        password: req.body.password
     }

     // check if the user exists in the DB
     const existingUser = await collection.findOne({name: data.name});
     if (existingUser){
         res.send("User nalready exists. Please choose a diff username ")
     } else {
        const saltRound = 10;
        const hashPassword = await bcrypt.hash(data.password, saltRound);
        
        data.password = hashPassword;
        const userDate = await collection.insertMany(data);
        console.log(userDate);
     }
})


//Login User
app.post('/login', async (req, res)=>{
    try {
        const check = await collection.findOne({name: req.body.username});
        if(!check){
            res.send("user name cannot found")
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password)
        if(isPasswordMatch){
            res.render("home")
        }else {
            res.send("wrong password")
        }
    } catch{
         res.send("wrong details")   
    }
})


const port = 5000;
app.listen(port, ()=>{
    console.log(`Server is runnning on Port: ${port}`);
})