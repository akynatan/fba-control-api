"use strict";

require("reflect-metadata");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

require("express-async-errors");

var _celebrate = require("celebrate");

var _routes = _interopRequireDefault(require("./routes"));

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _AppError = _interopRequireDefault(require("../../errors/AppError"));

var _RateLimiter = _interopRequireDefault(require("./middlewares/RateLimiter"));

require("../typeorm");

require("../../container");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use('/files', _express.default.static(_upload.default.uploadsFolder));
app.use(_RateLimiter.default);
app.use(_routes.default);
app.use((0, _celebrate.errors)());
app.use((err, request, response, _) => {
  if (err instanceof _AppError.default) {
    return response.status(err.statusCode).json({
      status: 'error',
      error: err.message
    });
  }

  console.error(err);
  return response.status(500).json({
    status: 'error',
    error: 'Internal server error.'
  });
});
app.listen(4444, () => {
  console.log('Server started on port 4444!');
});