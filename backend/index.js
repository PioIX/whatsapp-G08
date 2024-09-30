// Paquetes instalados: -g nodemon, express, body-parser, mysql2, socket.io
// Agregado al archivo "package.json" la línea --> "start": "nodemon index"

// Proyecto "Node_base"
// Desarrollo de Aplicaciones Informáticas - Proyecto de Producción - 5to Informática

// Docentes: Nicolás Facón, Matías Marchesi, Martín Rivas

// Revisión 5 - Año 2024

// Cargo librerías instaladas y necesarias
const express = require('express');						// Para el manejo del web server
const bodyParser = require('body-parser'); 				// Para el manejo de los strings JSON
const MySQL = require('./modulos/mysql');				// Añado el archivo mysql.js presente en la carpeta módulos
const session = require('express-session');				// Para el manejo de las variables de sesión
const cors = require('cors')

const app = express();									// Inicializo express para el manejo de las peticiones

app.use(bodyParser.urlencoded({ extended: false }));	// Inicializo el parser JSON
app.use(bodyParser.json());
app.use(cors())

const LISTEN_PORT = 4000;								// Puerto por el que estoy ejecutando la página Web

const server = app.listen(LISTEN_PORT, () => {
	console.log(`Servidor NodeJS corriendo en http://localhost:${LISTEN_PORT}/`);
});;

const io = require('socket.io')(server, {
	cors: {
		// IMPORTANTE: REVISAR PUERTO DEL FRONTEND
		origin: "http://localhost:3000",            	// Permitir el origen localhost:3000
		methods: ["GET", "POST", "PUT", "DELETE"],  	// Métodos permitidos
		credentials: true                           	// Habilitar el envío de cookies
	}
});

const sessionMiddleware = session({
	//Elegir tu propia key secreta
	secret: "supersarasa",
	resave: false,
	saveUninitialized: false
});

app.use(sessionMiddleware);

io.use((socket, next) => {
	sessionMiddleware(socket.request, {}, next);
});

// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)

app.get('/', (req, res) => {
	console.log(`[REQUEST - ${req.method}] ${req.url}`);
});

app.post('/login', async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).send({ error: 'credenciales no validas' });
	}

	const respuesta = await MySQL.realizarQuery(`SELECT * FROM Usuarios WHERE Nombre = ? AND Contraseña = ?`, [username, password]);
	if (respuesta.length === 0) {
		return res.status(401).send({ error: 'credenciales no validas' });
	}

	const user = respuesta[0];
	req.session.user = user;
	res.send({ message: 'loggeadoooooo' });
});

app.post('/registro', async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).send({ error: 'credenciales no validas' });
	}

	// fijarse si exite el usuario
	const respuesta = await MySQL.realizarQuery(`SELECT * FROM Usuarios WHERE Nombre = ?`, [username]);
	if (respuesta.length > 0) {
		return res.status(400).send({ error: 'el usuario ya existe' });
	}

	// crear usuario
	const nuevoUsuario = {
		Nombre: username,
		Contraseña: password,
	};
	await MySQL.realizarQuery(`INSERT INTO Usuarios SET ?`, nuevoUsuario);

	// agarrar el user id
	const nuevoUsuarioID = await MySQL.realizarQuery(`SELECT ID_Usuario FROM Usuarios WHERE Nombre = ?`, [username]);
	const userID = nuevoUsuarioID[0].ID_Usuario;

	res.send({ message: 'Usuario registrado', userID });
});


app.delete('/login', (req, res) => {
	console.log(`[REQUEST - ${req.method}] ${req.url}`);
	res.send(null);
});

app.get('/NombreGet', async function (req, res) {
	console.log(req.query)
	const respuesta = await MySQL.realizarQuery(`SELECT Nombre FROM Usuarios`)
	res.send(respuesta)
})

app.get('/ContraseñaGet', async function (req, res) {
	console.log(req.query)
	const respuesta = await MySQL.realizarQuery(`SELECT Contraseña FROM Usuarios`)
	res.send(respuesta)
})

app.post('/NombrePost', function (req, res) {
	console.log(req.body) //Los pedidos post reciben los datos del req.body
	res.send("ok")
})

app.post('/ContraseñaPost', function (req, res) {
	console.log(req.body) //Los pedidos post reciben los datos del req.body
	res.send("ok")
})


io.on("connection", (socket) => {
	const req = socket.request;

	socket.on('joinRoom', data => {
		console.log("🚀 ~ io.on ~ req.session.room:", req.session.room)
		if (req.session.room != undefined && req.session.room.length > 0)
			socket.leave(req.session.room);
		req.session.room = data.room;
		socket.join(req.session.room);

		io.to(req.session.room).emit('chat-messages', { user: req.session.user, room: req.session.room });
	});

	socket.on('pingAll', data => {
		console.log("PING ALL: ", data);
		io.emit('pingAll', { event: "Ping to all", message: data });
	});

	socket.on('sendMessage', data => {
		io.to(req.session.room).emit('newMessage', { room: req.session.room, message: data });
	});

	socket.on('disconnect', () => {
		console.log("Disconnect");
	})
});

app.listen(LISTEN_PORT, function(){
    console.log(`Server running in http://localhost:${port}`);
    console.log('Defined routes:');
    console.log('   [GET] http://localhost:4000/');
    console.log('   [GET] http://localhost:4000/NombreGet');
    console.log('   [GET] http://localhost:4000/ContraseñaGet');
    console.log('   [POST] http://localhost:4000/ContraseñaPost');
    console.log('   [POST] http://localhost:4000/NombrePost');
	console.log('   [POST] http://localhost:4000/login');
	console.log('   [POST] http://localhost:4000/registro');
});