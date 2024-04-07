const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

app.get('/',function(req,res){
    res.send('Welcome to my hotel');
})


const presonRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

app.use('/person',presonRoutes); 
app.use('/menu',menuItemRoutes);

app.listen(3000, ()=>{
    console.log('Listening to port 3000')
});