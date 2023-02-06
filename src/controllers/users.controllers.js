const { UserServices } = require("../services");
const transporter = require("../utils/mailer");

const userRegister = async (req, res, next) => {
    try {
        const newUser = req.body;
        const result = await UserServices.create(newUser);
        res.status(201).json(result);
        //en este punto sabemos que el usuario se registro correctamente
        //es aqui donde tengo que enviar un correto
        transporter.sendMail({
            from: "<davidazp9@gmail.com>",
            to: result.email,
            subject: "bienvenido a chatapp",
            text: `hola ${result.firstname} bienvenido a la mejor aplicacion de mensajeria jamas antes vista`,
            html: `<h2><p>hola ${result.firstname} bienvenido a la mejor aplicacion de mensajeria jamas antes vista </p></h2>`
        });
    } catch (error) { 
        next({
            status: 400,
            errorContent: error,
            message: "Faltan datos",
        });
    }
};

const getAllUser = async (req, res, next) => {
    try {
        const offset = req.query.offset ?? 0; //operador nullish, si el primer valor es nulo me retorna el valor de la izquierda
        const limit = req.query.limit || 3; //puedo usar el or tambien
        const users = await UserServices.getAll( offset, limit);
        res.json(users);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Algo salio mal",
        });
    }
};

module.exports = {
    userRegister,
    getAllUser,
};