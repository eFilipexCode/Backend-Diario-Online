const { Router } = require('express');
const routes = Router();
const userController = require('./controllers/userController.js');
const postController = require('./controllers/postControllers.js');
const loginController = require('./controllers/loginController.js');
const profileController = require('./controllers/profileController.js');

routes.post('/register', userController.store);
routes.get('/users', userController.index);
routes.post('/signin', loginController.signin);
routes.post('/profile/picture', profileController.setUserProfilePicture)

routes.post('/post', postController.store);
routes.get('/post/public', postController.indexPublic);
routes.get('/user/posts', profileController.getUserPosts);
routes.get('/user/:id', profileController.getUserData);
routes.put('/edit', postController.edit);
routes.delete('/post/:postId', postController.remove);
routes.get('/post/:id', profileController.getUniquePost);
module.exports = routes;