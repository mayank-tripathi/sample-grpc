const { getAllMessages, getMessage } = require('./app/messages');
const { startServer } = require('./app/server');

startServer(process.env.PORT || 8081, { getMessage, getAllMessages }, 'message-a.proto');