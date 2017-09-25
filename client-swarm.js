const pr = require('child_process');
const count = process.argv[2];
for(let i = 0; i < count; i++)
{
    pr.exec('node client.js',function (err) {
        if(err) console.log(err);
    });
}