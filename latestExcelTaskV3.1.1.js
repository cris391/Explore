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
  // console.log(rowArrays.length);

  // var rowTransposedArrays;
  var rowTransposedArrays = rowArrays[0].map((col, i) => rowArrays.map(row => row[i]));

  // rowArrays.forEach((element, index) => {
  //   rowTransposedArrays = rowArrays[index].map((col, i) => rowArrays.map(row => row[i]));
  // });
  // console.log(rowTransposedArrays[1].length/41);

  rowTransposedArrays.forEach((row, index) => {
    // if (index == 20) console.log(rowTransposedArrays[22]);
    
    outWs.addRow(row);
    // console.log(index);
  });
  
  // new functionality
  var columnCount = outWs.columnCount + 5;

  let individualFileWs;
  var counterDividedTotalColumns = 2;
  var readColumnCounter = 1;
  for (let index = 1; index <= columnCount; index++) {
    let currColumn = outWs.getColumn(readColumnCounter);
    let currColumnValues = outWs.getColumn(readColumnCounter).values;
    // console.log(currColumnValues);

    let currColumnHeaderFile = currColumn.values[1];
    // console.log(currColumnHeaderFile);

    // console.log(currColumnHeaderFile);

    if (typeof outWb.getWorksheet(currColumnHeaderFile) === 'undefined') {
      individualFileWs = outWb.addWorksheet(currColumnHeaderFile);

      checker = currColumnHeaderFile;
    }
    else if (!(typeof outWb.getWorksheet(currColumnHeaderFile) === 'undefined')) {
      // console.log(currColumnValues);
      // create column and set its values on each file sheet
      if(currColumnValues.length > 5){
        // console.log(currColumnValues);

        let temp = ['File Name'];
        for (let index = 0; index < currColumnValues.length - 2; index++) {
          temp.push(currColumnHeaderFile);
        }
        individualFileWs.getColumn(1).values = temp;

      }

      individualFileWs.getColumn(counterDividedTotalColumns).values = currColumnValues;
      // individualFileWs.getColumn(readColumnCounter).values = currColumnValues;
      counterDividedTotalColumns++;
      readColumnCounter++;

    // } if (counterDividedTotalColumns == 38) {
    } if (counterDividedTotalColumns == 77) {
      counterDividedTotalColumns = 2;

    }

  }
  

  outWb.xlsx.writeFile('CristianExport7.xlsx').then(function() {
    console.log('Finished writing CristianExport7');
  });
});
