/*
* Rota / Recurso
*/

/*
* Tipos de parâmetros
* Query Params: ? URL, nomeados na rota (Filtros, Paginacao)
* Route Params: Parametros utilizados para identificar recursos :id 
* Request Body: Corpo da requisicao utilizado para criar ou alterar 
*/

/*
* Driver: SELECT * FROM users
* Query Builder: table('users).select('*').where()
*/

// const params = request.query; capturando query params
// const params = request.params; capturando route params /users/:id
// const body = request.body; //capturando request body
// console.log(body);

const express = require('express'); 
const routes = express.Router();
const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController'); 
const SessionController = require('./controllers/SessionController');

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create); 

routes.post('/sessions', SessionController.create);

routes.get('/incidents', IncidentsController.index);
routes.post('/incidents', IncidentsController.create); 
routes.delete('/incidents/:id', IncidentsController.delete); 

routes.get('/profile', ProfileController.index);

module.exports = routes;