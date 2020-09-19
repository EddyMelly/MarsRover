const Rover = require('./Rover');
const cardinals = ['N', 'E', 'S', 'W'];

test('should return the correct position given', () => {
  const tempRover = Rover({ x: 5, y: 5 }, { x: 0, y: 1, o: 'S' }, cardinals);
  const position = tempRover.getPosition();

  expect(position).toStrictEqual({ x: 0, y: 1, o: 'S' });
});

test('should return new correct orientation after turning left from N', () => {
  const tempRover = Rover({ x: 5, y: 5 }, { x: 0, y: 1, o: 'N' }, cardinals);
  tempRover.turnLeft();
  const newOrientation = tempRover.getPosition();
  expect(newOrientation.o).toBe('W');
});

test('should return new correct orientation after turning right from N', () => {
  const tempRover = Rover({ x: 5, y: 5 }, { x: 0, y: 1, o: 'N' }, cardinals);
  tempRover.turnRight();
  const newOrientation = tempRover.getPosition();
  expect(newOrientation.o).toBe('E');
});

test('should return both position and orientation as string after no changes', () => {
  const tempRover = Rover({ x: 5, y: 5 }, { x: 0, y: 1, o: 'N' }, cardinals);
  const stringPositionOrientation = tempRover.getPositionOrientationAsString();
  expect(stringPositionOrientation).toBe('0 1 N');
});

test('should return both position and altered orientation as string after turnLeft', () => {
  const tempRover = Rover({ x: 5, y: 5 }, { x: 0, y: 1, o: 'N' }, cardinals);
  tempRover.turnLeft();
  const stringPositionOrientation = tempRover.getPositionOrientationAsString();
  expect(stringPositionOrientation).toBe('0 1 W');
});
