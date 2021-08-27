const express = require('express');
const mongoose = require('mongoose');
const urlDB = require('./models/schema');
const dotenv = require('dotenv');
const axios = require('axios');
const path = require('path');
const uniqid = require('uniqid');
const router = express.Router();

const app = express();

dotenv.config({ path: './.env' });
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB is connected'));

// routes
const collectUrl = require('./api/originalURL')//...collect from frontend
app.use('/api/originalURL', collectUrl)//....route to api 

const sendUrl = require('./api/redirectUrl')
app.use('/api/redirectUrl',sendUrl)



app.get('/', (req, res) => {
  res.send('hello backend');
});

app.get('/pox/:hash', (req, res) => {
  const id = req.params.hash;
  console.log(id);   
  urlDB.findOne({ _id: id }, (err, doc) => {
    if (doc) {
      console.log(doc);
      console.log(doc.url)
      console.log('true');
      res.redirect('http://' + doc.url);
    } else {
      console.log('false');
    }
  });
});



const Port = 5000;

app.listen(Port, () => {
  console.log('Server running on Port  ' + Port);
});
