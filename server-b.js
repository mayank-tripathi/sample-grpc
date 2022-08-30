const { getMessage } = require('./app/messages');
const { startServer } = require('./app/server');

startServer(process.env.PORT || 8082, { getMessage }, 'message-b-c.proto');