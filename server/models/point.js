const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const pointSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number], // NOTE -> GeoJSON stores coordinate as [longitude, latitude]
    default: [-1, -1],
    required: true
  }
});

// const Point = mongoose.model('Point', pointSchema);

// module.exports = Point;
module.exports = pointSchema;