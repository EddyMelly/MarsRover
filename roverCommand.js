const Rover = require('./rover.js');

module.exports = function newRoverCommand() {
  var rovers = [];
  var plateauBoundary = { x: 5, y: 5 };
  function getPlateauBoundary() {
    return plateauBoundary;
  }

  function setPlateauBoundary(plateauInput) {
    let validatedPlateauInput = validatePlateauBoundary(plateauInput);

    if (
      typeof validatedPlateauInput === 'object' &&
      validatedPlateauInput !== null
    ) {
      plateauBoundary = validatedPlateauInput;
    }
  }

  function validatePlateauBoundary(plateauInput) {
    //validate plateau input
    let returnValue;
    let plateauInputModified = plateauInput.split(' ').map(Number);
    if (plateauInputModified.length > 2 || plateauInputModified.length <= 1) {
      returnValue = 'Error: input too long or short';
    } else {
      if (checkArrayIsValidInt(plateauInputModified)) {
        returnValue = {
          x: plateauInputModified[0],
          y: plateauInputModified[1],
        };
      } else {
        returnValue = 'Error: Input is not valid Plateau';
      }
    }
    return returnValue;
  }

  function checkArrayIsValidInt(givenArray) {
    return givenArray.every(function (e) {
      return Number.isInteger(e) && e > 0;
    });
  }

  return {
    getPlateauBoundary,
    checkArrayIsValidInt,
    validatePlateauBoundary,
    setPlateauBoundary,
  };
};
