const { BAD_REQUEST } = require('../utils/status-codes');

class BadRequestError extends Error {
  constructor(message) {
    super(message || 'Переданы некорректные данные');
    this.statusCode = BAD_REQUEST;
  }
}

module.exports = BadRequestError;
