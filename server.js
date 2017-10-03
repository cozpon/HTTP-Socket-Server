// jshint esversion:6
let PORT = process.env.PORT || 8080;
//whatever is in the environment variable PORT, or 8080;
const net = require('net'); // load TCP library
const fs = require('fs');

class Header{
  constructor(method, url, http, accept, host, connection, contentType, contentLength){
    this.method = method,
    this.url = url,
    this.http = http,
    this.host = host,
    this.connection = connection,
    this.contentType = contentType,
    this.contentLength = contentLength;
  }
}


const server = net.createServer((request) => {
  request.on('data', (data) => {

    let dataInput = data.toString();
    let splitData = dataInput.split(`\n`);
    let methodRequest = splitData[0];
    let methodGetter = splitData[0].split(' ');
    let method = methodGetter[0].split(' '); // returns GET or POST or SEND.. the METHOD
    let ULI = methodGetter[1]; // returns the ULI
    let http = methodGetter[2].split(' '); // returns HTML + version
    let host = splitData[5].split(' ');
    let connection = splitData[7].split(' ');
    console.log(ULI);

    if (ULI === '/helium.html' || ULI === '/Helium.html'){
      let ULI = '/helium.html';
      let headerObj = new Header(method, ULI, http, host, connection);
      console.log(headerObj, "EHHHEHHHEHHH");
    }

  // fs.readFile('/helium.html', (err, data) => {
  //       if (err) throw err;
  //       console.log(data);
  //       });

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



