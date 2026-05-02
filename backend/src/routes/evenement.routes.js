module.exports = app => {
const evenements = require('../controllers/evenement.controller.js');

  const router = require('express').Router();

  router.post('/', evenements.create);
  router.get('/', evenements.findAll);
  router.get('/:id', evenements.findOne);
  router.put('/:id', evenements.update);
  router.delete('/:id', evenements.delete);

  app.use('/api/evenements', router);
};