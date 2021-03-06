const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { json } = require("body-parser");
const cors = require("cors");

const { config } = require("./config");
const { errorMiddleware } = require("./middlewares");
const { userRouter } = require("./routes");
const { trackRouter } = require("./routes/track-routes");
const { searchRouter } = require("./routes/search-routes");
const { playlistRouter } = require("./routes/playlist-routes");

const app = express();

app.use(express.static("resources"));
app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(
  cors({
    origin: config.client.url,
  }),
);

app.use(userRouter);
app.use(trackRouter);
app.use(searchRouter);
app.use(playlistRouter);

app.use(errorMiddleware);

module.exports = {
  app: app,
};
