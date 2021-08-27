const express = require('express')
const router = express.Router()
const uniqid = require('uniqid')
const urlDB = require('../models/schema');
//....run test

router.get('/test', (req,res) => res.json({msg:'API is working'}))


router.post('/',  (req, res) => {

    if (req.body.url) {
      urlData = req.body.url;
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
    res.redirect('/');
});





module.exports = router