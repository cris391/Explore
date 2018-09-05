var log4js = require('log4js');
var logger = log4js.getLogger();
log4js.configure({
  appenders: { logs: { type: 'file', filename: 'logs.log' } },
  categories: { default: { appenders: ['logs'], level: 'debug' } }
});
logger.info("Some debug messages");
logger.error("Some error messages");
