const express = require('express');
const moment = require('moment');
const path = require('path'); 
const {Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');
const { mongodb } = require('./config/db');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const normalizar = require('./normalizr')
const chatController = require('./components/chat/chatController');
const serverRoutes = require('./routers');

// nicializacion
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = process.env.PORT || 8080;

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


// configuracion de sesiones
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: mongodb.URL,
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }

        }),
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 60 * 1000,
        },
        rolling: true
    })
);

// Vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ROUTERS
serverRoutes(app)

// Socket.io
io.on('connection', async (socket) => {
    console.log('Nuevo usuario conectado');

    socket.emit('messages', normalizar(await chatController.listAll()));

    socket.on('message', async (message) => {
        console.log(message);

        const {author, text} = message;
        const newMessage = {
            author,
            text,
            fecha: moment().format('YYYY-MM-DD HH:mm:ss')
        };
        await chatController.save({
            author: newMessage.author,
            text: newMessage.text,
            fecha: newMessage.fecha
        });
        io.socket.emit('message', newMessage);
    })
})



const server = httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

server.on('error', () => {
    console.log('Error en el servidor');
})