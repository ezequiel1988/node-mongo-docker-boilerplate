const Producto = require("../model/products");
const UsuarioRegistrado = require("../model/registerModel");
const faker = require("faker");

//======================== CREA UN PRODUCTO, Y SE LO ASIGNA AL USUARIO ===================//

exports.create = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      mensaje: "No se ha enviado ningun tipo de dato"
    });
  }

  const { category, productName, price, stock, image, diaIngreso } = req.body;
  const { _id } = req.query;

  const producto = new Producto({
    category: category,
    productName: productName,
    price: price,
    stock: stock,
    image: image,
    diaIngreso: diaIngreso
  });

  try {
    //Guarda un producto nuevo y lo asocia al mismo usuario por du id

    const productoGuardado = await producto.save(function() {
      UsuarioRegistrado.findByIdAndUpdate(
        { _id },
        { $push: { productos: producto } }
      ).then(response => {
        if (!response) {
          res
            .status(500)
            .send({
              mensaje: "No se puede asociar ningun usuario a este producto"
            });
        }
        usuarioRegistrado
          .save()
          .then(t => t.populate("productos").execPopulate());
      });
    });
    res.status(200).send({
      Mensaje: `El producto se ha guardado correctamente. ${productoGuardado}`
    });
  } catch (error) {
    res.status(500).send({
      Mensaje: `Hubo un error al cargar los datos. Error: ${error}`
    });
  }

  try {
    //Se fija si el producto no esta previamente creado

    const nombreProducto = await Producto.findOne({
      productName: productName
    });

    if (nombreProducto) {
      res.status(500).send({
        mensaje: "El producto ya fue creado anteriormente"
      });
    }
  } catch (err) {
    console.log(err);
  }

  try {
    const productoCreado = await producto.save();
    res.status(200).send(productoCreado);
  } catch (e) {
    res.status(500).send({
      mensaje: "Hubo un error al guardar el producto"
    });
    console.log(e);
  }
};

//======================== GENERA DATOS FALSOS ================================//

exports.createFake = async (req, res) => {
  //esta ruta solo genera datos falsos
  for (let i = 0; i < 90; i++) {
    const products = new Producto();

    products.category = faker.commerce.department();
    products.productName = faker.commerce.productName();
    products.price = faker.commerce.price();
    products.stock = faker.commerce.price();
    products.image = faker.image.image();
    products.diaIngreso = faker.date.recent();
    products.save(err => {
      if (err) {
        return res.status(500).send({
          mensaje: "Hubo un error al guardar el producto"
        });
      }
    });
    console.log(products);
  }
};

//=================================== MUESTRA TODOS LOS DATOS CREADOS ===========================//
exports.findAll = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).send(productos);
  } catch (e) {
    res.status(500).send({
      mensaje: err.mensaje || "Hubo un error al traer los datos"
    });
    console.log(e);
  }
};

//==================================== PAGINACION ==============================//

exports.productsPerPage = async (req, res) => {
  let perPage = 9;
  let { page } = req.params || 1;

  Producto.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, productos) => {
      Producto.countDocuments((err, count) => {
        if (err)
          return res
            .status(500)
            .send({ mensaje: "Hubo un error al entregar estos datos" });
        res.status(200).send({
          productos,
          current: page,
          page: Math.ceil(count / perPage)
        });
      });
    });
};

//===================================== BUSCA PRODUCTOS POR CATEGORÍA ============================0//
exports.findByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const response = await Producto.find({ category });
    res.status(200).send({
      Mensaje: response
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      Mensaje: "Hubo un error al cargar los datos"
    });
  }
};
