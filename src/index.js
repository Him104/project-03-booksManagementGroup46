const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route');
const mongoose  = require('mongoose');
const app = express();
const multer= require("multer");
const { AppConfig } = require('aws-sdk');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any())

mongoose.connect("mongodb+srv://functionUpUranium-2:JECVxS0v96bKoG0a@cluster0.j1yrl.mongodb.net/Group46project-3-DB", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
