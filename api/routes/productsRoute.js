module.exports = router => {
    const productoRouter = require('../controllers/productController');
    const usuarioRegistrado = require("../controllers/loginController");


    //router.get('/home/productos-fake', usuarioRegistrado.verifyToken, productoRouter.createFake);

    router.get('/home/productos', usuarioRegistrado.verifyToken, productoRouter.findAll);

    router.get('/home/productos/:page', usuarioRegistrado.verifyToken, productoRouter.productsPerPage);

    router.get('/home/productos/category/:category', usuarioRegistrado.verifyToken, productoRouter.findByCategory);

    router.post('/home/productos', usuarioRegistrado.verifyToken, productoRouter.create)


}