/////////////////////////////////////////////////////////////
// https://stackoverflow.com/questions/24464404/how-to-readline-infinitely-in-node-js
//
// Usage: node client.js -t <topic> -name <name>
/////////////////////////////////////////////////////////////
const readline = require('readline');
const mqtt = require('mqtt');
const client  = mqtt.connect('mqtt://localhost');

const args = process.argv.slice(2);

let topic = args[1];
let name = args[3];

// Payload/Message structure
const payload = {
  from: null,
  to: null,
  date: null,
  message: null
}

//////////////////////////////////////////////////////////
// MQTT Setup
//////////////////////////////////////////////////////////
// Connect and subscribe to topic
client.on('connect', function () {
  client.subscribe(topic, function (err) {
    if (err) {
      console.log("ERR: ", err.message);
    }
  })
})

// Handles input message from broker
client.on('message', function (topic, payload) {
  filterIncomingPayload(payload);
})

// Setup the readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Message prompt in loop.
let recursiveAsyncReadLine = function () {
  rl.question('> ', function (message) {
    // Check for exit
    switch (message) {
      case 'e':
      case 'exit':
      case 'q':
      case 'quit':
        return exit();
      default:
        break;
    }

    send(message);    // send message to broker

    recursiveAsyncReadLine();   // Calling this function again to ask new question
  });
};

recursiveAsyncReadLine(); //we have to actually start our recursion somehow

// Exit the program
let exit = () => {
  rl.close();
  client.end();
}

let console_out = (sender, msg) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write('\x1b[33m'+ sender + ': ' +'\x1b[0m');
  console.log('\x1b[36m%s\x1b[0m', msg);
  rl.prompt(true);
}

let filterIncomingPayload = (payload) => {
  // let message = JSON.parse(payload);
  let message = {};
  try {
    message = JSON.parse(payload);
  }
  catch (err) {   // unknown message.  Not JSON.  Probably from mosquitto_pub
    message.from = "unknown";
    message.to = "unknown";
    message.message = payload;
    message.date = new Date();
  }

  if(displayMessage(message)) {
    console_out(message.from, `Incoming: ${payload.toString()}`);
    console_out(message.from, `    from: ${message.from}`);
    console_out(message.from, `      to: ${message.to}`);
    console_out(message.from, `    date: ${message.date.toString()}`);
    console_out(message.from, ` message: ${message.message}`);
  }
}

// Filter out messages
const displayMessage = (msg) => {
  if(name.length > 0 && msg.from.length > 0) {
    if(name === "unknown" || name === msg.from || name === msg.to || msg.from === "unknown" || msg.to === "unknown") {
      return true;
    }
  }
  return false;
}

let send = (message) => {
  payload.from = name;
  payload.to = "unknown";
  payload.message = message;
  payload.date = new Date(); 

  client.publish(topic, JSON.stringify(payload));    // send message to broker
}
