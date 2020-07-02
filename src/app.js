const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const errorHandler = require("./middleware/error-handler");
const authRouter = require("./auth/auth-router");
const userRouter = require("./user/user-router");
const scoreboardRouter = require("./scoreboard/scoreboard-router");
const storyRouter = require("./story/story-router");

const app = express();

app.use(
  morgan(NODE_ENV === "production" ? "tiny" : "common", {
    skip: () => NODE_ENV === "test",
  })
);
app.use(cors());
app.use(helmet());

app.use("/api/scoreboard", scoreboardRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/story", storyRouter);
app.use(errorHandler);

module.exports = app;
