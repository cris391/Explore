var Excel = require('exceljs');
const fs = require('fs');

console.log('Step 2: Map typeforms values to rows');
var fileNames = [];
// var hardcodedFileName = 'Perspirex BR pt. 1 PRE.xlsx';
fs.readdirSync('./cris/').forEach(file => {
  fileNames.push(file);
});

// Read index xlsx and store row values
var wbIndex = new Excel.Workbook();
var templateColumns = [];

console.log('Reading 3.0 ..');
wbIndex.xlsx.readFile('./CristianExport3.0.xlsx').then(function() {
  var wsIndex = wbIndex.getWorksheet(1);
  wsIndex.eachRow(function(row, rowNumber) {
    templateColumns.push([row.values[1], row.values[2], row.values[3]]);
  });

  console.log('Reading typeforms and mapping them to master sheet..');
  formatSheet(function() {
    console.log('Writing mapping to master sheet..');
    outWb.xlsx.writeFile('CristianExport3.1.xlsx').then(function() {
      console.log('Finished writing to CristianExport3.1.xlsx');
      console.log('########################################');
      fs.unlink('./CristianExport3.0.xlsx', function(err) {
        if (err) throw err;
      });
    });
  });
});

var inputWb = new Excel.Workbook();
var outWb = new Excel.Workbook();
var outWs = outWb.addWorksheet('My Sheet');

let i = 0;
function formatSheet(callback) {
  const fileName = fileNames[i];
  inputWb.xlsx.readFile(`./Cris/${fileName}`).then(function() {
    var inputWs = inputWb.getWorksheet(1);
    var columnCount = inputWs.columnCount;
    var batchColumnHeaders = [];

    for (index = 1; index <= columnCount; index++) {
      let currColumn = inputWs.getColumn(index);
      let currColumnHeader = currColumn.values[1];
      batchColumnHeaders.push([index, currColumnHeader]);
    }

    for (let i = 0; i < templateColumns.length; i++) {
      let requiredColumn = '';
      requiredColumn = templateColumns[i][1];
      // if (templateColumns[i][0] === hardcodedFileName && batchColumnHeaders.find(el => el[1] === templateColumns[i][2])) {
      if (templateColumns[i][0] === fileName && batchColumnHeaders.find(el => el[1] === templateColumns[i][2])) {
        var cellValues = [];
        let columnObj = batchColumnHeaders.find(function(element) {
          return element[1] == templateColumns[i][2];
        });
        let columnIndex = columnObj[0];
        let currColumn = inputWs.getColumn(columnIndex);
        let currColumnHeader = currColumn.values[1];
        currColumn.eachCell(function(cell, rowNumber) {
          if (currColumnHeader) {
            if (cell.text != currColumnHeader) {
              let columnCellValue = cell.text;
              cellValues.push(columnCellValue);
              // console.log(columnCellValue);
            }
          }
        });

        let flatArray = [fileName, requiredColumn, currColumnHeader, ...cellValues];

        outWs.addRow(flatArray);
        // console.log(cellValues);
      }
      if (templateColumns[i][0] === fileName && !batchColumnHeaders.find(el => el[1] === templateColumns[i][2])) {
        let flatArray = [fileName, requiredColumn, '-', '-'];
        // console.log(cellValues);

        outWs.addRow(flatArray);
      }
    }
    if (i % 100 == 0) {
      console.log(i, fileName);
    }

    if (i < fileNames.length - 1) {
      try {
        formatSheet(callback);
      } catch (err) {
        console.log(err);
      }
    } else {
      callback();
    }
  });
}
