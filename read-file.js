const csv = require('csv-parser');
const fs = require('fs');
var i = 0;

fs.createReadStream('eeg_data.csv')
  .pipe(csv())
  .on('data', (row) => {
    if(i<1000){
        console.log(row);
    }
    else{
        console.clear();
        i = 0;
    }
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
