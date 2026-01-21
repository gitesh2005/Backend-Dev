const fs = require('fs');
const os = require('os');

setInterval(() => {
    const info = `
    CPU: ${os.cpus()[0].model}
    Platform: ${os.platform()}
    Free memory: ${os.freemem()}
    Total memory: ${os.totalmem()}
    Time: ${new Date()}`;

    fs.appendFile('system.log' , info , (err) => {
        if(err) console.log(err);

    });

}, 5000);