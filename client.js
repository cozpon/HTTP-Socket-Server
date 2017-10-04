// jshint esversion:6
let PORT = process.env.PORT || 8080;
console.log("yo daddio");
const net = require('net');



const options = {
  port: 8080,
  host: 'localhost'
};
const clientConnection = new net.connect(options, function(){
  console.log(`connected to server, ${PORT}` );
  let allArgs = process.argv[2];
  console.log(process.argv[2], "HEYEYE");

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
