const {
  google
} = require('googleapis');
var fs = require('fs');
log4js.configure({
  appenders: {
    logs: {
      type: 'file',
      filename: 'logs.log'
    }
  },
  categories: {
    default: {
      appenders: ['logs'],
      level: 'debug'
    }
  }
});


  // If modifying these scopes, delete token.json.
  const SCOPES = ['https://www.googleapis.com/auth/drive'];
  const TOKEN_PATH = 'token.json';

  // Load client secrets from a local file.
  fs.readFile('credentials.json', (err, content) => {
    if (err) {
      logger.error(err);
      return console.log('Error loading client secret file:', err);
    }
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), insertFilesInFolder);
  });

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  function authorize(credentials, callback) {
    const {
      client_secret,
      client_id,
      redirect_uris
    } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) {
        logger.error(err);
        return getAccessToken(oAuth2Client, callback);
      }
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback for the authorized client.
   */
  function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    logger.info('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) {
          logger.error(err);
          return console.error('Error retrieving access token', err);
        }
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) console.error(err);
          console.log('Token stored to', TOKEN_PATH);
          logger.info('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }

  /**
   * Lists the names and IDs of up to 10 files.
   * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
   */

  function insertFilesInFolder(auth) {
    const drive = google.drive({
      version: 'v3',
      auth
    });
    let folderId = '1SC_6YcwF_8_GscPg1L5bvSiinr7AKdQ7';

    let fileId = '1SqPd5eWvnKvy9I-KENc7-qnAvQvEYONU8ipUGCJzwWk';

    uploadFile('Yes title');

    function uploadFile(fileName) {
      var fileMetadata = {
        'name': fileName,
        addParents: [folderId]
      };
      var media = {
        mimeType: 'application/vnd.google-apps.document',
        // body: fs.createReadStream('./files/' + fileName)
      };
      drive.files.update({
        fileId: fileId,
        resource: fileMetadata,
        media: media,
        fields: 'id'
      }, function (err, file) {
        if (err) {
          // Handle error
          console.error(err);
          logger.error(err);
        } else {
          console.log(`Uploaded ${fileName} to Google Drive with File Id: ${file.data.id}`);
          logger.info(`Uploaded ${fileName} to Google Drive with File Id: ${file.data.id}`);
        }
      });
    }
  }