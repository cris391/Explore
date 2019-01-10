var request = require('request');
const fs = require('fs');

var options = {
  url: 'https://api.typeform.com/responses/Lq71gm?sort_by=submitted_at&sort_order=desc',
  method: 'GET',
  headers: {
    Authorization: 'Bearer HSEhvFjeahF9qkpPRFecxVJN4sc5ZFwa63ojN2HEdQbd',
    'Content-Type': 'application/json',
    Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  }
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    // var info = JSON.parse(body);
    console.log(body);
    
    // fs.writeFileSync('./typeform.xlsx', body, 'binary');
    fs.writeFile('test.xlsx', body, 'binary', function(err) {});
  } else {
    console.log(error);
  }
}

request(options, callback);
