const fs = require("fs");
const fastcsv = require("fast-csv");
//npm i request
var request = require("request");

var i = 0,j=0;

let stream = fs.createReadStream("eeg_data.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {

    if(i<100){

        request.post(
            'https://vrpsznmzw9.execute-api.ap-south-1.amazonaws.com/v1/lambda-func-1',
            { json: { id: j,event:data } },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(response);
                }
                else{
                    console.log(error);
                }
            }
        );
      i++;
      j++;
    }
    else{
      i = 0;
    }
  })
  .on("end", function() {
   
    
  });

stream.pipe(csvStream);
