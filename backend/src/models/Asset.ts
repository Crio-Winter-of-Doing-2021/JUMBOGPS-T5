var mongoose = require('mongoose');

const gpsSchema =  mongoose.Schema({
    lat: {
        type: String,
    },
    lon: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
})

const assetSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc : {
        type: String,
        required: true
    },
    track : [gpsSchema],
    arrived : {
        type: Boolean,
        default : false
    }
})


module.exports = mongoose.model('Asset', assetSchema)