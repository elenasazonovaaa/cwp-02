// server.js
const net = require('net');
const fs = require('fs');

const port = 8124;
var seed = 0;

let questions = [];
let correct = [];
let incorrect = [];

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
               getJSON();
       }
   }
});
client.on('data',function (data,err) {
    if(err) console.log('Error in get data-2');
    else
    {
        if(data !== 'QA')
        {
            let flag = false;
            for(let i = 0; i < questions.length; i++)
            {
                if(questions[i] === data)
                {
                    if(Date.now()%2 === 0)
                    {
                        client.write(correct[i].toString());
                    }
                    else
                    {
                        client.write(incorrect[i].toString());
                    }
                    flag = true;
                }
            }
            if(!flag) client.write('DSC');
        }
    }
});


client.on('end', function(){
    if(client.id === undefined) console.log(' --- '+'no connect for Client');
    else console.log(' --- '+'Client-' + client.id);} );
});

server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
});

function getJSON()
{
    fs.readFile('qa.json',function (err,data) {
        if(err) console.log('Error in read JSON');
        else
        {
            let json = JSON.parse(data);
            for(let i = 0; i < json.length;i++)
            {
                questions[i] = json[i].question;
                correct[i] = json[i].correct;
                incorrect[i] = json[i].incorrect;
            }
        }
    })
}
