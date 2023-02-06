const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./utils/database");
const transporter = require("./utils/mailer");
const handleError = require("./middlewares/error.middleware");
const initModels = require("./models/initModels");
const {userRoutes, authRoutes, conversationsRoutes} = require("./routes");

const app = express();

app.use(express.json())
app.use(morgan("dev"));
app.use(cors());

initModels();

db.authenticate()
    .then(() => console.log("autenticacion exitosa"))
    .catch((error) => console.log(error));

transporter.verify()
    .then(() => {
        console.log("estamos listos para enviar correos a diestra y siniestra")
    })

db.sync({force: false})
    .then(() => console.log("base de datos sincronizada"))
    .catch((error) => console.log(error))

app.get("/", (req,res) => {
    console.log("bienvenido al server")
});

app.use("/api/v1", userRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", conversationsRoutes);

app.use(handleError);

module.exports = app;