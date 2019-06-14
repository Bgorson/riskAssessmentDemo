const mongoose = require('mongoose')
const Schema= mongoose.Schema;

let Resident = new Schema({
    resident_name:{
        type:String
    },
    resident_arrival:{
        type: String
    },
    documents: {

    }
})

module.exports= mongoose.model('Resident', Resident)