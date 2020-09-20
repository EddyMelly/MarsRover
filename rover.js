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

  //takes string of command characters and instructs rover, reports final position after attempting commands
  //will stop and report position early if move command directs Rover outside of plateau
  function receiveCommand(commandString) {
    for (let i = 0; i < commandString.length; i++) {
      if (commandString.charAt(i) === 'L') {
        turnLeft();
      }
      if (commandString.charAt(i) === 'R') {
        turnRight();
      }
      if (commandString.charAt(i) === 'M') {
        if (surveyAreaAhead()) {
          break;
        } else {
          moveForward();
        }
      }
    }
    return getPositionOrientationAsString();
  }

  //function surveys coordinates directly ahead and returns true if outside plateauBoundary
  function surveyAreaAhead() {
    let detectCollision;
    if (position.o === 'N') {
      detectCollision = collisionDetection({
        x: position.x,
        y: position.y + 1,
      });
    }
    if (position.o === 'E') {
      detectCollision = collisionDetection({
        x: position.x + 1,
        y: position.y,
      });
    }
    if (position.o === 'S') {
      detectCollision = collisionDetection({
        x: position.x,
        y: position.y - 1,
      });
    }
    if (position.o === 'W') {
      detectCollision = collisionDetection({
        x: position.x - 1,
        y: position.y,
      });
    }
    return detectCollision;
  }

  function collisionDetection(proposedNewPosition) {
    if (
      proposedNewPosition.x < plateauBoundary.startX ||
      proposedNewPosition.y < plateauBoundary.startY ||
      proposedNewPosition.x > plateauBoundary.endX ||
      proposedNewPosition.y > plateauBoundary.endY
    ) {
      return true;
    } else {
      return false;
    }
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
    collisionDetection,
  };
};
