var Excel = require('exceljs');
const fs = require('fs');

const excelsPath = './Sheet # 719.xlsx';

var inputWb = new Excel.Workbook();
var outWb = new Excel.Workbook();
var outWs = outWb.addWorksheet('Merged Columns');

inputWb.xlsx.readFile(`${excelsPath}`).then(function() {
  var worksheet = inputWb.getWorksheet(5);
  let columnsCount = worksheet.getRow(1).values.length;

  for (let i = 2; i < columnsCount; i++) {

    var column = worksheet.getColumn(i).values;
  
    for (let index = 2; index < column.length; index++) {
      outWs.addRow([column[1], column[index]]);
    }
    
  }


  outWb.xlsx.writeFile('MergedTypeform2.xlsx').then(function() {
    console.log('Finished writing to MergedTypeform.xlsx');
  });
});
