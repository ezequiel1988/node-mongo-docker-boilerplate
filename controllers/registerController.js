const RegistroModel = require("../model/registerModel");


//====================== MUESTRA LOS USUARIOS CON SUS PRODUCTOS ============== //
exports.findAll = async (req, res) => {

    try {
        RegistroModel.find()
          .populate("productos")
          .exec((err, usuarios) => {
            if (err) {
              console.log(err);
              res.status(500).send({ mensaje: err });
            } else {
              res.status(200).send({
                Registros: usuarios
              });
            }
          });
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .send({ mensaje: `Hubo un error al mostrar los datos. Error ${error}` });
      }
}