var Excel = require('exceljs');

var outWb = new Excel.Workbook();
var sheet = outWb.addWorksheet('My Sheet');
var outWs = outWb.getWorksheet('My Sheet')
outWs.columns = [{
    header: 'File Name',
    key: 'fName',
    width: 40
  },
  {
    header: 'Questions',
    key: 'questions',
    width: 50
  }
];

var currWb = new Excel.Workbook();
currWb.xlsx.readFile('Cristian.xlsx')
  .then(function () {

    var ws = currWb.getWorksheet(1);
    var columnCount = ws.columnCount;

    for (let index = 1; index <= columnCount; index++) {
      // console.log(index);
      
      var idCol = ws.getColumn(index);
      // console.log(idCol);

      var networkIdRowNo = 0;
      idCol.eachCell(function (cell, rowNumber) {
        if (cell.text == 'Network ID') {
          networkIdRowNo = rowNumber;
          console.log('network id');
          
        }
      });
      
      

      var fileName;
      idCol.eachCell(function (cell, rowNumber) {
        if (rowNumber == 1) {
          fileName = cell.text;
        }

        if (rowNumber > 1 && rowNumber <= networkIdRowNo) {
          outWs.addRow({
            fName: fileName,
            questions: cell.text
          });
        }
      });
    }

    outWb.xlsx.writeFile('CristianExport.xlsx')
      .then(function () {});

  });
