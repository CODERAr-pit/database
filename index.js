let express =require("express");

let mongoose=require("mongoose");
let app=express();
app.use(express.json());
const sendMail= require("./mailer");
require('dotenv').config();

let connectionnmodle=require("./connection");

app.use(express.urlencoded({ extended: true }));

const bcrypt = require('bcrypt');

app.post("/query-insert", async (req, res) => {
    try {
        const { username, password, email, phone, dob } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); 

        const dbconnection = new connectionnmodle({
            username,
            password: hashedPassword,
            email,
            phone,
            dob
        });

        await dbconnection.save();
        await sendMail(email, "Thanks for submitting!", `Hi ${username},
            
            we received your message Thank you for reaching out to us. We have received your message and will get back to you shortly.

            Here’s what you submitted:
            Name: ${username}
            phone:${phone},
            dob:${dob}  .`);
        res.send("Submitted and email sent!");
    }  
       catch (err) {
        res.send({
            status: 0,
            msg: "Not saved",
            Error: err
        });
    }
});


app.post("/query-check", async (req, res) => {
    const { username, password } = req.body;
    const user = await connectionnmodle.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
        res.redirect("http://127.0.0.1:5501/App/finalwindow.html");
    } else {
        res.send("Invalid Username or Password");
    }
});


    mongoose.connect(process.env.DBURL).then(()=>{
        console.error("Mongo Db Connected Succesfully"),
        app.listen(process.env.PORT);
    })

