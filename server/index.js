const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();

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


app.post('/register', (req, res)=>{
    const {name, email, password} = req.body;
    console.log({name, email, password});
    res.json({name, email, password});
});

app.listen(4000);