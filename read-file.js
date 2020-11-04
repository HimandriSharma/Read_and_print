const fs = require("fs");
const mysql = require("mysql");
const fastcsv = require("fast-csv");

let stream = fs.createReadStream("read-file.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();

    // create a new connection to the database
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "sense_data"
    });

    // open the connection
    connection.connect(error => {
      if (error) {
        console.error(error);
      } else {
        let query =
          "INSERT INTO sensordata (AF3,AF4,F5,F3,F1,Fz,F2,F4,F6,FC5,FC3,FC1,FCz,FC2,FC4,FC6,CFC7,CFC5,CFC3,CFC1,CFC2,CFC4,CFC6,CFC8,T7,C5,C3,C1,Cz,C2,C4,C6,T8,CCP7,CCP5,CCP3,CCP1,CCP2,CCP4,CCP6,CCP8,CP5,CP3,CP1,CPz,CP2,CP4,CP6,P5,P3,P1,Pz,P2,P4,P6,PO1,PO2,O1,O2) VALUES ?";
        connection.query(query, [csvData], (error, response) => {
          console.log(error || response);
        });
      }
    });
  });

stream.pipe(csvStream);
