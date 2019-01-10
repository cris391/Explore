var Excel = require('exceljs');
const fs = require('fs');

console.log('Step 4: Map typeforms to a single sheet, each under the other');
const hardcodedFileName = 'CristianExport3.2.xlsx';
var readWorkBook = new Excel.Workbook();
var outWb = new Excel.Workbook();
var outWs = outWb.addWorksheet('My Sheet');

console.log('Reading 3.2 ..');
readWorkBook.xlsx.readFile(`./${hardcodedFileName}`).then(function() {
  let sampleSheet = readWorkBook.getWorksheet(2);

  let headers = sampleSheet.getRow(3).values;
  headers.splice(0, 1);
  outWs.addRow(['File Name', ...headers]);

  console.log('Remap of each sheet..');
  readWorkBook.eachSheet(function(worksheet, sheetId) {
    if (sheetId % 100 == 0) {
      console.log(sheetId, worksheet.name);
    }

    if (sheetId > 1) {
      let currSheet = readWorkBook.getWorksheet(sheetId);
      currSheet.eachRow(function(row, rowNumber) {
        if (rowNumber > 3) {
          let rowValues = row.values;
          rowValues.splice(0, 1);

          outWs.addRow([worksheet.name, ...rowValues]);
        }
      });
    }
  });

  outWb.xlsx.writeFile('CristianExport3.3.xlsx').then(function() {
    console.log('Finished writing CristianExport3.3');
    console.log('########################################');
    fs.unlink('./CristianExport3.2.xlsx', function(err) {
      if (err) throw err;
    });
  });
});
