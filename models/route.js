const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  startLocation: { type: String, required: true },
  endLocation: { type: String, required: true },
  waypoints: { type: [String], required: true },
  distance: { type: Number, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('Route', routeSchema);
