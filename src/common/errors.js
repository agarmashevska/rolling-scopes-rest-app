class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

class WriteError extends Error {
  constructor(message) {
    super(message);
    this.name = 'WriteError';
  }
}

const createNotFoundError = message => new NotFoundError(message);
const createWriteError = message => new WriteError(message);

module.exports = {
  createNotFoundError,
  createWriteError
};
