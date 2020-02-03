const Producto = require('../model/products');
const faker = require('faker')

exports.create = async (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            mensaje: 'No se ha enviado ningun tipo de dato'
        })
    }

    const { category, productName, price, stock, image, diaIngreso } = req.body

    const producto = new Producto({
        category: category,
        productName: productName,
        price: price, 
        stock: stock,
        image: image,
        diaIngreso: diaIngreso

    });

    try {
        const nombreProducto = await Producto.findOne({
            productName: productName
        });

        if(nombreProducto) {
            res.status(500).send({
                mensaje:'El producto ya fue creado anteriormente'
            })
        }

    } catch (err) {
        console.log(err)
    }

    try {
        const productoCreado = await producto.save();
        res.status(200).send(productoCreado)
    } catch (e) {
        res.status(500).send({
            mensaje: 'Hubo un error al guardar el producto'
        });
        console.log(e)
    }
}

exports.createFake = async (req, res) => {
    //esta ruta solo genera datos falsos
    for (let i = 0; i < 90; i++) {
        const products = new Producto();

        products.category= faker.commerce.department();
        products.productName=faker.commerce.productName();
        products.price=faker.commerce.price();
        products.stock=faker.commerce.price();
        products.image= faker.image.image();
        products.diaIngreso=faker.date.recent();
        products.save(err => {
            if(err) {return  res.status(500).send({
                mensaje: 'Hubo un error al guardar el producto'
            })}
        });    
        console.log(products);
    }
}

exports.findAll = async (req, res) => {
    try {
        const productos = await  Producto.find();
        res.status(200).send(productos)
    } catch (e) {
        res.status(500).send({
            mensaje: err.mensaje || "Hubo un error al traer los datos"
        })
        console.log(e);
    }  
}

exports.productsPerPage = async (req, res) => {
    let perPage = 9;
    let { page } = req.params || 1;

    Producto
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, productos) => {
            Producto.countDocuments((err, count) => {

                if(err) return res.status(500).send({mensaje: 'Hubo un error al entregar estos datos'});
                res.status(200).send({
                    productos,
                    current: page,
                    page: Math.ceil(count / perPage)
                })
            })
        })
}

exports.findByCategory = async (req, res)=> {
    
    const { category } = req.params

    try {
      const response = await Producto.find({category});
      res.status(200).send({
          'Mensaje': response
      })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'Mensaje': 'Hubo un error al cargar los datos'
        })
    }
}