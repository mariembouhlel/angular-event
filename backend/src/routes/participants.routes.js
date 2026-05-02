module.exports = app => {
  const participants = require('../controllers/participants.controller.js');

  const router = require('express').Router();

  router.post('/', participants.create);
  router.get('/', participants.findAll);
  router.get('/:id', participants.findOne);
  router.put('/:id', participants.update);
  router.delete('/:id', participants.delete);

  app.use('/api/participants', router);
};