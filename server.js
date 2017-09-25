// server.js
const net = require('net');
const port = 8124;
var seed = 0;
const server = net.createServer(function(client){

client.setEncoding('utf8');

client.on('data', function(data,err){
   if(err) console.log(`Error in get data`);
   else
   {
       if(data === 'QA')
       {
           client.id = Date.now() + seed++;
           console.log(' +++ '+'Client-'+ client.id);
           client.write('ASC');
       }
       else client.write('DSC');
   }
});

client.on('end', function(){
    if(client.id === undefined) console.log(' --- '+'no connect for Client');
    else console.log(' --- '+'Client-' + client.id);} );
});
server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
});