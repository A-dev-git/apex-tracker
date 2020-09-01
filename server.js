const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

//Load env
dotenv.config({path: './config.env'});

const app = express();

//Dev Logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

const port = process.env.port || 8000;

//Profile routes
app.use('/api/v1/profile', require('./routes/profile'));

//Handle production
if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static(__dirname + '/public/'));

    //Handle SPA
    app.get(/.*/, (req,res) => res.sendFile(__dirname + '/public/index.html'));
}

app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port : ` + port);
});