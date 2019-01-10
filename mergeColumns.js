var Excel = require('exceljs');
const fs = require('fs');

const excelsPath = './aug-dec/';
var fileNames = [];
fs.readdirSync(excelsPath).forEach(file => {
  fileNames.push(file);
});
console.log('File length', fileNames.length);

var inputWb = new Excel.Workbook();
var outWb = new Excel.Workbook();
var outWs = outWb.addWorksheet('Merged Columns');

let i = 0;
function formatSheet(callback) {
  const fileName = fileNames[i];
  inputWb.xlsx.readFile(`${excelsPath}${fileName}`).then(function() {
    var worksheet = inputWb.getWorksheet(1);
    var row = worksheet.getRow(1).values;
    row.splice(0, 1);
    outWs.addRow([fileName, ...row]);

    if (i % 100 == 0) {
      console.log(i, fileName);
    }

    // if (i < 10) {
    if (i < fileNames.length - 1) {
      try {
        i++;
        formatSheet(callback);
      } catch (err) {
        console.log(err);
      }
    } else {
      callback();
    }
  });
}

formatSheet(function() {
  outWb.xlsx.writeFile('MergedTypeform.xlsx').then(function() {
    console.log('Finished writing to MergedTypeform.xlsx');
  });
});
