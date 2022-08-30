const { getMessage } = require('./app/messages');
const { startServer } = require('./app/server');

startServer(process.env.PORT || 8083, { getMessage }, 'message-b-c.proto');