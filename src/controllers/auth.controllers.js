const { AuthServices } = require("../services");

const userLogin = async (req, res, next) => {
    try {
        const credentials = req.body;
        const result = await AuthServices.authenticate(credentials);
        // false -- si no encuentra coincidencia en password
        // null -- si no encutra al usuario
        // {isValid, result}
        if(result){
            const {firstname, lastname, email, id, phone } = result.result;
            const user = { firstname, lastname, email, id, phone };
            const token = AuthServices.getToken(user);
            user.token = token
            res.json({ ...user });  // ... destructurar las propiedades del objeto
        } else {
            res.status(400).json({message: "informacion invalida"});
        }
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "email o contraseña invalida"
        })
    }
}

module.exports = {
    userLogin,
}