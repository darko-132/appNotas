const express = require('express') //framework web de node
const path = require ('path'); //Permite trabajar con ruta de ficheros
const exphbs = require('express-handlebars'); // permite establecer las vistas de la pagina
const methodOverride = require('method-override'); // permite trabajar con mas metodos en los input
const session=  require('express-session');// almacena las credenciales de los usuarios
const flash= require('connect-flash');
const passport =  require('passport')
// Initiliazations
const app = express(); // inicializa express
require('./database');
require('./config/passport') //solicita le archivo para sesion

//Settings
app.set('port', process.env.PORT || 4000); // selecciona el puerto
app.set('views', path.join(__dirname, 'views')); // direccion de la carpeta view
app.engine('.hbs', exphbs.engine({ // configuracion de express-handlebars
    defaultLayout: 'main', //hbs principal, todos los hbs se renderizaran sobre este
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'

}));

app.set('view engine', '.hbs'); //Carga las configuraciones
//Middlewares
app.use(express.urlencoded({extended: false})); //Permite entender los datos del usuario al registrarse, extended bloquea imagenes
app.use(methodOverride('_method')); //envia metodo oculto
app.use(session({ // configuraciones basicas express permite almacenar sesiones
    secret: 'mysecretapp', // palabra secreta
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session())
app.use(flash());
//GLobal Variables
app.use(express.static(path.join(__dirname, 'public'))); // direccionde la carpeta public
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg'); // almacena los mensajes de exito en flash
    res.locals.error_msg = req.flash('error_msg'); // almacena los mensajes de error en flash
    res.locals.error = req.flash('error'); // almacena los mensajes de error en flash
    res.locals.user = req.user || null;
    /* console.log(req.user[name]) */

    next();
})
//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//Static Files  

//Server is listenning
app.listen(app.get('port'), ()=> {
    console.log('server on port', app.get('port'))
}); // ejecuta un console log en el puerto indicado

