module.exports = (router)=>{

    require("jsonwebtoken");
    const usuarioRegistrado = require("../controllers/userSignUpController");

    router.get("/signUp",usuarioRegistrado.verifyToken, usuarioRegistrado.findAll)

    router.post("/signUp", usuarioRegistrado.verifyToken, usuarioRegistrado.registrarUsuario)

    router.post("/login",usuarioRegistrado.verifyToken, usuarioRegistrado.registrarUsuario);
    //router.get("/login", usuarioRegistrado.logeado)
   
    }