const {Schema, model} = require('mongoose')

const gameSchema = new Schema({
  title: {
    type: String,
    require: true,
    trim: true
  },
  system: {
    type: String,
    trim: true
  },
  img: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
}, {
  timestamps: true,
  versionKey: false,
})

module.exports = model('Game', gameSchema);