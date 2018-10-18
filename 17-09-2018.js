var _ = require('lodash');
var Excel = require('exceljs');

var outWb = new Excel.Workbook();
var sheet = outWb.addWorksheet('My Sheet');
var outWs = outWb.getWorksheet('My Sheet')
// outWs.columns = [
//   { header: 'File Name', key: 'fName', width: 40 },
//   { header: 'Email ID', key: 'questions', width: 50 },
//   { header: 'First Question', key: 'questions', width: 50 },
//   { header: 'First Name', key: 'questions', width: 50 },
//   { header: 'Last Name', key: 'questions', width: 50 },
// ];

var currWb = new Excel.Workbook();
currWb.xlsx.readFile('Tester Data - Attempt_Completed_Cristian - 100.xlsx')
  .then(function () {


    var currWs = currWb.getWorksheet('Sheet2');
    var columnCount = currWs.columnCount;
    let lastQuestionIndex = [];
    var idCol = currWs.getColumn(4); 

    //get rows values and map to row array
    let rowValues = [];
    for (let i = 2; i < 140; i++) {
      var row = currWs.getRow(i);
      let answers = [];
      for (var j = 5; j <= row.values.length; j++) {
        answers.push(row.values[j]);
      }
      let rowValue = {
        key: `${row.values[1]}${row.values[2]}${row.values[3]}${row.values[4]}`,
        question: `${row.values[1]}`,
        answers: answers
      }
      rowValues.push(rowValue);
    }
    
    
    let jsonXlsx = [];
    for (let index = 0; index < 2000; index++) {
      jsonXlsx.push([]);
    }
    //assign array for each user
    for (let index = 0; index < rowValues.length; index++) {
      for (let j = 0; j < rowValues[index].answers.length; j++) {
        // for (let j = 0; j < 3; j++) {
        jsonXlsx[j].push(rowValues[index].answers[j])
        // console.log(j);
        
      }
    }
    console.log(jsonXlsx);
    

    

    for (let index = 0; index < jsonXlsx.length; index++) {
      // for (let j = 0; j < jsonXlsx[index].length; j++) {
        
      // }
      outWs.addRow(jsonXlsx[index]);
    }

    // console.log(rowValues);
    // console.log(jsonXlsx);


    outWb.xlsx.writeFile('CristianExport.xlsx')
      .then(function () {
        console.log(`xlsx written`);
      });
  });
