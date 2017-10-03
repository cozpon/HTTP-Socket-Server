// jshint esversion:6
let PORT = process.env.PORT || 8080;
//whatever is in the environment variable PORT, or 8080;
const net = require('net'); // load TCP library
const fs = require('fs');


    // HTTP 200 OK
    // SERVER
    // DATE
    // CONTENT-TYPE
    // CONTENT-LENGTH
    // CONNECTION
    // empty space

    // HTML

const header = function(file, method, ok, date, contentType, connection){
  fs.readFile(file, (err, data) => {
    let dataString = data.toString();
    process.stdout.write(`\n${method}${ok}\n${date}\nContent-Type: ${contentType}\nContent-Length: ${dataString.length}\nConnection: ${connection}\n\n${dataString}`);
  });
};


const server = net.createServer((request) => {
  request.on('data', (data) => {
    let dataRequest = data.toString();

    let splitData = dataRequest.split(`\n`);
    let httpArray = splitData[0].split(' ');

    let requestArray = httpArray[0].split(' ');

    // console.log("REQUEST", httpArray[1]);
    let method = httpArray[0]; // returns GET or POST or SEND.. the METHOD
    let path = httpArray[1]; // returns the ULI
    let spec = httpArray[2]; // returns HTML + version
    let ok = ' 200 OK'; // hard coded OK
    let errorNotFound = ' 404 Not Found'; // hard coded error
    let date = `Date: ${new Date().toUTCString()}`; // gets date of request
    let htmlFile = 'text/html; charset=utf-8'; // hard code HTML file
    let connType = 'keep-alive';  // hard code connection type


    if (method === 'HEAD' || method === 'GET'){
      console.log(path, "PATH IS HERE");
      switch (path) {
        case '/':
          header('index.html', method, ok, date, htmlFile, connType);
          break;
        case '/index.html':
          header('index.html', method, ok, date, htmlFile, connType);
          break;
        case '/helium.html':
          header('helium.html', method, ok, date, htmlFile, connType);
          break;
        case '/hydrogen.html':
          header('hydrogen.html', method, ok, date, htmlFile, connType);
          break;
        case 'styles.css':
          header('styles.css', method, ok, date, htmlFile, connType);
          break;
        default:
          header('404.html', method, errorNotFound, date, htmlFile, connType);
      }
    } else header('404.html', method, errorNotFound, date, htmlFile, connType);

  request.end();
  });
});

server.listen(PORT, () => {
  console.log(`ServerBound, ${PORT}`, "daddio!");
  });


