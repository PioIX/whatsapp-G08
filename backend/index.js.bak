var express = require('express'); 
var bodyParser = require('body-parser'); 
var cors = require('cors');

var app = express(); 
var port = process.env.PORT || 3000; 


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res){
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});

/**
 * req = request. en este objeto voy a tener todo lo que reciba del cliente
 * res = response. Voy a responderle al cliente
 */
app.get('/NombreGet', function(req,res){
    console.log(req.query) 
    res.send({respuesta: `Respuesta del Backend`})
})

app.get('/ContraseñaGet', function(req,res){
    console.log(req.query) 
    res.send({respuesta: `Respuesta del Backend`})
})

app.post('/NombrePost', function(req,res) {
    console.log(req.body) //Los pedidos post reciben los datos del req.body
    res.send("ok")
})

app.post('/ContraseñaPost', function(req,res) {
    console.log(req.body) //Los pedidos post reciben los datos del req.body
    res.send("ok")
})

//Pongo el servidor a escuchar
app.listen(port, function(){
    console.log(`Server running in http://localhost:${port}`);
    console.log('Defined routes:');
    console.log('   [GET] http://localhost:3000/');
    console.log('   [GET] http://localhost:3000/NombreGet');
    console.log('   [GET] http://localhost:3000/ContraseñaGet');
    console.log('   [POST] http://localhost:3000/ContraseñaPost');
    console.log('   [POST] http://localhost:3000/NombrePost');
});
