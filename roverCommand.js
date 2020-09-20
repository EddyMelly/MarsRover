const Rover = require('./rover.js');

module.exports = function newRoverCommand(plateauBoundaryInput) {
  const cardinals = ['N', 'E', 'S', 'W'];
  const commands = ['L', 'R', 'M'];
  var roversResponses = [];
  var plateauBoundary;
  if (!plateauBoundaryInput) {
    plateauBoundary = { startX: 0, startY: 0, endX: 5, endY: 5 };
  } else {
    plateauBoundary = plateauBoundaryInput;
  }

  function getPlateauBoundary() {
    return plateauBoundary;
  }
  function setPlateauBoundary(plateauInput) {
    let validatedPlateauInput = validatePlateauBoundary(plateauInput);
    if (validatedPlateauInput.success) {
      plateauBoundary.endX = validatedPlateauInput.data.endX;
      plateauBoundary.endY = validatedPlateauInput.data.endY;
    } else {
      return validatedPlateauInput;
    }
  }

  /*Recieves and parses input string to form rover command objects
  stores and returns any response from rover command attempt */
  function receiveCommandString(inputString) {
    let workingInputString = inputString;
    var arrayOfInputStrings = [];
    arrayOfInputStrings = workingInputString.split(/\r?\n/);
    if (arrayOfInputStrings.length % 2 === 0) {
      for (let i = 0; i < arrayOfInputStrings.length; i = i + 2) {
        let tempCommandObject = {
          startingInput: arrayOfInputStrings[i],
          command: arrayOfInputStrings[i + 1],
        };
        roversResponses.push(deployAndCommandRover(tempCommandObject));
      }
      return roversResponses;
    } else {
      return 'ERROR: Odd number of commands';
    }
  }

  /*Function to deploy and command a single Rover.
  Performs validation checks on given object data.
  If validation is successful:
    -creates Rover object at given starting location
    -commands Rover to move and report final location 
    -returns object containing:
      -'success' value of 'true'
      -'data' value of String describing rovers last position
  If validation is unsuccessful:
    -returns object containing:
      -'success' value of 'false'
      -'data' value of String describing and Error*/
  function deployAndCommandRover(commandObject) {
    const startingPositionValidated = validateStartingPosition(
      commandObject.startingInput
    );
    const roverCommandValidated = validateRoverCommand(commandObject.command);
    if (startingPositionValidated.success) {
      if (roverCommandValidated.success) {
        const deployedRover = Rover(
          plateauBoundary,
          startingPositionValidated.data,
          cardinals
        );
        return {
          success: true,
          data: deployedRover.receiveCommand(roverCommandValidated.data),
        };
      } else {
        return {
          success: roverCommandValidated.success,
          data: roverCommandValidated.data,
        };
      }
    } else {
      return {
        success: startingPositionValidated.success,
        data: startingPositionValidated.data,
      };
    }
  }

  /*Validation function to ensure the given command String is:
      -Comprised of characters that are valid commands
    If validation is successful, returns an object containing:
      -'success' value of 'true'
      -'data' value of command string formatted to upper case
    If validation is unsuccessful, returns an object containing:
      -'success' value of 'false'
      -'data' value of String describing an Error*/
  function validateRoverCommand(commandInput) {
    const upperCaseCommand = commandInput.toUpperCase();
    const commandArray = [...upperCaseCommand];
    if (checkArrayIsValidCommand(commandArray)) {
      return {
        success: true,
        data: upperCaseCommand,
      };
    } else {
      return {
        success: false,
        data: 'Error: Invalid command string',
      };
    }
  }

  /*Validation function to ensure the given starting position input String is:
      - The correct length of characters
      - The coOrdinates are of type int and greater than 0
      - The coOrdinates fall within the current plateau
      - The given orientation is a valid cardinal
    If validation is successful, returns an object containing:
      - 'success' value of 'true'
      - 'data' value of object including the x, y starting coordinates and orientation
    If validation is unsuccessful, returns an object containing:
      - 'success' value of 'false'
      - 'data' value of String describing an Error */
  function validateStartingPosition(startingPositionInput) {
    const startingPositionModified = startingPositionInput.split(' ');
    if (startingPositionModified.length !== 3) {
      return {
        success: false,
        data: 'Error: Starting coords too long or short',
      };
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
        return {
          success: true,
          data: {
            x: parseInt(startingPositionModified[0]),
            y: parseInt(startingPositionModified[1]),
            o: startingPositionModified[2],
          },
        };
      } else {
        return {
          success: false,
          data: 'Error: Coordinate values not valid',
        };
      }
    }
  }

  /* Validation function to ensure that the given plateau String is:
    - The correct length of characters
    - All characters are an Integer greater than 0
  If validation is successful returns an object containing: 
    - 'success' value of true
    - 'data' value of object including the endX and endY coordinates
  If validation is unsuccessful returns an object containing:
    - 'success' value of false
    - 'data' value of String describing an Error */
  function validatePlateauBoundary(plateauInput) {
    let returnValue;
    const plateauInputModified = plateauInput.split(' ').map(Number);
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
            endX: plateauInputModified[0],
            endY: plateauInputModified[1],
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

  /*  Helper function that checks a given array of characters
  Returns true if all characters are a valid integer greater than 0 */
  function checkArrayIsValidInt(givenArray) {
    return givenArray.every(function (e) {
      return Number.isInteger(e) && e > 0;
    });
  }

  //Helper function that checks a given array of characters
  //return true if all characters are found within the command array
  function checkArrayIsValidCommand(charArray) {
    return charArray.every(function (e) {
      return commands.includes(e);
    });
  }

  //Helper function to ensure that the given starting point falls within the current plateau boundaries
  function checkWithinPlateau(startingObject) {
    if (
      startingObject.x < plateauBoundary.startX ||
      startingObject.x > plateauBoundary.endX ||
      startingObject.y < plateauBoundary.startY ||
      startingObject.y > plateauBoundary.endY
    ) {
      return false;
    } else {
      return true;
    }
  }

  return {
    getPlateauBoundary,
    setPlateauBoundary,
    receiveCommandString,
    checkArrayIsValidInt,
    validatePlateauBoundary,
    checkWithinPlateau,
    validateStartingPosition,
    validateRoverCommand,
    checkArrayIsValidCommand,
    deployAndCommandRover,
  };
};
