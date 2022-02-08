/* base de datos de usuarios */

const mongoose = require('mongoose');  /* llama al mongoose */
const { Schema } = mongoose;/* mongoose.Schema */
const bcrypt = require('bcryptjs'); /* dependencia para encriptar contraseñas */

const userSchema = new Schema({ /* accesde a los parametros de la funcion schema */
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

userSchema.methods.encryptPassword = async (password) =>{
    const salt= await bcrypt.genSalt(10); /* encripta 10 veces la contaseña */
    const hash = bcrypt.hash(password, salt); /* genera la contraseña cifrada */
    return hash;
};

userSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password); /* compara las contraseña con hash vs la contraseña de base de datos */
};
module.exports = mongoose.model('User', userSchema)
