const path = require('path');
const http = require('http');
const express = require("express");
const bodyParser = require('body-parser')
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = process.env.PORT || 8080;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json())

const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const notificationsRouter = require('./routes/notifications');
const adminRouter = require('./routes/admin');
const usersRouter = require('./routes/users');

app.get('/', (req, res) => {
    res.redirect('/api/products');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter(io));
app.use('/api/notifications', notificationsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/users', usersRouter);

server.listen(port, () => console.log(`app listening on localhost:13000...`));