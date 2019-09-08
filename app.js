const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose")

//Configuracion del puerto

app.set("port", process.env.PORT || 3000)

//Conexion a la base de datos

mongoose.connect("mongodb://localhost:27017/crud-mong", { useNewUrlParser: true })
.then(db => console.log("conectado a mongodb"))
.catch(err => console.error(err))

//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  require("./routes/userRoutes")(app);
  require("./routes/loginRoutes")(app)


//

app.listen(app.get("port"), ()=>{

    console.log(`servidor activo en puerto ${app.get("port")}`);
})