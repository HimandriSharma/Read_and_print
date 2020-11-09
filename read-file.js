const fs = require("fs");
const fastcsv = require("fast-csv");
//npm i request
var request = require("request");

var j=0;

let stream = fs.createReadStream("eeg_data.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    data = data +'';
    var dataArr = data.split(',');
    request.post(
        'https://vrpsznmzw9.execute-api.ap-south-1.amazonaws.com/v1/lambda-func-1',
        { json: { 
            id : j,
            AF3 : dataArr[0],
            AF4 : dataArr[1],
            F5 : dataArr[2],
            F3 : dataArr[3],
            F1 : dataArr[4],
            Fz : dataArr[5],
            F2 : dataArr[6],
            F4 : dataArr[7],
            F6 : dataArr[8],
            FC5 : dataArr[9],
            FC3 : dataArr[10],
            FC1 : dataArr[11],
            FCz : dataArr[12],
            FC2 : dataArr[13],
            FC4 : dataArr[14],
            FC6 : dataArr[15],
            CFC7 : dataArr[16],
            CFC5 : dataArr[17],
            CFC3 : dataArr[18],
            CFC1 : dataArr[19],
            CFC2 : dataArr[20],
            CFC4 : dataArr[21],
            CFC6 : dataArr[22],
            CFC8 : dataArr[23],
            T7 : dataArr[24],
            C5 : dataArr[25],
            C3 : dataArr[26],
            C1 : dataArr[27],
            Cz : dataArr[28],
            C2 : dataArr[29],
            C4 : dataArr[30],
            C6 : dataArr[31],
            T8 : dataArr[32],
            CCP7 : dataArr[33],
            CCP1 : dataArr[34],
            CCP5 : dataArr[35],
            CCP3 : dataArr[36],
            CCP1 : dataArr[37],
            CCP2 : dataArr[38],
            CCP4 : dataArr[39],
            CCP6 : dataArr[40],
            CCP8 : dataArr[41],
            CP5 : dataArr[42],
            CP3 : dataArr[43],
            CP1 : dataArr[44],
            CPz : dataArr[45],
            CP2 : dataArr[46],
            CP4 : dataArr[47],
            CP6 : dataArr[48],
            P5 : dataArr[49],
            P3 : dataArr[50],
            P1 : dataArr[51],
            Pz : dataArr[52],
            P2 : dataArr[53],
            P4 : dataArr[54],
            P6 : dataArr[55],
            PO1 : dataArr[56],
            PO2 : dataArr[57],
            O1 : dataArr[58],
            O2 : dataArr[59]
        } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(response);
            }
            else{
                console.log(error);
            }
        }
    );
    j++;
  })
  .on("end", function() {
   console.log("************************************************************All the data has been sent!**********************************************")
    
  });

stream.pipe(csvStream);
