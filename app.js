const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cors = require('cors')
const connectDB = require('./config/connectdb')

require("./config/passport");
//Configuracion del puerto
app.set("port", process.env.PORT || 3000);

//Conexion a la base de datos
connectDB()

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  session({
    secret: "MySecret",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./api/routes/getRoute")(app);
require("./api/routes/userRoutes")(app);
require("./api/routes/loginRoutes")(app);
require("./api/routes/productsRoute")(app);
require("./api/routes/registerRoute")(app);


//

app.listen(app.get("port"), () => {
  console.log(`servidor activo en puerto ${app.get("port")}`);
});
