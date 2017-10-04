// jshint esversion:6
let PORT = process.env.PORT || 8080;
const net = require('net');

const clientConnection = new net.connect(PORT, function(){
  console.log(`connected to server, ${PORT}` );
  let notifier = process.argv[2];

  if(notifier === undefined){
    console.log("Yo daddio, you forgot to put in an argument.\nTry localhost:8080/index.html or something!");
  }
  else {
    let directLink = notifier.split('/');
    let host = directLink[0];
    let uri = directLink[1];
    let date = `Date: ${new Date().toUTCString()}`;

    if(notifier.includes('-')){
      clientConnection.write("yo u want the header?");
      // I WANT HEADER
    } else if(notifier.includes('/')){
      // I'm a URL and have a URI
      clientConnection.write(`Host: ${host}/${uri}\nConnection: Keep-Alive\nAccept: text/html, application/json\n${date}`);
    }
    else{
      // I'm just a boring URL with nothing else
      clientConnection.write(`Host: ${host}\nConnection: Keep-Alive\nAccept: text/html, application/json\n${date}`);
    }

  }




  clientConnection.on('data', function(data){
    console.log(" HEY ");

  });

  //clientConnection.end();

});




// POST /apply HTTP/1.1
// Host: localserver:8080/
// Connection: Keep-Alive
// Accept: text/html, application/json
// Content-Length: 278



// if first character is '-' that's a flag that it's -I and wants header
// otherwise it wants a URL and should listen for that.