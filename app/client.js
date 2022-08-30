const { credentials } = require('@grpc/grpc-js');
const { getMessageGeneratorProto } = require('./proto');

function getMessageGeneratorClient(protoUri, serverUri) {
  try {
    const messageProto = getMessageGeneratorProto(protoUri);
    return new messageProto.MessageGenerator(serverUri || 'localhost:8081', credentials.createInsecure());
  } catch (error) {
    console.log('Function: getMessageGeneratorClient()');
    console.log(error);
  }
}

function getMessageFromOtherClients(protoUri, serverUri) {
  const client = getMessageGeneratorClient(protoUri, serverUri);

  try {
    return new Promise((resolve, reject) => {
      client.GetMessage({}, function(err, response) {
        if (err) {
          console.log('Promise Rejected when getting the message:');
          console.log(err);
          reject(err);
        }
        resolve(response.message);
      });
    });
  } catch (error) {
    console.log('Function: getMessageFromOtherClients()');
    console.log(error);
  }
}

function getMessageFromB() {
  console.log('getMessageFromB() invoked!');
  return getMessageFromOtherClients('message-b-c.proto', process.env.SERVICEBURI ? `${process.env.SERVICEBURI}:80` : 'localhost:8082');
}

function getMessageFromC() {
  console.log('getMessageFromC() invoked!');
  return getMessageFromOtherClients('message-b-c.proto', process.env.SERVICECURI ? `${process.env.SERVICECURI}:80` : 'localhost:8083');
}



module.exports = {
  getMessageFromB,
  getMessageFromC,
  getMessageGeneratorClient
}