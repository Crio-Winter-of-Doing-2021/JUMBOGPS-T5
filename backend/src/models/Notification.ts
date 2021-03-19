var mongoose = require("mongoose");

const trackSchema =  mongoose.Schema({
    lat: {
        type: Number,
    },
    lon: {
        type: Number,
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
})


const notificationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String
  },
  track: {
      type: [trackSchema]
  }
});

module.exports = mongoose.model("Notification", notificationSchema);
