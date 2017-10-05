// jshint esversion:6
let PORT = process.env.PORT || 8080; //whatever is in the environment variable PORT, or 8080;
const net = require('net');
const fs = require('fs');

const header = function(request, details, isHeadRequest){
  fs.readFile(`./${details.template}`, (err, data) => {
    let dataString = data.toString();
    let responseString = `${details.spec}${details.response}
${details.server}
${details.date}
Content-Type: ${details.htmlFile}
Content-Length: ${dataString.length}
Connection: ${details.connection}

`;

    if(!isHeadRequest) {
      responseString+=dataString;
    }
    console.log(responseString);

    request.write(responseString, () => {
      console.log("close connection");
      request.end();
    });
  });
};

const server = net.createServer((request) => {
  request.on('data', (data) => {
    let dataRequest = data.toString();
    let splitData = dataRequest.split(`\r\n`);
    let httpArray = splitData[0].split(' ');
    let path = httpArray[1];

    const reqDetails = {};

    reqDetails.template = '';
    reqDetails.spec = httpArray[2]; // returns HTTP/1.1
    reqDetails.method = httpArray[0]; // returns GET or POST or SEND.. the METHOD
    reqDetails.date = `Date: ${new Date().toUTCString()}`; // gets date of request
    reqDetails.server = "Server: " + 'nginx/1.4.6 (Ubuntu)';
    reqDetails.response = ' 200 OK';
    reqDetails.connection = 'keep-alive';
    reqDetails.htmlFile = 'text/html; charset=utf-8';

    if (reqDetails.method === 'HEAD' || reqDetails.method === 'GET'){
      switch (path) {
        case '/':
          reqDetails.template = 'index.html';
          header(request, reqDetails, reqDetails.method === 'HEAD');
          break;
        case '/index.html':
          reqDetails.template = 'index.html';
          header(request, reqDetails, reqDetails.method === 'HEAD');
          break;
        case '/helium.html':
          reqDetails.template = 'helium.html';
          console.log("in here");
          header(request, reqDetails, reqDetails.method === 'HEAD');
          break;
        case '/hydrogen.html':
          reqDetails.template = 'hydrogen.html';
          header(request, reqDetails, reqDetails.method === 'HEAD');
          break;
        case '/styles.css':
          reqDetails.template = 'styles.css';
          reqDetails.htmlFile = 'text/css; charset=utf-8';
          header(request, reqDetails, reqDetails.method === 'HEAD');
          break;
        default:
          reqDetails.response = ' 404 Not Found';
          reqDetails.template = '404.html';
          header(request, reqDetails, reqDetails.method === 'HEAD');
      }
    }
    else {
      reqDetails.response = ' 404 Not Found';
      reqDetails.template = '404.html';
      header(request, reqDetails, reqDetails.method === 'HEAD');
    }
  });
});

server.listen(PORT, () => {
  console.log(`ServerBound, ${PORT}`, "daddio!");
});