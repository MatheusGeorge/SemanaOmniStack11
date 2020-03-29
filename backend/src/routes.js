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
const { celebrate, Segments, Joi} = require('celebrate');

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create); 

routes.post('/sessions', SessionController.create);

routes.post('/incidents', IncidentsController.create); 

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}),IncidentsController.index);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}),IncidentsController.delete); 

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
}),ProfileController.index);

module.exports = routes;