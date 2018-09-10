var Excel = require('exceljs');
const typeformFolder = './typeform/';
const fs = require('fs');
var fileNames = [];

fs.readdirSync(typeformFolder).forEach(file => {
  fileNames.push(file);
})

var typeformWb = new Excel.Workbook();
var outWb = new Excel.Workbook();
var outWs = outWb.addWorksheet('My Sheet');

function writeRows(callback){
}
// for (let i = 0; i < fileNames.length; i++) {
for (let i = 750; i < 986; i++) {
  const fileName = fileNames[i];

  // typeformWb.xlsx.readFile(`./typeform/${'(UK) Laundry detergent pt2.xlsx'}`)
  typeformWb.xlsx.readFile(`./typeform/${fileName}`)
    .then(function () {
      var typeformWs = typeformWb.getWorksheet(1);
      var columnCount = typeformWs.columnCount;

      for (index = 1; index <= columnCount; index++) {
        var currColumn = typeformWs.getColumn(index);
        let currColumnHeader = currColumn.values[1];
        // console.log(currColumnHeader);
        var cellValues = [];
        currColumn.eachCell(function (cell, rowNumber) {
          if (currColumnHeader) {
            if (cell.text != currColumnHeader) {
              let columnCellValue = cell.text;
              cellValues.push(columnCellValue);
              // console.log(columnCellValue);
            }
          }
        });
        let flatArray = [fileName, currColumnHeader, ...cellValues]
        // console.log(cellValues);

        outWs.addRow(flatArray);
        // console.log(cellValues);
      }
      outWb.xlsx.writeFile('CristianExport4.xlsx')
        .then(function () {
          console.log(fileName);
        });
    });
}