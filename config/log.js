module.exports.level = process.env.HEROKU_IS_ON_CLOUD == 'TRUE' ? 'debug' : 'debug';