var GPIO = require('onoff').Gpio
var in1 = GPIO(4, 'out')
var in2 = GPIO(17, 'out')
var in3 = GPIO(23, 'out')
var in4 = GPIO(24, 'out')

var seq = [
  [1, 0, 0, 0],
  [1, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 1, 1],
  [0, 0, 0, 1],
  [1, 0, 0, 1]
]

var seq2 = [
  [1, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 1, 1],
  [1, 0, 0, 1]
]

var currentStep = 0
var count = 0

function step (seqToUse, numSteps, increment) {
  if (currentStep >= seqToUse.length) {
    currentStep = 0
  }
  if (currentStep < 0) {
    currentStep = seqToUse.length - 1
  }
  in1.writeSync(seqToUse[currentStep][0])
  in2.writeSync(seqToUse[currentStep][1])
  in3.writeSync(seqToUse[currentStep][2])
  in4.writeSync(seqToUse[currentStep][3])
  currentStep += increment
  count += 1
  if (!numSteps) {
    numSteps = 4096
  }
  if (count > numSteps) {
    clearInterval(stepper)
  }
}

var stepsPerDegree = 4096 / 360
var maxSteps = process.argv[2] * stepsPerDegree
var increment = 1
if (maxSteps < 0) {
  maxSteps = maxSteps * -1
  increment = -1
}
console.log('Steps:', maxSteps)
var stepper = setInterval(function () {step(seq, maxSteps, increment)}, 1)
