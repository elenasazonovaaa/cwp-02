// client.js
const net = require('net');
const port = 8124;

const client = new net.Socket();
client.setEncoding('utf8');

client.connect(port, function() {
    console.log('Connected');
    client.write('QA');
});

client.on('data', function(data,err) {
    if(err) console.log('Error in get data');
    else
    {
        if(data === 'ASC')
        {
            console.log('WOW!Server ASC!');
            client.destroy();
        }
        else if(data === 'DSC')
        {
            console.log('Server DSC!');
            client.destroy();
        }
        else
        {
            console.log(':( I do not understand, Server!');
            client.destroy();
        }
    }
});

client.on('close', function() {
    console.log('Connection closed');
});