var GPIO = require('onoff').Gpio
var Modes = require('./modes')
var Nano = require('nanotimer')
var Util = require('util')
var EventEmitter = require('events').EventEmitter

var ee = new EventEmitter()
//TODO: Make this code inherit eventemitter and emit event when motor is done
var Timer = new Nano()

var in1 = GPIO(4, 'out')
var in2 = GPIO(17, 'out')
var in3 = GPIO(23, 'out')
var in4 = GPIO(24, 'out')
var led = GPIO(18, 'out')

var currentStep = 0
var count = 0

function step (stepMode, numSteps, increment, stepper) {
  if (currentStep >= stepMode.seq.length) {
    currentStep = 0
  }
  if (currentStep < 0) {
    currentStep = stepMode.seq.length - 1
  }
  in1.writeSync(stepMode.seq[currentStep][0])
  in2.writeSync(stepMode.seq[currentStep][1])
  in3.writeSync(stepMode.seq[currentStep][2])
  in4.writeSync(stepMode.seq[currentStep][3])
  currentStep += increment
  count += 1
  if (!numSteps) {
    numSteps = stepMode.stepsPerRevolution
  }
  led.writeSync(1)
  if (count > numSteps && stepper !== null) {
    Timer.clearInterval(stepper)
    led.writeSync(0)
  }
}

var motor = {
  settings: {
    stepMode: Modes.halfstep,
    delay: '2m'
  },
  turnMotor: function (angle) {
    var stepMode = this.settings.stepMode
    var stepsPerDegree = stepMode.stepsPerRevolution / 360
    var maxSteps = angle * stepsPerDegree
    var increment = 1
    if (maxSteps < 0) {
      maxSteps = maxSteps * -1
      increment = -1
    }
    var stepper = Timer.setInterval(step, [stepMode, maxSteps, increment, stepper], this.settings.delay)
  }
}

module.exports = motor
