const express = require('express');
const cors = require('cors');
const { verify } = require('jsonwebtoken');

const NOTIFY_ROUTER = require('./routes/notify');

const { SECRETS } = require('./config');

const createServer = (client) => {
  const auth = (req, res, next) => {
    req.CLIENT = client;
    const { authorization } = req.headers;
    const token = authorization && authorization.split(' ')[1];
    console.log(req);
    if (token !== null) {
      try {
        next();
      } catch (err) {
        return;
      }
    }
    next();
  };

  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/notify', auth, NOTIFY_ROUTER);

  app.listen(`0.0.0.0:${process.env.PORT}` || 5000, () =>
    console.log(`Server Listening on port ${process.env.PORT || 5000}..`)
  );
};

module.exports = createServer;
