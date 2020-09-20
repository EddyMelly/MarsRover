module.exports = function newRover(
  plateauBoundaryInput,
  startPosition,
  givenCardinals
) {
  const cardinals = givenCardinals;
  let position = startPosition;
  const plateauBoundary = plateauBoundaryInput;

  function getPosition() {
    return position;
  }

  function getPositionOrientationAsString() {
    return `${position.x} ${position.y} ${position.o}`;
  }

  function setOrientation(newOrientation) {
    let suggestedOrientation = newOrientation.toUpperCase();
    if (cardinals.includes(suggestedOrientation)) position.o = newOrientation;
  }

  function receiveCommand(commandString) {
    for (const char of commandString) {
      switch (char) {
        case 'L':
          turnLeft();
          break;
        case 'R':
          turnRight();
          break;
        case 'M':
          moveForward();
          break;
      }
    }
    return getPositionOrientationAsString();
  }

  //changes orientation of Rover 90 degrees to the Left
  function turnLeft() {
    const currentOrientation = cardinals.findIndex(
      (element) => element === position.o
    );
    if (currentOrientation === 0) {
      position.o = cardinals[cardinals.length - 1];
    } else {
      position.o = cardinals[currentOrientation - 1];
    }
  }

  //changes orientation of Rover 90 degrees to the Right
  function turnRight() {
    const currentOrientation = cardinals.findIndex(
      (element) => element === position.o
    );
    if (currentOrientation === cardinals.length - 1) {
      position.o = cardinals[0];
    } else {
      position.o = cardinals[currentOrientation + 1];
    }
  }

  //Moves position coordinates of rover forward based on orientation
  function moveForward() {
    switch (position.o) {
      case 'N':
        position.y = position.y + 1;
        break;
      case 'E':
        position.x = position.x + 1;
        break;
      case 'S':
        position.y = position.y - 1;
        break;
      case 'W':
        position.x = position.x - 1;
        break;
    }
  }

  return {
    moveForward,
    turnRight,
    turnLeft,
    receiveCommand,
    setOrientation,
    getPosition,
    getPositionOrientationAsString,
  };
};
