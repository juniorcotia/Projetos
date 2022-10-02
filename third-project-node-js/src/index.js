/**
 * Métodos HTTP:
 * 
 * GET: Buscar informações do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

/**
 * Tipos de parâmetros:
 * 
 * Query Params: Filtros e paginação
 * Route Params: Identificar recursos (Atualizar/Deletar)
 * Request Body: Conteúdo para criar ou editar  um recurso (JSON)
 */

/** Middleware:
 * 
 * Interceptador de requisições que pode interromper uma requisição
 * ou alterar dados de uma requisição 
*/

const express = require('express');
const { uuid, isUuid } = require('uuidv4');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
/** 
  A linha abaixo aplica o midlleware para todas as rotas iniciadas
  por /projects/:id (Alteração e deleção).
  Com ela poderia ser retirado o nome da função dos métodos put e delete
*/
app.use('/users/:id', validateUserId);

const users = [];

// Função que mostra logs para exemplificar midlleware
function logRequests(request, response, next) {
  const {method, url} =request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);

  next();

}

app.use(logRequests); // Chama a função (midlleware) logRequests

function validateUserId(request, response, next){
  const { id } = request.params;

  if (!isUuid(id)) 
     return (response.status(400).json({ error: 'Invalid user ID. (Middleware)' }));

  return next();

}

// Listagem de usuários
app.get('/users', (request, response) => {
  const { name, email } = request.query;

  // Filtro (Query inserida no insomnia) por name
  results = name ?
    users.filter(user => user.name.includes(name)) :
    users;

  // Filtro (Query inserida no insomnia) por email
  results = email ?
    results.filter(user => user.email.includes(email)) :
    results;

  return response.json(results);
});

// Inclusão de usuários
app.post('/users', (request, response) => {
  const { name, email } = request.body;
  const id = uuid();

  const user = { id, name, email };
  users.push(user);

  return response.json(user);
});

// Alteração de usuários
app.put('/users/:id', validateUserId, (request, response) => {
  const { id } = request.params;
  const { name, email } = request.body;

  userIndex = users.findIndex(user => user.id === id);

  if (userIndex < 0) {
    return response.status(400).json({ error: 'User not Found'});
  }

  const user = { id, name, email };

  users[userIndex] = user;

  return response.json(user);
});

// Deleção de usuários
app.delete('/users/:id', validateUserId, (request, response) => {
  const { id } = request.params;

  userIndex = users.findIndex(user => user.id === id);

  if (userIndex < 0) {
    return response.status(400).json({ error: 'User not Found'});
  }

  users.splice(userIndex, 1);

  return response.json({ 'delete': 'Successfully' });

});

app.listen(3333, () => {
  console.log('Servidor iniciado.')
});