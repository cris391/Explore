var Excel = require('exceljs');
const fs = require('fs');
var fileNames = [];
// var hardcodedFileName = 'Perspirex BR pt. 1 PRE.xlsx';
var hardcodedFileName = 'CristianExport6.1.xlsx';

// Read index xlsx and store row values
var readWorkBook = new Excel.Workbook();
var refColumnValues = [];

var outWb = new Excel.Workbook();
var outWs = outWb.addWorksheet('My Sheet');
outWs.columns = [];
readWorkBook.xlsx.readFile(`./${hardcodedFileName}`).then(function () {
  var ws = readWorkBook.getWorksheet(1);
  ws.eachRow(function (row, rowNumber) {
    refColumnValues.push([row.values[2], row.values[3]])
  });
  // console.log(refColumnValues);
  for (let index = 0; index < refColumnValues.length; index++) {
    // console.log(refColumnValues[index]);
    outWs.columns = [...outWs.columns, ...[{ header: refColumnValues[index], key: refColumnValues[index], width: 20 }]]
  }

  // let columnSize = 38;
  // for (let index = 1; index <= columnSize; index++) {


  // }
  var dobCol = ws.getColumn(1);
  dobCol.eachCell(function (cell, rowNumber) {

  });

  let columnValues = [];
  let rowIndex = 1;
  ws.eachRow(function (row, rowNumber) {
    var numValues = row.actualCellCount;
    for (let index = 4; index <= numValues; index++) {
      columnValues.push([rowIndex, row.values[index]])
      rowIndex++;
    }
    rowIndex = 1;

  });
  console.log(columnValues);
  


  outWb.xlsx.writeFile('CristianExport6.2.xlsx')
    .then(function () { });
});