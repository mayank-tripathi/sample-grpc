const { getAllMessages, getMessage } = require('./app/messages');
const { startSecureServer, startServer } = require('./app/server');

startSecureServer(process.env.PORT || 8081, { getMessage, getAllMessages }, 'message-a.proto');
// startServer(process.env.PORT || 8081, { getMessage, getAllMessages }, 'message-a.proto');