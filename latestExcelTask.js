var Excel = require('exceljs');
const fs = require('fs');
var fileNames = [];
var hardcodedFileName = 'Perspirex BR pt. 1 PRE.xlsx';
fs.readdirSync('./cris/').forEach(file => { fileNames.push(file); })
// Read index xlsx and store row values
var wbIndex = new Excel.Workbook();
var indexValues = [];
wbIndex.xlsx.readFile('./Index_New.xlsx').then(function () {
  var wsIndex = wbIndex.getWorksheet(4);
  wsIndex.eachRow(function (row, rowNumber) {
    indexValues.push([row.values[1], row.values[2], row.values[3]])
  });
});

var typeformWb = new Excel.Workbook();
var outWb = new Excel.Workbook();
var outWs = outWb.addWorksheet('My Sheet');


for (let i = 0; i < fileNames.length; i++) {
  const fileName = fileNames[i];

  // typeformWb.xlsx.readFile(`./cris/${hardcodedFileName}`).then(function () {
    typeformWb.xlsx.readFile(`./Cris/${fileName}`).then(function () {
    var typeformWs = typeformWb.getWorksheet(1);
    var columnCount = typeformWs.columnCount;
    var columns = [];
    for (index = 1; index <= columnCount; index++) {
      let currColumn = typeformWs.getColumn(index);
      let currColumnHeader = currColumn.values[1];
      columns.push([index, currColumnHeader])

    }
    for (let i = 0; i < indexValues.length; i++) {
      let requiredColumn = '';
      requiredColumn = indexValues[i][1];
      // if (indexValues[i][0] === hardcodedFileName && columns.find(el => el[1] === indexValues[i][2])) {
        if (indexValues[i][0] === fileName && columns.find(el => el[1] === indexValues[i][2])) {
        var cellValues = [];
        let columnObj = columns.find(function (element) {
          return element[1] == indexValues[i][2];
        });
        let columnIndex = columnObj[0];
        let currColumn = typeformWs.getColumn(columnIndex);
        let currColumnHeader = currColumn.values[1];
        currColumn.eachCell(function (cell, rowNumber) {

          if (currColumnHeader) {
            if (cell.text != currColumnHeader) {
              let columnCellValue = cell.text;
              cellValues.push(columnCellValue);
              // console.log(columnCellValue);
            }
          }
        });
        // let flatArray = [hardcodedFileName, requiredColumn, currColumnHeader, ...cellValues]
        let flatArray = [fileName, requiredColumn, currColumnHeader, ...cellValues]
        // console.log(cellValues);

        outWs.addRow(flatArray);
        // console.log(cellValues);
      }
      // if (indexValues[i][0] === hardcodedFileName && !columns.find(el => el[1] === indexValues[i][2])) {      
      if (indexValues[i][0] === fileName && !columns.find(el => el[1] === indexValues[i][2])) {
        // let flatArray = [hardcodedFileName, requiredColumn, '-']
        let flatArray = [fileName, requiredColumn, '-', '-']
        // console.log(cellValues);

        outWs.addRow(flatArray);
      }

    }

    outWb.xlsx.writeFile('CristianExport6.xlsx')
      .then(function () {
        // console.log(fileName);
      });
  });
}