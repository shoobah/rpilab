var GPIO = require('onoff').Gpio,
  led = new GPIO(18, 'out')

function toggleLed(){
  if(led.readSync()===0){
    led.writeSync(1)
  } else {
    led.writeSync(0) }
}

setInterval(toggleLed, 50)

