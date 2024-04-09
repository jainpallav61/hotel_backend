const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./db');
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 3000

// Middleware function
const logRequest = (req,res,next) =>{
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`)
    next();
}

app.use(logRequest);

app.use(passport.initialize());

const localAuthMIddleware = passport.authenticate('local',{session:false});
app.get('/',function(req,res){
    res.send('Welcome to my hotel');
})


const presonRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

app.use('/person',presonRoutes); 
app.use('/menu',menuItemRoutes);


app.listen(PORT, ()=>{
    console.log('Listening to port 3000')
});