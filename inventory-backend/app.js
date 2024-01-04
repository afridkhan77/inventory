//basic import
const express = require('express');
const router = require('./src/router/api');
const app = new express();
const bodyParser = require('body-parser');

//security middleware lib import

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');
const xssFilters = require('xss-filters');

//database lib import
const mongoose = require('mongoose');

//security middleware implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(xssFilters());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

//body parser implement
app.use(bodyParser.json());

//request rate limit
const limiter = rateLimit({windowMs: 15*60*1000,max:3000})
app.use(limiter);

//mongodb database donnection
let URI="mongodb+srv://testuser7777:<password>@cluster0.qctaw7c.mongodb.net/?retryWrites=true&w=majority";
let OPTION={user:'testuser7777',pass:'afrid12345',autoIndex:true}
mongoose.connect(URI,OPTION,(error)=>{
    console.log("Connection Success")
    console.log(error)
})

//routing implement
app.use("app/v1,router")

//undefined route implement
app.use("*",(req,res)=>{
    res.status(404).json({status: "fail",data:"Not Found"})
})

module.exports = app;