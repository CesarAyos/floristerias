const express = require('express');
const morgan = require('morgan') ;
const mysql = require('mysql');
const multer = require('multer');

//plantilla,  
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session'); 
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const upload = multer({ dest: 'uploads/' });

const {database} = require('./keys');


//inicicializaciones
const app = express();
require('./lib/passport');


//configuraciones

app.set('port',process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views',));
app.engine('.hbs', exphbs.engine({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs' ,
    helpers: require('./lib/handlebars')
}));
app.set('views engine', '.hbs');



//funciones de petiicon
app.use(session({
    secret: 'faztmysqlnodemysql',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
  }));

app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());




//variables globales
app.use((req,res,next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
    
});


//rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));


//public
app.use(express.static(path.join(__dirname, 'public')));


//inicio del servidor
app.listen(app.get('port'), (err, res) => {
    console.log('server on port', app.get('port'));
});


// Establecer el motor de plantillas
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

