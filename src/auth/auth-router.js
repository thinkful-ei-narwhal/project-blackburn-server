const express = require("express");
const AuthService = require("./auth-service");
const { requireAuth } = require("../middleware/jwt-auth");

const authRouter = express.Router();
const jsonBodyParser = express.json();

authRouter
  .route("/token")
  .post(jsonBodyParser, async (req, res, next) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    const loginUser = { username: username, password: password };

    for (const [key, value] of Object.entries(loginUser))
      if (value == null)
        return res.status(400).json({
          error: `Missing ${key} in request body`,
        });

    try {
      const dbUser = await AuthService.getUserWithUserName(
        db,
        loginUser.username
      );

      if (!dbUser)
        return res.status(400).json({
          error: "Incorrect username or password",
        });

      const compareMatch = await AuthService.comparePasswords(
        loginUser.password,
        dbUser.password
      );

      if (!compareMatch)
        return res.status(400).json({
          error: "Incorrect username or password",
        });

      const sub = dbUser.username;
      const av = dbUser.avatar;
      const payload = {
        user_id: dbUser.id,
        avatar: av,
      };
      res.send({
        authToken: AuthService.createJwt(sub, payload),
      });
    } catch (error) {
      next(error);
    }
  })

  .put(requireAuth, (req, res) => {
    const sub = req.user.username;

    const payload = {
      user_id: req.user.id,
    };
    res.send({
      authToken: AuthService.createJwt(sub, payload),
    });
  });

module.exports = authRouter;
