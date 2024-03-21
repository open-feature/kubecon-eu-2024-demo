import { FlagdProvider } from '@openfeature/flagd-provider';
import { OpenFeature } from '@openfeature/server-sdk';
import express from 'express';
import http from 'http';
import favicon from 'serve-favicon';
import { errorHandler, indexHandler } from './handlers';

process.on('SIGINT', () => {
  console.info("SIGINT")
  process.exit(0)
})

var app = express();

// view engine setup
app.set('view engine', 'pug')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use('/', indexHandler);

app.use(function (req, res, next) {
  next();
});

// error handler
app.use(errorHandler);

OpenFeature.setLogger({ error: () => {}, warn: () => {}, info: () => {}, debug: () => {}});
OpenFeature.setProviderAndWait(new FlagdProvider({},  { error: () => {}, warn: () => {}, info: () => {}, debug: () => {}}));

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

var port = normalizePort(process.env.PORT || '3000');
server.listen(3000);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server 'listening' event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
  console.log('Listening on ' + bind);
}

/**
 * Event listener for HTTP server 'error' event.
 */
function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

function normalizePort(val: string) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
