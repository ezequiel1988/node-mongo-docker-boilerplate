const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const registerSchema = new Schema({
  nombre: {
    type: String,

  },
  apellido: {
    type: String,

  },
  email: {
    type: String,
    required: [true, "El email es requerido"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Se requiere un password"],
  }
});

//Ciframos la contraseña
registerSchema.methods.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(password, salt);
  return hash;
};

//Compara las contraseñas
registerSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("RegistroModel", registerSchema);
