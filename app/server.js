const { Server, ServerCredentials } = require('@grpc/grpc-js');
const { getMessageGeneratorProto } = require('./proto');
const path = require('path');
const fs = require('fs');

function startServer(port, serviceConfig, protoUri) {
  try {
    const messageProto = getMessageGeneratorProto(protoUri);
    const server = new Server();
    server.addService(messageProto.MessageGenerator.service, serviceConfig);
    server.bindAsync(`0.0.0.0:${port}`, ServerCredentials.createInsecure(), () => {
      try {
        server.start();
        console.log(`Server started and is accessible on address: grpc://localhost:${port}`);
      } catch (error) {
        console.log(error)
      }
    });
  } catch (e) {
    console.log(e);
  }
}

function startSecureServer(port, serviceConfig, protoUri) {
  try {
    const certsDir = path.join(__dirname, '..' ,'certs');
    const sslConfig = [
      {
        private_key: fs.readFileSync(
        path.join(
         certsDir,
         "tls.key"
        )
       ),
       cert_chain: fs.readFileSync(
        path.join(
         certsDir,
         "tls.crt"
        )
       )
      }
    ];
    const messageProto = getMessageGeneratorProto(protoUri);
    const server = new Server();
    server.addService(messageProto.MessageGenerator.service, serviceConfig);
    server.bindAsync(`0.0.0.0:${port}`, ServerCredentials.createSsl(null, sslConfig, false), () => {
      try {
        server.start();
        console.log(`Server started and is accessible on address: grpc://localhost:${port}`);
      } catch (error) {
        console.log(error)
      }
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  startServer,
  startSecureServer
}