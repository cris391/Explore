var Excel = require('exceljs');
const fs = require('fs');
var fileNames = [];
// var hardcodedFileName = 'Perspirex BR pt. 1 PRE.xlsx';
var hardcodedFileName = 'CristianExport6.1.xlsx';
fs.readdirSync('./cris/').forEach(file => { fileNames.push(file); })
// Read index xlsx and store row values
var wbIndex = new Excel.Workbook();
var refColumnValues = [];
wbIndex.xlsx.readFile('./Index_New.xlsx').then(function () {
  var wsIndex = wbIndex.getWorksheet(4);
  wsIndex.eachRow(function (row, rowNumber) {
    refColumnValues.push([row.values[1], row.values[2], row.values[3]])
  });
  // console.log(refColumnValues);
});


var typeformWb = new Excel.Workbook();
var outWb = new Excel.Workbook();
var outWs = outWb.addWorksheet('My Sheet');


// for (let i = 0; i < fileNames.length; i++) {
  // const fileName = fileNames[i];

  typeformWb.xlsx.readFile(`./cris/${hardcodedFileName}`).then(function () {
    // typeformWb.xlsx.readFile(`./Cris/${fileName}`).then(function () {
    var typeformWs = typeformWb.getWorksheet(1);
    var columnCount = typeformWs.columnCount;
    var columns = [];
    let currColumn1 = typeformWs.getColumn(2);
    let currColumnHeader1= currColumn1.values;
    // console.log(currColumnHeader1);
    
    for (index = 1; index <= columnCount; index++) {
      let currColumn = typeformWs.getColumn(index);
      let currColumnHeader = currColumn.values[1];
      columns.push([index, currColumnHeader])

    }
    // console.log(columns);
    let unifiedRow = [];
    for (let i = 0; i < refColumnValues.length; i++) {
      let unifiedRowIndex = 0;
      let requiredColumn = '';
      requiredColumn = refColumnValues[i][1];
      if (refColumnValues[i][0] === hardcodedFileName && columns.find(el => el[1] === refColumnValues[i][2])) {
        // if (refColumnValues[i][0] === fileName && columns.find(el => el[1] === refColumnValues[i][2])) {
        

        var cellValues = [];
        let columnObj = columns.find(function (element) {
          return element[1] == refColumnValues[i][2];
        });
        let columnIndex = columnObj[0];
        let currColumn = typeformWs.getColumn(columnIndex);
        let currColumnHeader = currColumn.values[1];

        // console.log(currColumnHeader);
        
        currColumn.eachCell(function (cell, rowNumber) {

          if (currColumnHeader) {
            if (cell.text != currColumnHeader) {
              let columnCellValue = cell.text;
              cellValues.push(columnCellValue);
              unifiedRow.push(unifiedRowIndex, columnCellValue, currColumnHeader)
              unifiedRowIndex++;
              // console.log(columnCellValue);
            }
          }
        });
        let flatArray = [hardcodedFileName, requiredColumn, currColumnHeader, ...cellValues]
        // let flatArray = [fileName, requiredColumn, currColumnHeader, ...cellValues]

        outWs.addRow(flatArray);
      }

      if (refColumnValues[i][0] === hardcodedFileName && !columns.find(el => el[1] === refColumnValues[i][2])) {
        // if (refColumnValues[i][0] === fileName && !columns.find(el => el[1] === refColumnValues[i][2])) {
        let flatArray = [hardcodedFileName, requiredColumn, '-']
        // let flatArray = [fileName, requiredColumn, '-', '-']

        outWs.addRow(flatArray);
      }

    }
    // console.log(unifiedRow);

    outWb.xlsx.writeFile('CristianExport6.2.xlsx').then(function () {});
  });
// }