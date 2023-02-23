
const express = require('express');
const { Server } = require('socket.io');
const { connectionSocket } = require('./utils/soket.io')
const handlebars = require('express-handlebars');
const productsRoute = require('./routes/products.routes');
const cardsRoute = require('./routes/carts.routes')
const productsRouteBd = require('./routes/products.router.bd')
const cartsRouteBd = require('./routes/carts.router.bd')
const viewRoute = require('./routes/views.route')
const routerSession = require('./routes/session.router')
const chatsRouter = require('./routes/chats.router')
const server = express();
const session = require('express-session');
const cookieParser = require("cookie-parser");
// const FileStore = require ("session-file-store");
const mongoconnect = require("connect-mongo");
const mongoose = require('mongoose');
const productModel = require('./dao/models/products.model');


mongoose.set('strictQuery', false)


// const FileStorage = FileStore(session);
const httpServer = server.listen(8080, () => {
  console.log('Servidor Listo en puerto 8080')

})

//handlerbars
server.engine('handlebars', handlebars.engine());
server.set('views', __dirname + '/views');
server.set('view engine', 'handlebars');

//cokiers
server.use(cookieParser());


//express
server.use(express.static(__dirname + '/public'));
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

const uri = "mongodb+srv://root:uhxZm0JJ5P6Iy90Y@cluster0.kejfql2.mongodb.net/test?retryWrites=true&w=majority";
server.use(
  session({
    store: mongoconnect.create({
      mongoUrl:
        uri,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 60 * 60,
    }),
    secret: "secretCode",
    resave: true,
    saveUninitialized: true,
  })
);

//rutas

server.use("/api/products/", productsRoute);
server.use("/api/carts/", cardsRoute);
server.use("/", viewRoute);
server.use('/api/session/', routerSession);
server.use("/api/productsBd/", productsRouteBd);
server.use("/api/cartsBd/", cartsRouteBd);
server.use("/api/chats/", chatsRouter);


const connection = async () => {
  await mongoose.connect(uri).catch(err => console.log(err.reason));
  console.log("Conexión realizada.");
}
connection();


connectionSocket(httpServer);

