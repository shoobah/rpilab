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

var currentStep = 0

function step () {
  if (currentStep >= seq.length) {
    currentStep = 0
  }
  in1.writeSync(seq[currentStep][0])
  in2.writeSync(seq[currentStep][1])
  in3.writeSync(seq[currentStep][2])
  in4.writeSync(seq[currentStep][3])
  currentStep += 1
}

setInterval(step, 1)
