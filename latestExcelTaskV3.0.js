var Excel = require('exceljs');

console.log('Step 1: Transpose columns to rows of index sheet');
// const hardcodedFileName = 'Cris_27 Nov_Final.xlsx'; //first file
const hardcodedFileName = 'All Questions_TF_29Jan - To Cristian_Ver 2.xlsx';
var readWorkBook = new Excel.Workbook();
var outWb = new Excel.Workbook();
var outWs = outWb.addWorksheet('My Sheet');
outWs.addRow(['File Name Questions', 'Required Column', 'Actual Fields in excel']);

readWorkBook.xlsx.readFile(`./${hardcodedFileName}`).then(function() {
  var readWorksheet = readWorkBook.getWorksheet(1);

  let arr = readWorksheet.getRow(1).values;
  arr.splice(0, 2);

  readWorksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
    if (rowNumber > 1) {
      let rowValues = row.values;

      let fileName = rowValues[1];
      let columnIndex = 0;
      for (let index = 2; index < rowValues.length; index++) {
        const cellValue = rowValues[index];
        let outCellValue = cellValue;

        if (cellValue == null) {
          outCellValue = '-';
        }

        outWs.addRow([fileName, arr[columnIndex], outCellValue]);
        columnIndex++;
      }
    }
  });

  outWb.xlsx.writeFile('CristianExport3.0.xlsx').then(function() {
    console.log('Finished writing CristianExport3.0.xlsx');
    console.log('########################################');
  });
});

const columns = [
  // '',
  'First Question',
  'Name',
  'First Name',
  'Last Name',
  'Email ID',
  'Age',
  'Year of Birth',
  'Gender',
  'Monthly Income',
  'Annual Household Income',
  'Annual Income',
  'Job',
  'Country - China',
  'Children',
  'Job Title',
  'Country - UK',
  'Country - US',
  'Country',
  'Hotel',
  'Job',
  'Phone#',
  'Shopping Mall Job',
  'Financial Sector Job',
  'Water Service Job',
  'Aquaculture Job',
  'Country - Ohio',
  'Education',
  'Country - Sweden',
  'Country - Denmark / Global',
  'CMO Job',
  'Construction Job',
  'Dairy Job',
  'Hearing Aid User',
  'Country - Germany',
  'Country - Norway',
  'Country - Finland',
  'Architect Job',
  'Country - Denmark',
  'Logistics Job',
  'Bank Job',
  'Operations Job',
  'Procurement Job',
  'Marital Status',
  'Catheter User',
  'Country - Europe',
  'Cutting Tool Buyer Job',
  'Country - Netherlands',
  'Sugar Industry Job',
  'Energy Procurement Job',
  'Engineer US Job',
  'Flying Tiger Job',
  'Country - France',
  'Skype ID',
  'Country - Asia',
  'Country - Spain',
  'Teacher Job',
  'Health Products Consumer',
  'Coffee Lover',
  'Orbital Steering Systems Job',
  'CFO Job',
  'Pump Distributor',
  'Marine Job',
  'Country - Stockholm',
  "Company's Annual Income",
  'Cigar Industry Job',
  'VELUX window',
  'Country - Japan',
  'Bank Customers',
  'House Owner',
  'Fretilizer User',
  'Thailand Distributor',
  'US Distributor',
  'T&C',
  'Start Date',
  'Finish Date',
  'Network ID'
];

const columnsOld = [
  '',
  // 'Project Name',
  // 'Project Code',
  // 'Language',
  'First Question',
  'Name',
  'First Name',
  'Last Name',
  'Age',
  'Year of Birth',
  'Gender',
  'Email ID',
  'Income',
  'Job',
  'Country - China',
  'Country - UK',
  'Job Title',
  'Country - US',
  'Country',
  'Phone#',
  'household income',
  'Country - Ohio',
  'Education',
  'Country - Sweden',
  'Country - Denmark / Global',
  'Country - Germany',
  'Country - Norway',
  'Country - Finland',
  'Country - Denmark',
  'Marital Status',
  'Country - Europe',
  'Country - Netherlands',
  'Country - France',
  'Country - Gernamy',
  'Skype ID',
  'Country - Asia',
  'Country - Spain',
  'Country - Stockholm',
  'Country - Japan',
  'Start Date',
  'Finish Date',
  'Network ID'
];
