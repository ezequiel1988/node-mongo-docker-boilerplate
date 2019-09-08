const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs")

const signUpSchema = new Schema({
    usuarioRegistrado: {
    nombre: {
        type: String,
        required: [true, "El nombre es requerido"]
    },
    apellido: {
        type: String,
        required: [true, "EL apellido es requerido"]
    },
    email: {
        type: String,
        required:[true, "El email es requerido"],
        unique:true
    },
    password: {
        type: String,
        required:[true, "Se requiere un password"],
        unique:true
    }
}})


//Ciframos la contraseña
signUpSchema.methods.encryptPassword = async (password) => {    
    const salt = await bcrypt.genSalt(10);    
    const hash = bcrypt.hash(password, salt);
    return hash;
}

//Compara las contraseñas
signUpSchema.methods.matchPassword = async function (password) {
  return await  bcrypt.compare(password, this.password)
}


module.exports = mongoose.model("userSignUp",signUpSchema)