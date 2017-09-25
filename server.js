// server.js
const net = require('net');
const port = 8124;
var seed = 0;
const server = net.createServer(function(client){

client.setEncoding('utf8');
client.id = Date.now() + seed++;

console.log(' +++ '+'Client-'+ client.id);

client.on('data', (data) => {
    console.log(data);
client.write('Hello - '+client.id);
});

client.on('end', () => console.log(' --- '+'Client-' + client.id));
});
server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
});