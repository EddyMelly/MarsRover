const Rover = require('./Rover');
const cardinals = ['N', 'E', 'S', 'W'];

test('getPosition should return the correct position given', () => {
  const tempRover = Rover({ x: 5, y: 5 }, { x: 0, y: 1, o: 'S' }, cardinals);
  const position = tempRover.getPosition();

  expect(position).toStrictEqual({ x: 0, y: 1, o: 'S' });
});

test('getPosition should return new correct orientation after turning left from N', () => {
  const tempRover = Rover({ x: 5, y: 5 }, { x: 0, y: 1, o: 'N' }, cardinals);
  tempRover.turnLeft();
  const newOrientation = tempRover.getPosition();
  expect(newOrientation.o).toBe('W');
});

test('getPosition should return new correct orientation after turning right from N', () => {
  const tempRover = Rover({ x: 5, y: 5 }, { x: 0, y: 1, o: 'N' }, cardinals);
  tempRover.turnRight();
  const newOrientation = tempRover.getPosition();
  expect(newOrientation.o).toBe('E');
});

test('getPositionOrientationAsString should return both position and orientation as string after no changes', () => {
  const tempRover = Rover({ x: 5, y: 5 }, { x: 0, y: 1, o: 'N' }, cardinals);
  const stringPositionOrientation = tempRover.getPositionOrientationAsString();
  expect(stringPositionOrientation).toBe('0 1 N');
});

test('getPositionOrientationAsString should return both position and altered orientation as string after turnLeft', () => {
  const tempRover = Rover({ x: 5, y: 5 }, { x: 0, y: 1, o: 'N' }, cardinals);
  tempRover.turnLeft();
  const stringPositionOrientation = tempRover.getPositionOrientationAsString();
  expect(stringPositionOrientation).toBe('0 1 W');
});

test('setOrientation should not change orientation if given invalid cardinal', () => {
  const tempRover = Rover({ x: 5, y: 5 }, { x: 0, y: 1, o: 'N' }, cardinals);
  tempRover.setOrientation('Z');
  const returnedPosition = tempRover.getPosition();
  expect(returnedPosition.o).toBe('N');
});

test('setOrientation should change orientation if given valid cardinal', () => {
  const tempRover = Rover({ x: 5, y: 5 }, { x: 0, y: 1, o: 'N' }, cardinals);
  tempRover.setOrientation('E');
  const returnedPosition = tempRover.getPosition();
  expect(returnedPosition.o).toBe('E');
});

test('recieveCommand should parse all inputs correctly and report correct position and orientation', () => {
  const tempRover = Rover({ x: 5, y: 5 }, { x: 1, y: 2, o: 'N' }, cardinals);
  const stringPositionOrientation = tempRover.receiveCommand('LMLMLMLMM');
  expect(stringPositionOrientation).toBe('1 3 N');
});

test('recieveCommand should parse all inputs correctly and report correct position and orientation', () => {
  const tempRover = Rover({ x: 5, y: 5 }, { x: 3, y: 3, o: 'E' }, cardinals);
  const stringPositionOrientation = tempRover.receiveCommand('MMRMMRMRRM');
  expect(stringPositionOrientation).toBe('5 1 E');
});
