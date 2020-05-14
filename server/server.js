const express = require('express');
const path = require('path');
const cookieparser = require('cookie-parser');

const app = express();
const PORT = 3000;

const server = app.listen(PORT, () => console.log('listening on port 3000'));
const io = require('socket.io')(server);

const oauthController = require('./controllers/oauthController');
const sessionController = require('./controllers/sessionController');

const apiRouter = require('./routes/api');
const algoRouter = require('./routes/algos');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

// boiler plate to get everything working.
io.on('connection', (socket) => {
  console.log('WORK PLEASE');
  console.log(socket.id);
  socket.send(socket.id);
  socket.broadcast.emit('user connected');
});

io.use((socket, next) => {
  const token = socket.handshake.query.token;
  if (token) {
    return next();
  }
  return next(new Error('authentication error'));
});

// then
io.on('connection', (socket) => {
  const token = socket.handshake.query.token;
});

io.on('message', (socket) => {
  console.log('received the message from html');
  socket.broadcast.emit(
    'broadcasting that the server received the fucking incoming data',
  );
});
// production variable to ensure /build file is used when in production mode

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
}
//  Oauth flow for github
app.get(
  '/callback',
  oauthController.getGithubToken,
  oauthController.getUser,
  sessionController.createSession,
  (req, res) => {
    if (process.env.NODE_ENV === 'development') {
      // console.log("WE ARE IN DEV ENVIRONMENT")
      res.redirect('localhost:8080');
    } else {
      res.sendFile(path.join(__dirname, '../index.html'));
    }
  },
);

// end of production mode stuff.

// used to check the user's JWT.

app.get('/verify', sessionController.verify, (req, res) => {
  res.status(200).send();
});

//  all interactions with postgresql go through our API router
app.use('/api', apiRouter);

app.use('/algos', algoRouter);
//  generic error handler
app.use('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Error Handler
app.use(function (err, req, res, next) {
  const defaultErr = {
    log: `'MIDDLEWARE ERROR', ${err}`,
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  res.status(errorObj.status).send(JSON.stringify(errorObj.message));
});

module.exports = app;
