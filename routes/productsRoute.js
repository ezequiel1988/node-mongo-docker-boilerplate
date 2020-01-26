module.exports = router => {
    const productoRouter = require('../controllers/productController');

    router.get('/home/productos-fake', productoRouter.createFake);

    router.get('/home/productos', productoRouter.findAll);

    router.get('/home/productos/:page', productoRouter.productsPerPage);

}