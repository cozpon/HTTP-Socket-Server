// jshint esversion:6
let PORT = process.env.PORT || 8080;
const net = require('net');

const clientConnection = new net.connect(PORT, function(){
  console.log(`connected to server, ${PORT}` );
  let notifier = process.argv[2];
  clientConnection.on('data', function(data){
    console.log(data.toString());
  });

  if(notifier === undefined){
    console.log(`Yo daddio, you forgot to put in an argument.
Try writing localhost:8080/index.html or something!`);
  }
  else {
    let directLink = notifier.split('/');
    let host = directLink[0];
    let uri = directLink[1];
    let date = `Date: ${new Date().toUTCString()}`;

    if(notifier.includes('-')){
      let headLink = process.argv[3];
      let headDirectLink = headLink.split('/');
      let headURI = headDirectLink[1];

      clientConnection.write(`HEAD /${headURI} HTTP/1.1
Host: ${headDirectLink[0]}
User-Agent: Ricky/2.0.4
Accept: */*

`);
      // I WANT HEADER
    } else if(notifier.includes('/')){
      // I'm a URL and have a URI
      clientConnection.write(`GET /${uri} HTTP/1.1
User-Agent: Ricky/2.0.4
Accept: */*
Host: ${host}/${uri}
Connection: Keep-Alive
Content-Length: 26`);
    }
    else{
      // I'm just a boring URL with nothing else
      clientConnection.write(`GET / HTTP/1.1
User-Agent: Ricky/2.0.4
Accept: */*
Host: ${host}
Connection: Keep-Alive`);
    }

  }




});

