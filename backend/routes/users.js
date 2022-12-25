const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const auth = require('../middlewares/auth');
const { LINK } = require('../utils/regex');
const {
  getUsers, getUser, getUserInfo, updateProfile, updateAvatar,
} = require('../controllers/users');

router.use(auth);

router.get('/', getUsers);

router.get('/me', getUserInfo);

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().length(24).hex(),
    }),
  }),
  getUser,
);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfile,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(LINK),
    }),
  }),
  updateAvatar,
);

module.exports = router;
