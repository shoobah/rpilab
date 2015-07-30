var Motor = require('./motor')
var Modes = require('./modes')

Motor.settings.stepMode = Modes.halfstep
Motor.settings.delay = '2m'

Motor.turnMotor(process.argv[2])
