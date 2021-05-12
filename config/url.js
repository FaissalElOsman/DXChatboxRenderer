const ports = require('./ports');

module.exports.DXStateMachine = process.env.HEROKU_IS_ON_CLOUD == 'TRUE'?`https://dx-state-machine.herokuapp.com`:`http://localhost:${ports.DX_STATE_MACHINE_PORT}`;
