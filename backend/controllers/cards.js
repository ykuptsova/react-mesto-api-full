const Card = require('../models/card');

const NotFoundError = require('../errors/not-found-error');
const AccessDeniedError = require('../errors/access-denied-error');
const BadRequestError = require('../errors/bad-request-error');
const { CREATED } = require('../utils/status-codes');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card
    .create({
      name, link, owner,
    })
    .then((user) => res.status(CREATED).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError());
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findOne({ _id: req.params.cardId })
    .then((card) => {
      if (!card) {
        next(new NotFoundError());
        return;
      }
      if (card.owner.toString() !== req.user._id) {
        next(new AccessDeniedError());
        return;
      }
      Card
        .findByIdAndRemove(req.params.cardId)
        .then((deletedCard) => res.send({ data: deletedCard }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError());
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      // добавить _id в массив, если его там нет
      { $addToSet: { likes: req.user._id } },
    )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new NotFoundError();
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(''));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      // убрать _id из массива
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true },
    )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new NotFoundError();
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(''));
      } else {
        next(err);
      }
    });
};
