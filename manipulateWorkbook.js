var Excel = require('exceljs');

var outWb = new Excel.Workbook();
var sheet = outWb.addWorksheet('My Sheet');
var outWs = outWb.getWorksheet('My Sheet')
var verticalObj = {};
// outWs.columns = [{ header: '#', key: '#', width: 10}];
outWs.columns = [];
// outWs.columns.push({ header: '#', key: '#', width: 10});

var currWb = new Excel.Workbook();
currWb.xlsx.readFile('CristianExport6.xlsx')
  .then(function () {

    var ws = currWb.getWorksheet(1);
    var networkIdRowNo = 0;
    ws.eachRow(function (row, rowNumber) {

      var uniqueIdentifier;
      var rowSize = row.cellCount;
      // if (rowNumber === 1) {
      if (rowNumber > 0 && rowNumber < 4) {
        uniqueIdentifier = row.values[1] + row.values[2] + row.values[3];

        // outWs.columns.push({ header: row.values[3], key: row.values[3], width: 40 });
        // outWs.columns.push({ header: '#', key: '#', width: 10});
        // outWs.columns = [{ header: '#', key: '#', width: 10}];
        outWs.columns = [...outWs.columns, ...[{ header: row.values[3], key: row.values[3], width: 40 }]]
        // console.log(outWs.columns);
        verticalObj[uniqueIdentifier] = [];

        for (i = 0; i <= rowSize; i++) {
          if (i > 3) {
            verticalObj[uniqueIdentifier].push(row.values[i])
          }
        }

        for (let i = 0; i < verticalObj[uniqueIdentifier].length; i++) {
          outWs.addRow({ [row.values[3]]: verticalObj[uniqueIdentifier][i] });
          // outWs.addRow({ '#' : '1' });
        }
        // console.log(outWs.columns);


      }

      if (row.values[3] === 'Network ID') {
        networkIdRowNo = rowNumber;
      }

      // if (rowNumber <= networkIdRowNo) {
      //   outWs.addRow({ fName: 'Test.xlsx', questions: row.values[3] });
      // }

    });
    // console.log(verticalObj);


    // var networkIdRowNo = 0;
    // idCol.eachCell(function (cell, rowNumber) {
    //   if (cell.text == 'Network ID') {
    //     networkIdRowNo = rowNumber;
    //     console.log('network id');
    //   }
    // });
    // var fileName;
    // idCol.eachCell(function (cell, rowNumber) {
    //   if (rowNumber == 1) {
    //     fileName = cell.text;
    //   }

    //   if (rowNumber > 1 && rowNumber <= networkIdRowNo) {
    //     outWs.addRow({ fName: fileName, questions: cell.text });
    //   }
    // });
    outWb.xlsx.writeFile('CristianExport6.1.xlsx')
      .then(function () {

      });
  });
