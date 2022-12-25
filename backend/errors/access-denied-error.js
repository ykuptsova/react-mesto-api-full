const { DENIED } = require('../utils/status-codes');

class AccessDeniedError extends Error {
  constructor(message) {
    super(message || 'Отказано в доступе');
    this.statusCode = DENIED;
  }
}

module.exports = AccessDeniedError;
