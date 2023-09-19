import fs from 'fs';
import readline from 'readline';
import csvtojson from 'csvtojson';

//read file line by line
const CSVstream = readline.createInterface({
    input: fs.createReadStream('./csvdirectory/nodejs-m3-t3.csv'),
});

let lineNumber = 1;
//line read event callback

    CSVstream.on('line', (line) => {
    csvtojson({
        noheader: true,
        headers: ["Book", "Author", "Amount", "Price"],
        output: "json",
        downstreamFormat: "line"
    })
    .fromString(line)
    .then((row)=>{
        // console.log(row)
        if (lineNumber > 1) {
            fs.appendFile('./txtdirectory/nodejs-m3.t3.txt', JSON.stringify(row), (err)=>{
                if (err) throw err;
            })
        } else {
            null;
        }
        lineNumber++;
    })
});

