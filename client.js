// jshint esversion:6
let PORT = process.env.PORT || 8080;
const net = require('net');

const server = new net.Socket();
server.connect(PORT, () => {
console.log(`connectedtoServer, ${PORT}`, "daddio!");
  process.stdin.pipe( server );
  server.pipe( process.stdout );
});
