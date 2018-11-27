var Excel = require('exceljs');
const fs = require('fs');
const hardcodedFileName = 'CristianExport7.xlsx';

var readWorkBook = new Excel.Workbook();
var outWb = new Excel.Workbook();
var outWs = outWb.addWorksheet('My Sheet');

readWorkBook.xlsx.readFile(`./${hardcodedFileName}`).then(function() {
  let sampleSheet = readWorkBook.getWorksheet(2);
  
  let headers = sampleSheet.getRow(3).values;
  headers.splice(0, 1)
  outWs.addRow(['File Name', ...headers]);
  
  readWorkBook.eachSheet(function(worksheet, sheetId) {
    if(sheetId % 100 == 0){
      console.log(sheetId);
    }
    
    if (sheetId > 1) {
      let currSheet = readWorkBook.getWorksheet(sheetId);
      currSheet.eachRow(function(row, rowNumber) {
        if (rowNumber > 3) {
          let rowValues = row.values;
          rowValues.splice(0, 1);
          
          outWs.addRow([ worksheet.name, ...rowValues]);
        }
      });
    }
  });

  outWb.xlsx.writeFile('CristianExportV3.3.xlsx').then(function() {
    console.log('Finished writing CristianExportV3.3');
  });
});
