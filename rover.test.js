const Rover = require('./Rover');
const RoverCommand = require('./roverCommand');

test('should return the correct position given', () => {
  const tempRover = Rover({ x: 5, y: 5 }, { x: 0, y: 1 }, 'S');
  const position = tempRover.getPosition();

  expect(position).toStrictEqual({ x: 0, y: 1 });
});

test('should return new correct orientation after turning left from N', () => {
  const tempRover = Rover({ x: 5, y: 5 }, { x: 0, y: 1 }, 'N');
  tempRover.turnLeft();
  const newOrientation = tempRover.getOrientation();
  expect(newOrientation).toBe('W');
});
