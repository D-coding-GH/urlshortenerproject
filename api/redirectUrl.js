const express = require('express')
const router = express.Router()
const urlDB = require('../models/schema');

router.get('/', (req, res) => {
  const hash = req.headers.hash;

  urlDB.findOne({ _id: hash }, (err, doc) => {
    if (doc) {
      console.log(doc);
    return res.json({ url: doc.url });
    }
  });
});

module.exports = router
