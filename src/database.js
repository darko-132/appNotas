//establece coneccion entre mongo y js

const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/notes-db-app' // ejecuta o crea el directorio para la base de datos
/* , {
    useCreateIndex: true,
    useNewUrlPerser: true,
    useFindAndModify: false
} */)
    .then( db => console.log('DB is connect')) //muestra un mensaje si la base de datos se ejecuta bien
    .catch(err => console.log(err)); //muestra en consola si hay algun error en base de datos
