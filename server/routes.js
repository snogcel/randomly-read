const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const bodyParser = require('body-parser');
const schema = require ('./data/schema');
const users = require('./controllers/users');
const posts = require('./controllers/posts');
const admin = require('./controllers/admin');
const routine = require('./controllers/routine');
const superuser = require('./controllers/superuser');
const viewHistory = require('./controllers/viewHistory');
const interaction = require('./controllers/interaction');
const interactions = require('./controllers/interactions'); // TODO - Remove
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


router.post('/interactions', [jwtAuth, interactionAuth], interactions.create);  // TODO - Remove
router.get('/interactions', interactions.list);  // TODO - Remove
router.get('/interactions/day', interactions.listby24hrs); // TODO - Remove
router.get('/interactions/week', interactions.listbyWeek); // TODO - Remove
router.get('/interactions/month', interactions.listbyMonth); // TODO - Remove
router.get('/interactions/3months', interactions.listby3Months); // TODO - Remove

// User Administration
router.post('/admin/users', admin.createUser); // TODO - add auth token?
router.get('/admin/users', admin.users); // TODO - add auth token?
router.get('/admin/users/:id', admin.user); // TODO - add auth token?
router.patch('/admin/users/:id', admin.updateUser); // TODO - add auth token?

// Superuser Administration
router.post('/admin/superusers', admin.createSuperUser); // TODO - add auth token + can probably just user standard user function?
router.get('/admin/superusers', admin.superUsers); // TODO - add auth token
router.get('/admin/superusers/:id', admin.superUser); // TODO - add auth token + can probably just user standard user function?
router.patch('/admin/superusers/:id', admin.updateSuperUser); // TODO - add auth token + can probably just user standard user function?

// Routine Administration
router.post('/admin/routines', admin.createRoutine); // TODO - add auth token?
router.get('/admin/routines', admin.routines); // TODO - add auth token?
router.get('/admin/routines/:id', admin.routine); // TODO - add auth token?
router.patch('/admin/routines/:id', admin.updateRoutine); // TODO - add auth token?
router.delete('/admin/routines/:id', admin.deleteRoutine); // TODO - add auth token?

// Interaction Administration
router.post('/admin/interactionSettings', admin.createInteractionSetting); // TODO - add auth token
router.get('/admin/interactionSettings', admin.interactionSettings); // TODO - add auth token
router.get('/admin/interactionSettings/:id', admin.interactionSetting); // TODO - add auth token
router.patch('/admin/interactionSettings/:id', admin.updateInteractionSetting); // TODO - add auth token
router.delete('/admin/interactionSettings/:id', admin.deleteInteractionSetting); // TODO - add auth token

// Test Routes
router.get('/admin/testRoutine', routine.testCreate);
router.get('/admin/testInteractionSetting', admin.interactionSettingsTestCreate);


// TODO - implement superuser auth / validation
// Superuser Functions
router.post('/superuser/users', [jwtAuth, superuser.validate('register')], superuser.createUser); // create new client user
router.get('/superuser/users', jwtAuth, superuser.users); // get client users
router.get('/superuser/users/:id', jwtAuth, superuser.user); // get client user details
router.patch('/superuser/users/:id', [jwtAuth, superuser.validate()], superuser.updateUser); // update user details

router.post('/superuser/routines', jwtAuth, superuser.createRoutine); // create new routine
router.get('/superuser/routines/:id', jwtAuth, superuser.routines); // fetch routine settings by userId
router.delete('/superuser/routines/:userId/:routineId', jwtAuth, superuser.deleteRoutine); // delete specified routine and remove from User

// Statistics
router.get('/history/words/:id/start/:start/end/:end', jwtAuth, viewHistory.list); // fetch word view statistics

// Routine Settings
router.get('/settings/routines', jwtAuth, routine.settings); // fetch current user routine settings

// Interaction Settings
router.get('/settings/interactions', jwtAuth, interaction.settings); // fetch current user interaction settings

// Interactions
router.post('/interaction', [jwtAuth, interactionAuth], interaction.create); // Apply this auth method to other admin routes
router.get('/interaction', [jwtAuth, interactionAuth], interaction.list);
router.delete('/interaction/:id', [jwtAuth, interactionAuth], interaction.delete);


module.exports = app => {

  app.disable('etag');

  app.use('/api', router);

  app.use('/graphql', jwtAuth, graphqlExpress((req) => ({ schema, context: {user: req.user} })));

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
