var Excel = require('exceljs');
const fs = require('fs');

console.log('Step 3: Transpose typeform to columns and assign a new sheet for each');
const hardcodedFileName = 'CristianExport3.1.xlsx';
var readWorkBook = new Excel.Workbook();
var outWb = new Excel.Workbook();
var outWs = outWb.addWorksheet('My Sheet');
let rowArrays = [];

console.log('Reading 3.1 ..');
readWorkBook.xlsx.readFile(`./${hardcodedFileName}`).then(function() {
  var worksheet = readWorkBook.getWorksheet(1);
  worksheet.eachRow(function(row, rowNumber) {
    rowArrays.push(row.values);
  });
  // console.log(rowArrays);
  
  // mapping each array based on filename property to object with unique key of filename
  console.log('Mapping each array to filename property key..');
  let rowsObj = {};
  for (let index = 0; index < rowArrays.length; index++) {
    if (rowsObj[rowArrays[index][1]] == undefined) {
      rowsObj[rowArrays[index][1]] = [];
    }
    rowsObj[rowArrays[index][1]].push(rowArrays[index]);
  }

  for (let index = 0; index < rowArrays.length; index++) {
    for (let i = 0; i < rowArrays[index].length; i++) {
      if (rowArrays[index][i] == undefined) {
        rowArrays[index][i] = '-';
      }
    }
  }

  console.log('Adding new sheet for each file and writing sheets..');
  let currColumnHeaderFile = '';
  let headerArr = [];
  let individualFileWs;
  console.log('Out of ', 71400);
  for (let index = 0; index < rowArrays.length; index++) {
    if (currColumnHeaderFile == '') {
      currColumnHeaderFile = rowArrays[index][1];
      headerArr.push(rowArrays[index][1]);
      individualFileWs = outWb.addWorksheet(currColumnHeaderFile);
    }
    if (currColumnHeaderFile != rowArrays[index][1]) {
      currColumnHeaderFile = rowArrays[index][1];
      headerArr.push(rowArrays[index][1]);
      individualFileWs = outWb.addWorksheet(currColumnHeaderFile);
    }

    if (index % 6000 == 0) {
      console.log(index);
    }
    for (const columnHeader in rowsObj) {
      if (rowsObj.hasOwnProperty(columnHeader)) {
        if (columnHeader == currColumnHeaderFile) {
          // console.log(columnHeader);
          rowsObj[columnHeader].forEach(function(col, index) {
            // console.log(index, col);
            individualFileWs.getColumn(index + 1).values = col;
          });
        }
        // console.log(element);
      }
    }
  }

  console.log('Writing 3.2 ..');
  outWb.xlsx.writeFile('CristianExport3.2.xlsx').then(function() {
    console.log('Finished writing CristianExport3.2.xlsx');
    console.log('########################################');
    fs.unlink('./CristianExport3.1.xlsx', function(err) {
      if (err) throw err;
    });
  });
});