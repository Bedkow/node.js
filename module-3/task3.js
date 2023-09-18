import fs from 'fs';
import readline from 'readline';
import csvtojson from 'csvtojson';

//read file line by line
const CSVstream = readline.createInterface({
    input: fs.createReadStream('./csvdirectory/nodejs-m3-t3.csv'),
});

//line read event callback
CSVstream.on('line', (line) => {
    csvtojson({
        noheader: true,
        output: "json"
    })
    .fromString(line)
    .then((row)=>{
        // console.log(row)
        fs.appendFile('./txtdirectory/nodejs-m3.t3.txt', JSON.stringify(row), (err)=>{
            if (err) throw err;
        })
    })
});