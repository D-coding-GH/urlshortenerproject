// const shortId = require('shortid')
const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({

    _id:{type:String},

    url:{
        type:String,
        required:true
    },
    hash:{
        type:String
    },
   

})

module.exports = mongoose.model('URL',urlSchema)

