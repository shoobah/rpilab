var modes = {
  halfstep: {
    seq: [
      [1, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 1],
      [0, 0, 0, 1],
      [1, 0, 0, 1]
    ],
    stepsPerRevolution: 4096
  },
  fullstep: {
    seq: [
      [1, 0, 0, 1],
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 1, 1]
    ],
    stepsPerRevolution: 4096
  },
  // Not working with 28BYJ-48
  wave: {
    seq: [
      [1, 0, 0, 1],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ],
    stepsPerRevolution: 2048
  }
}

module.exports = modes
