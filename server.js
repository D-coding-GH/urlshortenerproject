const express = require('express');
const mongoose = require('mongoose');
const urlDB = require('./models/schema');
const dotenv = require('dotenv');
const axios = require('axios');
const path = require('path');
const uniqid = require('uniqid');


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

app.get('/', (req, res) => {
  res.send('hello backend');
});

app.post('/api/originalURL', async (req, res) => {
  if (req.body.longURL) {
    urlData = req.body.longURL;
  }
  console.log('URL is : ', urlData);

  urlDB.findOne({ url: urlData }, (err, doc) => {
    if (doc) {
      console.log('entry found in database');
    } else {
      console.log('new url');
      const webaddress = new urlDB({
        _id: uniqid(),
        url: urlData,
      });
      webaddress.save((err) => {
        if (err) {
          return console.error(err);
        }

        res.send({
          url: urlData,
          hash: webaddress._id,
          message: 'url added database',
        });
      });
    }
  });
   res.redirect('/')
});

// app.get('/api/sendlink', (req, res) => {
//   const hash = req.headers.hash

//   urlDB.findOne({ _id: hash })
//     .then((doc)=>{
//    return res.json({ url: doc.url})
//     })
//     // res.redirect('/')
// });



app.get('/api/sendlink', async (req, res) => {


  const hash = req.headers.hash
 

     urlDB.findOne({ _id: hash })
    .then((doc)=>{
   return res.json({ url: doc.url})///.....url of null
    })


 .then()


  const id = req.params.hash;
 await  urlDB.findOne({ _id: id }, (err, doc) => {
    if (doc) {
      console.log(doc.url);
      res.redirect('http://' + doc.url);
    } else {
      // res.redirect('/');
    }
  });
});

const Port = 5000;

app.listen(Port, () => {
  console.log('Server running on Port  ' + Port);
});
