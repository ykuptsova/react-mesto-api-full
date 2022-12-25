const router = require('express').Router();
const NotFoundError = require('../errors/not-found-error');

router.all('*', (req, res, next) => {
  console.log(res);
  next(new NotFoundError());
});

module.exports = router;
