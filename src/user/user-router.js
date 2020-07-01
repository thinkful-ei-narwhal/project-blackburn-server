const express = require('express');
const path = require('path');
const UserService = require('./user-service');
const { requireAuth } = require('../middleware/jwt-auth');

const userRouter = express.Router();
const jsonBodyParser = express.json();

userRouter
  .post('/', jsonBodyParser, async (req, res, next) => {
    const { password, username, avatar } = req.body;

    for (const field of ['username', 'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`,
        });

    try {
      const passwordError = UserService.validatePassword(password);

      if (passwordError) return res.status(400).json({ error: passwordError });

      const hasUserWithUserName = await UserService.hasUserWithUserName(
        req.app.get('db'),
        username
      );

      if (hasUserWithUserName)
        return res.status(400).json({ error: `Username already taken` });

      const hashedPassword = await UserService.hashPassword(password);

      const newUser = {
        username,
        password: hashedPassword,
        avatar,
      };

      const user = await UserService.insertUser(req.app.get('db'), newUser);

      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${user.id}`))
        .json(UserService.serializeUser(user));
    } catch (error) {
      next(error);
    }
  })
  .patch('/edit', requireAuth, jsonBodyParser, (req, res, next) => {
    const { username, avatar } = req.body;
    const updateUser = { username, avatar };

    for (const [key, value] of Object.entries(updateUser))
      if (value === null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`,
        });
    updateUser.id = req.user.id;
    console.log('hello', updateUser.id, req.user.id);
    UserService.updateUser(req.app.get('db'), req.user.id, updateUser)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch(next);
  });

module.exports = userRouter;
