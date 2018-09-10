var log4js = require('log4js');
var logger = log4js.getLogger();
const config = require('./config.json')
// log4js.configure({
//   appenders: { logs: { type: 'file', filename: 'logs.log' } },
//   categories: { default: { appenders: ['logs'], level: 'debug' } }
// });
// logger.info("Some debug messages");
// logger.error("Some error messages");


// slack configuration
log4js.configure({
  appenders: {
    alerts: {
      type: '@log4js-node/slack',
      token: config.slackToken,
      channel_id: 'ut-exporter',
      username: 'Log4js'
    }
  },
  categories: {
    default: { appenders: ['alerts'], level: 'debug' }
  }
});

logger.debug('Got cheese.');