/**
 * A schema for GeoJSON coordinates. Use this schema for location coordinates in models
 **/

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
    default: [0, 0],
    required: true,
    validate: {
      validator: function (coord) {
        return coord.length === 2;
      },
      message: 'Coordinates must be in the form [longitude, latitude]',
    },
  }
});


module.exports = pointSchema;