const UserSignUp = require("../model/usuarioLogeado.js");
const passport = require("passport");
const jwt = require("jsonwebtoken");

//Registrar un usuario nuevo
exports.registrarUsuario = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      mensaje: "Usuario logeado correctamente"
    });
  }

  const usuarioARegistrar = await new UserSignUp({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    password: req.body.password
  });

  try {
    const userEmail = await UserSignUp.findOne({
      email: req.body.email
    });

    if (userEmail) {
      res.status(500).send({
        mensaje: "El email ya está en uso"
      });
    }
  } catch (err) {
    console.error(err);
  }

  try {
    //Guarda la contraseña cifrada
    usuarioARegistrar.password = await usuarioARegistrar.encryptPassword(
      usuarioARegistrar.password
    );
    //Guarda el usuario registrado
    const data = await usuarioARegistrar.save();
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      mensaje: "Hubo un problema al registar el usuario"
    });
  }
};

//login con un usuario registrado y envía un token
exports.loginUsuario = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      mensaje: "Usuario logeado correctamente"
    });
  }

  const usuarioARegistrar = await new UserSignUp({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    password: req.body.password
  });

  jwt.sign({ usuarioARegistrar }, "secretkey", (err, token) => {
    if (err) {
      console.log(err);
    }
    res.send({ token });
  });

  try {
    const userEmail = await UserSignUp.findOne({
      email: req.body.email
    });

    if (userEmail) {
      res.status(500).send({
        mensaje: "El email ya está en uso"
      });
    }
  } catch (err) {
    console.error(err);
  }

  try {
    //Guarda la contraseña cifrada
    usuarioARegistrar.password = await usuarioARegistrar.encryptPassword(
      usuarioARegistrar.password
    );
    //Guarda el usuario registrado
    const data = await usuarioARegistrar.save();
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      mensaje: "Hubo un problema al registar el usuario"
    });
  }
};

//Para acceder se necesita mandar un token por Authorization
exports.findAll = async (req, res) => {
  jwt.verify(req.token, "secretkey", (err, autData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        mensaje: "no se que va acá",
        autData
      });
    }
  });
  try {
    const usuarios = await UserSignUp.find();
    res.send(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      mensaje: "Hubo un problema al cargar los usuarios registrados"
    });
  }
};

exports.verifyToken = function(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};
