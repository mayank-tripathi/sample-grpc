const { getMessageFromB, getMessageFromC } = require("./client");

const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

function getMessage(_call, callback) {
  console.log('getMessage invoked!');
  callback(null, { message: lorem.generateWords(1) });
}

function getAllMessages(_call, callback) {
  console.log('getAllMessages invoked!');
  const messageB = getMessageFromB();
  const messageC = getMessageFromC();

  messageB.then(valb => {
    messageC.then(valc => {
      callback(null, { message: `${lorem.generateWords(1)} ${valb} ${valc}` });
    }).catch((err) => {
      if (err) {
        console.log('Promise rejected when getting message from Service C')
        console.log(err)
      }
    })
  }).catch((err) => {
    if (err) {
      console.log('Promise rejected when getting message from Service B')
      console.log(err)
    }
  })
}

module.exports = {
  getMessage,
  getAllMessages
}