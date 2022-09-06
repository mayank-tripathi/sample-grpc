const { getMessageGeneratorClient } = require('./app/client');

function getMessageFromA() {
  const client = getMessageGeneratorClient('message-a.proto', process.env.PORT ? `localhost:${process.env.PORT}` : serverUri);

  return new Promise((resolve, reject) => {
    client.GetAllMessages({}, function(err, response) {
      try {
        if (err) {
          reject(err);
        }

        console.log('Error:', err);
        console.log('\n\n', "---------------", "\n\n");
        console.log(JSON.stringify(response));
        console.log('\n\n', "---------------", "\n\n");
        
        resolve(response.message);
      } catch (error) {
        console.log("Error Caught:", error)
        reject(error);
      }
    });
  });
}

function main() {
  const a = getMessageFromA()
  a.then((value) => {
    console.log(value);
  });
}

const lastArg = process.argv[process.argv.length - 1];
const serverUri = lastArg.lastIndexOf('test.js') > -1 ? 'localhost:8081' : lastArg;

main();