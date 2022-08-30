const { getMessageGeneratorClient, getMessageFromB, getMessageFromC } = require('./app/client');

function getMessageFromA() {
  const client = getMessageGeneratorClient('message-a.proto', process.env.PORT ? `localhost:${process.env.PORT}` : 'localhost:8081');

  return new Promise((resolve, reject) => {
    client.GetAllMessages({}, function(err, response) {
      if (err) {
        reject(err);
      }
      resolve(response.message);
    });
  });
}

function main() {
  const b = getMessageFromB()
  b.then((value) => {
    console.log(value);
  });

  const c = getMessageFromC()
  c.then((value) => {
    console.log(value);
  });

  const a = getMessageFromA()
  a.then((value) => {
    console.log(value);
  });
}

main();