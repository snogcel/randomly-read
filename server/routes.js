const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const bodyParser = require('body-parser');
const schema = require ('./data/schema');
const users = require('./controllers/users');
const posts = require('./controllers/posts');
const admin = require('./controllers/admin');
const routine = require('./controllers/routine');
const interactions = require('./controllers/interactions');
const comments = require('./controllers/comments');
const { jwtAuth, postAuth, commentAuth, interactionAuth } = require('./auth');
const router = require('express').Router();

router.post('/login', users.validate(), users.login);
router.post('/register', users.validate('register'), users.register);

router.param('post', posts.load);
router.get('/posts', posts.list);
router.get('/posts/:category', posts.listByCategory);
router.get('/post/:post', posts.show);
router.post('/posts', [jwtAuth, posts.validate], posts.create);
router.delete('/post/:post', [jwtAuth, postAuth], posts.destroy);
router.get('/post/:post/upvote', jwtAuth, posts.upvote);
router.get('/post/:post/downvote', jwtAuth, posts.downvote);
router.get('/post/:post/unvote', jwtAuth, posts.unvote);
router.get('/user/:user', posts.listByUser);
router.param('comment', comments.load);
router.post('/post/:post', [jwtAuth, comments.validate], comments.create);
router.delete('/post/:post/:comment', [jwtAuth, commentAuth], comments.destroy);
router.post('/interactions', [jwtAuth, interactionAuth], interactions.create);
router.get('/interactions', interactions.list);
router.get('/interactions/day', interactions.listby24hrs);
router.get('/interactions/week', interactions.listbyWeek);
router.get('/interactions/month', interactions.listbyMonth);
router.get('/interactions/3months', interactions.listby3Months);

router.get('/admin/users', admin.users); // TODO - add auth token
router.get('/admin/users/:id', admin.user); // TODO - add auth token
router.patch('/admin/users/:id', admin.updateUser); // TODO - add auth token

router.get('/admin/routines', admin.routines); // TODO - add auth token
router.get('/admin/routines/:id', admin.routine); // TODO - add auth token

router.get('/admin/testRoutine', routine.testCreate);

module.exports = app => {
  app.use('/api', router);

  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

  app.get('*', (req, res) => {
    res.status(404).json({ message: 'not found' });
  });

  app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
      return res.status(400).json({ message: 'bad request' });
    }
    next(err);
  });
};
