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

const assetTrackSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    track : {
        type: [gpsSchema],
        required: true
    }
})

module.exports = mongoose.model('AssetTrack', assetTrackSchema)