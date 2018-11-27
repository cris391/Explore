var Excel = require('exceljs');
const hardcodedFileName = 'CristianExport6.1.xlsx';

var readWorkBook = new Excel.Workbook();
var outWb = new Excel.Workbook();
var outWs = outWb.addWorksheet('My Sheet');

let rowArrays = [];
readWorkBook.xlsx.readFile(`./${hardcodedFileName}`).then(function() {
  var worksheet = readWorkBook.getWorksheet(1);
  worksheet.eachRow(function(row, rowNumber) {
    rowArrays.push(row.values);
  });
  // console.log(rowArrays);

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

  let currColumnHeaderFile = '';
  let headerArr = [];
  let individualFileWs;
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

    let temp = ['File Name'];
    // for (let i = 0; i < rowArrays[index].length; i++) {
    //   if (index == 0) {
    //   }
    //   // individualFileWs.getColumn(i+1).values = rowArrays[index][i];
    //   individualFileWs.getColumn(i + 1).values = [1, 2, 3];
    // }
    for (const columnHeader in rowsObj) {
      if (rowsObj.hasOwnProperty(columnHeader)) {
        
        if (columnHeader == currColumnHeaderFile) {
          console.log(columnHeader);
          rowsObj[columnHeader].forEach(function(col, index) {
            // console.log(index, col);
            individualFileWs.getColumn(index + 1).values = col;
          });
        }

        // console.log(element);
      }
    }
  }

  outWb.xlsx.writeFile('CristianExport7.xlsx').then(function() {
    console.log('Finished writing CristianExport7');
  });
});
