let express =require("express");

const TelegramBot = require('node-telegram-bot-api');
const token = '7785442298:AAHpQxkVCxu0iaPIEOe42LurZ7xsSjPo0wc'; 
const bot = new TelegramBot(token, { polling: true });

let mongoose=require("mongoose");
let connectionnmodle=require("./connection");

let app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sendMail= require("./mailer");
const bcrypt = require('bcrypt');

require('dotenv').config();


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
   
         // bot
        const chatId = 5544273570; 
        const message = `
        *New Form Submission*
         Username: ${username}
         Email: ${email}
         Phone: ${phone}
         DOB: ${dob}
    `;

    await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
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

