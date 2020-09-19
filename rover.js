const cardinals = ['N', 'E', 'S', 'W'];

module.exports = function newRover(
  plateauBoundary,
  startPosition,
  startOrientation
) {
  // constructor(plateauBoundary, startPosition, startOrientation) {
  //   this.position = startPosition;
  //   this.orientation = startOrientation;
  //   this.plateauBoundary = plateauBoundary;
  // }
  var position = startPosition;
  var orientation = startOrientation;
  var plateauBoundary = plateauBoundary;

  function getPosition() {
    return position;
  }

  function getOrientation() {
    return orientation;
  }

  function setOrientation(newOrientation) {
    orientation = newOrientation;
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
      (element) => element === orientation
    );
    if (currentOrientation === 0) {
      orientation = cardinals[cardinals.length - 1];
    } else {
      orientation = cardinals[currentOrientation - 1];
    }
  }

  function turnRight() {
    const currentOrientation = cardinals.findIndex(
      (element) => element === this.orientation
    );
    console.log(this.orientation);
    if (currentOrientation === 4) {
      orientation = cardinals[0];
    } else {
      orientation = cardinals[currentOrientation + 1];
    }
    return orientation;
  }

  function moveForward() {
    //move direction dependant on orientation
    switch (this.orientation) {
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
    }
  }

  return {
    moveForward,
    turnRight,
    turnLeft,
    receiveCommand,
    setOrientation,
    getOrientation,
    getPosition,
  };
};
