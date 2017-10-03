// jshint esversion:6
let PORT = process.env.PORT || 8080;
//whatever is in the environment variable PORT, or 8080;
const net = require('net'); // load TCP library
const fs = require('fs');


const server = net.createServer((request) => {
  request.on('data', (data) => {
    let dataInput = data.toString();
    let splitData = dataInput.split(`\n`);


    let methodRequest = splitData[0];
    let methodGetter = splitData[0].split(' ');
    let method = methodGetter[0].split(' ' ); // returns GET or POST or SEND.. the METHOD
    let ULI = methodGetter[1].split(' ' ); // returns the ULI
    let http = methodGetter[2].split(' '); // returns HTML + version
    console.log(splitData);

      request.write('data', (data) => {
        console.log(method + " " + ULI + " " + http);
      });
    });

  request.on('end', () => {
    console.log('Client disconnected');
  });

});



server.on('error', (err) => {
    console.log("Error in http domain:" + err);
    throw err;
  });
server.listen(PORT, () => {
  console.log(`ServerBound, ${PORT}`, "daddio!");
  });



