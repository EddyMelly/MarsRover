module.exports = function newRover(plateauBoundary, startPosition, cardinals) {
  var cardinals = cardinals;
  var position = startPosition;
  var plateauBoundary = plateauBoundary;

  function getPosition() {
    return position;
  }

  function getPositionOrientationAsString() {
    return `${position.x} ${position.y} ${position.o}`;
  }

  function setOrientation(newOrientation) {
    position.o = newOrientation;
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
  }

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

  function turnRight() {
    const currentOrientation = cardinals.findIndex(
      (element) => element === position.o
    );
    if (currentOrientation === 4) {
      position.o = cardinals[0];
    } else {
      position.o = cardinals[currentOrientation + 1];
    }
    return position.o;
  }

  function moveForward() {
    //move direction dependant on orientation
    switch (position.o) {
      case 'N':
        this.position.y = this.position.y + 1;
        break;
      case 'E':
        this.position.x = this.position.x + 1;
        break;
      case 'S':
        this.position.y = this.position.y - 1;
        break;
      case 'W':
        this.position.x = this.position.x - 1;
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
