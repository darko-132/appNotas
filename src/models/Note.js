/* Estructuta de la base de datos */

const mongoose = require('mongoose');  /* llama al mongoose */
const { Schema } = mongoose;/* mongoose.Schema */

const NoteSchema = new Schema({ /* accesde a los parametros de la funcion schema */
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', NoteSchema)