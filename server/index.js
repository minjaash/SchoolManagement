require("dotenv").config();
const express=require('express');
const app=express();

const cors=require('cors');
const mysql=require('mysql2');

const schoolRoutes = require("../Routes/school.routes");//importing router as 'schoolRoutes'


const Port=process.env.PORT;
const Host=process.env.HOST;

app.use(cors());
app.use(express.json());
app.use("/api/schools/", schoolRoutes);


app.use(cors());
app.use(express.json());
app.use("/api/schools/", schoolRoutes);

app.listen(Port,Host,(req,res)=>{
    console.log('server is running');
});