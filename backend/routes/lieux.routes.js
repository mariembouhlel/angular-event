module.exports = app => {
  const lieux = require('../controllers/lieux.controller.js');

  const router = require('express').Router();

  router.post('/', lieux.create);
  router.get('/', lieux.findAll);
  router.get('/:id', lieux.findOne);
  router.put('/:id', lieux.update);
  router.delete('/:id', lieux.delete);

  app.use('/api/lieux', router);
};
