const Rover = require('./rover.js');

module.exports = function newRoverCommand() {
  const cardinals = ['N', 'E', 'S', 'W'];
  var rovers = [];
  var plateauBoundary = { x: 5, y: 5 };
  function getPlateauBoundary() {
    return plateauBoundary;
  }

  function deployRover(startingPositionInput) {
    let validatedStartingPosition = validateStartingPosition(
      startingPositionInput
    );
    if (validatedStartingPosition.success) {
      return Rover(plateauBoundary, validatedStartingPosition.data, cardinals);
    } else {
      return validatedStartingPosition;
    }
  }

  function setPlateauBoundary(plateauInput) {
    let validatedPlateauInput = validatePlateauBoundary(plateauInput);
    if (validatedPlateauInput.success) {
      plateauBoundary = validatedPlateauInput.data;
    } else {
      return validatedPlateauInput;
    }
  }

  function validateStartingPosition(startingInput) {
    //validate given starting position
    let returnValue;
    let startingPositionModified = startingInput.split(' ');
    //check that length is correct
    if (startingPositionModified.length !== 3) {
      return (returnValue = {
        success: false,
        data: 'Error: Starting coords too long or short',
      });
    } else {
      if (
        checkArrayIsValidInt([
          parseInt(startingPositionModified[0]),
          parseInt(startingPositionModified[1]),
        ]) &&
        checkWithinPlateau({
          x: startingPositionModified[0],
          y: startingPositionModified[1],
        }) &&
        cardinals.includes(startingPositionModified[2])
      ) {
        return (returnValue = {
          success: true,
          data: {
            x: parseInt(startingPositionModified[0]),
            y: parseInt(startingPositionModified[1]),
            o: startingPositionModified[2],
          },
        });
      } else {
        return (returnValue = {
          success: false,
          data: 'Error: Coordinate values not valid',
        });
      }
    }
  }

  function checkWithinPlateau(startingObject) {
    if (
      startingObject.x < 0 ||
      startingObject.x > plateauBoundary.x ||
      startingObject.y < 0 ||
      startingObject.y > plateauBoundary.y
    ) {
      return false;
    } else {
      return true;
    }
  }

  function validatePlateauBoundary(plateauInput) {
    //validate given plateau
    let returnValue;
    let plateauInputModified = plateauInput.split(' ').map(Number);
    if (plateauInputModified.length !== 2) {
      returnValue = {
        success: false,
        data: 'Error: Plateau input too long or short',
      };
    } else {
      if (checkArrayIsValidInt(plateauInputModified)) {
        returnValue = {
          success: true,
          data: {
            x: plateauInputModified[0],
            y: plateauInputModified[1],
          },
        };
      } else {
        returnValue = {
          success: false,
          data: 'Error: Input is not valid Plateau',
        };
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
    checkWithinPlateau,
    validateStartingPosition,
    deployRover,
  };
};
