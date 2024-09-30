// Cargo librerías instaladas y necesarias
const express = require('express');
const bodyParser = require('body-parser');
const MySQL = require('./modulos/mysql');
const session = require('express-session');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const LISTEN_PORT = 4000;

const server = app.listen(LISTEN_PORT, () => {
	console.log(`Servidor NodeJS corriendo en http://localhost:${LISTEN_PORT}/`);
});

const io = require('socket.io')(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true
	}
});

const sessionMiddleware = session({
	secret: "supersarasa",
	resave: false,
	saveUninitialized: false
});

app.use(sessionMiddleware);

io.use((socket, next) => {
	sessionMiddleware(socket.request, {}, next);
});


app.post('/login', async (req, res) => {
	const { username, password } = req.body;
	console.log("Datos de login recibidos: ", { username, password });

	try {
		const query = `SELECT * FROM Usuarios WHERE Nombre = '${username}' AND Contraseña = '${password}'`;

		const resultado = await MySQL.realizarQuery(query);

		if (resultado.length > 0) {
			res.status(200).json({ message: "Login exitoso", user: resultado });
		} else {
			res.status(401).json({ error: "Credenciales incorrectas" });
		}
	} catch (error) {
		console.error("Error en login: ", error);
		res.status(500).json({ error: "Error interno del servidor" });
	}
});



app.post('/registro', async (req, res) => {
	console.log("Datos de registro recibidos: ", req.body);
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({ error: "Faltan datos de registro" });
	}

	try {
		// Verificar si el usuario ya existe
		const consultaExistente = `SELECT * FROM Usuarios WHERE Nombre = '${username}'`;
		const resultadoExistente = await MySQL.realizarQuery(consultaExistente);

		if (resultadoExistente.length > 0) {
			return res.status(400).json({ error: "El usuario ya existe." });
		}

		// Si no existe, registrar el nuevo usuario
		const sql = `INSERT INTO Usuarios (Nombre, Contraseña) VALUES ('${username}', '${password}')`;
		const resultado = await MySQL.realizarQuery(sql);

		if (resultado.affectedRows > 0) {
			res.status(201).json({ message: "Usuario registrado exitosamente." });
		} else {
			res.status(500).json({ error: "Error al registrar usuario." });
		}
	} catch (error) {
		console.error("Error en registro: ", error);
		res.status(500).json({ error: "Error interno del servidor." });
	}
});



app.get('/NombreGet', async (req, res) => {
	try {
		const respuesta = await MySQL.realizarQuery(`SELECT Nombre FROM Usuarios`);
		res.send(respuesta);
	} catch (error) {
		console.error("Error en NombreGet: ", error);
		res.status(500).send({ error: 'Error interno del servidor' });
	}
});

app.get('/ContraseñaGet', async (req, res) => {
	try {
		const respuesta = await MySQL.realizarQuery(`SELECT Contraseña FROM Usuarios`);
		res.send(respuesta);
	} catch (error) {
		console.error("Error en ContraseñaGet: ", error);
		res.status(500).send({ error: 'Error interno del servidor' });
	}
});
