const { NOT_FOUND } = require('../utils/status-codes');

class NotFoundError extends Error {
  constructor(message) {
    super(message || 'Ресурс не найден');
    this.statusCode = NOT_FOUND;
  }
}

module.exports = NotFoundError;
