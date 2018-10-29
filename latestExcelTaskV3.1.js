var Excel = require('exceljs');
const fs = require('fs');
const hardcodedFileName = 'CristianExport6.1.xlsx';

var readWorkBook = new Excel.Workbook();
var outWb = new Excel.Workbook();
var outWs = outWb.addWorksheet('My Sheet');

let rowArrays = [];
readWorkBook.xlsx.readFile(`./${hardcodedFileName}`).then(function () {
  var worksheet = readWorkBook.getWorksheet(1);
  worksheet.eachRow(function (row, rowNumber) {
    rowArrays.push(row.values)
  });
  // console.log(rowArrays);

  var rowTransposedArrays;
  rowArrays.forEach((element, index) => {
    rowTransposedArrays = rowArrays[index].map((col, i) => rowArrays.map(row => row[i]));
  });
  // console.log(rowTransposedArrays);

  rowTransposedArrays.forEach((element, index) => {
    let row = element
    outWs.addRow(row);

  });

  // new functionality
  var columnCount = outWs.columnCount;
  let individualFileWs;
  var counterDividedTotalColumns = 1;
  var readColumnCounter = 1;
  for (let index = 1; index <= columnCount; index++) {
    let currColumn = outWs.getColumn(readColumnCounter);
    let currColumnValues = outWs.getColumn(readColumnCounter).values;
    // console.log(currColumnValues);


    let currColumnHeaderFile = currColumn.values[1];
    if (typeof outWb.getWorksheet(currColumnHeaderFile) === 'undefined') {
      individualFileWs = outWb.addWorksheet(currColumnHeaderFile);
      checker = currColumnHeaderFile;
    }
    else if (!(typeof outWb.getWorksheet(currColumnHeaderFile) === 'undefined')) {
      // console.log(currColumnValues);
      // create column and set its values on each file sheet

      individualFileWs.getColumn(counterDividedTotalColumns).values = currColumnValues;
      // individualFileWs.getColumn(readColumnCounter).values = currColumnValues;
      counterDividedTotalColumns++;
      readColumnCounter++;

    } if (counterDividedTotalColumns == 39) {
      counterDividedTotalColumns = 1;

    }

  }

  outWb.xlsx.writeFile('CristianExport7.xlsx').then(function () { });
});
