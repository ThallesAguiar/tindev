const express = require('express');
const userController = require('./controllers/userController');
const likeController = require('./controllers/likeController');
const dislikeController = require('./controllers/dislikeController');

const routes = express.Router();


routes.get('/users', userController.index);
routes.post('/users', userController.store);

routes.post('/users/:userId/likes', likeController.store);
routes.post('/users/:userId/dislikes', dislikeController.store);

module.exports = routes;