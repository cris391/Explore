var log4js = require('log4js');
var logger = log4js.getLogger();
log4js.configure({
  appenders: { logs: { type: 'file', filename: 'logs.log' } },
  categories: { default: { appenders: ['logs'], level: 'debug' } }
});
logger.info("Some debug messages");
logger.error("Some error messages");


// slack configuration
log4js.configure({
  appenders: {
    alerts: {
      type: '@log4js-node/slack',
      token: 'xoxp-384841101184-386452575622-431478789168-f8a94fb8bb4c686553e2453d91a5f1fd',
      channel_id: 'ut-exporter',
      username: 'Log4js'
    }
  },
  categories: {
    default: { appenders: ['alerts'], level: 'debug' }
  }
});

logger.debug('Got cheese.');