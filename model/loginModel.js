const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");


const loginSchema = new Schema({
  email: {
    type: String,
    required: [true, "El email es requerido"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Se requiere un password"],
    unique: true
  }
});

//Ciframos la contraseña
loginSchema.methods.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(password, salt);
  return hash;
};

//Compara las contraseñas
loginSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("LoginUserModel", loginSchema);
