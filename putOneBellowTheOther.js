// step 2
var Excel = require('exceljs');
const fs = require('fs');

// file input step2
const excelsPath = './Step2Input.xlsx';

var inputWb = new Excel.Workbook();
var outWb = new Excel.Workbook();
var outWs = outWb.addWorksheet('Merged Columns');

inputWb.xlsx.readFile(`${excelsPath}`).then(function() {
  var worksheet = inputWb.getWorksheet(1);
  let columnsCount = worksheet.getRow(1).values.length;

  for (let i = 2; i < columnsCount; i++) {

    var column = worksheet.getColumn(i).values;
  
    for (let index = 2; index < column.length; index++) {
      outWs.addRow([column[1], column[index]]);
    }
    
  }


  outWb.xlsx.writeFile('Step2Output.xlsx').then(function() {
    console.log('Finished writing to Step2Output.xlsx');
  });
});
