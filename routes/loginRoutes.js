module.exports = (router)=>{

    const usuarioRegistrado = require("../controllers/userSignUpController")

    router.get("/signUp", usuarioRegistrado.findAll)

    router.post("/signUp", usuarioRegistrado.registrarUsuario)

    router.post("/login", usuarioRegistrado.login)
}