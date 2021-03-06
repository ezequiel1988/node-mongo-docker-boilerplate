const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  age: {
    type: String,
    required: [true, "la edad es necesaria"]
  },
  name: {
    type: String,
    required: [true, "El nombre es necesario"]
  },
  lastName: {
    type: String,
    required: [true, "EL apellido es necesario"]
  },
  email: {
    type: String,
    required: [true, "El email es necesario"]
  }
});

module.exports = mongoose.model("usuario", usersSchema);
