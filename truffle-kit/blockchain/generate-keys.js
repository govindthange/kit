const wallet = require('ethereumjs-wallet');
var fs = require('fs');

var stream = fs.createWriteStream("./sample-keys.csv");

stream.once('open', function(fd) {
    stream.write(`#,private-key,address\n`)
    for (let i=0; i<7; i++) {
        const addr = wallet['default'].generate();
        const pvt = addr.getPrivateKeyString();
        const pub = addr.getAddressString();
        console.log("%d. %s,%s", i+1, pvt, pub)
        stream.write(`${i+1},${pvt},${pub}\n`)
    }
    stream.end();
});
