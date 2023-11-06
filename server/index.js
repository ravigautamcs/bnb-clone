const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const bcryptsalt = bcrypt.genSaltSync(10);


app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

mongoose.set('strictQuery', false)

// const DB = 'mongodb+srv://ravi:ravi@cluster0.wqd0pg4.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log(`connection successfull with the database!!`);
})
.catch((e)=>{
    console.log(`sorry the connection is not successfull`);
    console.log(e);
});



app.get('/test', (req, res)=>{
    res.json('test ok');
});


app.post('/register', async(req, res)=>{
    const {name, email, password} = req.body;

    try{
        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptsalt),
        })
            
        console.log(user);
        res.json(user);
    }catch(e){
        res.status(422).json(e);
    }


    // res.json({name, email, password});
});

app.post('/login', async(req, res)=>{
    const {email , password} = req.body;
    const userfound = await User.findOne({email});
    if(userfound){
        const passOk = bcrypt.compareSync(password, userfound.password);
        if(passOk){
            res.json('pass okk');
        }
        else{
            res.json('pass not ok')
        }
    }
    else{
        console.log('user not found')
        res.json('not found');
    }
})

app.listen(4000);