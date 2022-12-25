const { CODE_CONFLICT } = require('../utils/status-codes');

class ConflictError extends Error {
  constructor(message) {
    super(message || 'Пользователь с таким email уже существует');
    this.statusCode = CODE_CONFLICT; // 409
  }
}

module.exports = ConflictError;
