// jshint esversion:6
let PORT = process.env.PORT || 8080;
//whatever is in the environment variable PORT, or 8080;
const net = require('net'); // load TCP library
const fs = require('fs');
const server = net.createServer((request) => {

  request.on('data', (data) => {
    let dataInput = data.toString();
    let splitData = dataInput.split(`\n`);
    console.log(splitData);
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



