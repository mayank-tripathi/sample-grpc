const { loadPackageDefinition } = require('@grpc/grpc-js');
const { loadSync } = require('@grpc/proto-loader');
const path = require('path');
const baseProtoPath = path.join(__dirname, '..', 'proto');

function getMessageGeneratorProto(protoFile) {
  const protoPath = path.join(baseProtoPath, protoFile);
  const packageDefinition = loadSync(
    protoPath,
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
  });
  return loadPackageDefinition(packageDefinition).messageGenerator;
}

module.exports = {
  getMessageGeneratorProto
}