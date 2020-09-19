const RoverCommand = require('./roverCommand');

test('checkArrayIsInt should return false when given array including letters', () => {
  const tempRoverCommand = RoverCommand();
  const isInt = tempRoverCommand.checkArrayIsValidInt([4, 5, 'Y']);
  expect(isInt).toBe(false);
});

test('checkArrayIsInt should return true when given array including only integers', () => {
  const tempRoverCommand = RoverCommand();
  const isInt = tempRoverCommand.checkArrayIsValidInt([4, 5, 6]);
  expect(isInt).toBe(true);
});

test('checkArrayIsInt should return false when array includes int <= 0', () => {
  const tempRoverCommand = RoverCommand();
  const isInt = tempRoverCommand.checkArrayIsValidInt([4, 5, 0]);
  expect(isInt).toBe(false);
});

test('validatePlateauBoundary should return error when given input too long', () => {
  const tempRoverCommand = RoverCommand();
  const isError = tempRoverCommand.validatePlateauBoundary('5 5 5');
  expect(isError.data).toBe('Error: Plateau input too long or short');
});

test('validatePlateauBoundary should return error when given input too short', () => {
  const tempRoverCommand = RoverCommand();
  const isError = tempRoverCommand.validatePlateauBoundary('5');
  expect(isError.data).toBe('Error: Plateau input too long or short');
});

test('validatePlateauBoundary should return object when given correct input', () => {
  const tempRoverCommand = RoverCommand();
  const isObject = tempRoverCommand.validatePlateauBoundary('5 5');
  expect(isObject.data).toStrictEqual({ x: 5, y: 5 });
});

test('setPlateauBoundary should assign objects plateauBoundary when given correct input', () => {
  const tempRoverCommand = RoverCommand();
  tempRoverCommand.setPlateauBoundary('5 7');
  const plateauAfterSet = tempRoverCommand.getPlateauBoundary();
  expect(plateauAfterSet).toStrictEqual({ x: 5, y: 7 });
});

test('setPlateauBoundary should return error if given input too short', () => {
  const tempRoverCommand = RoverCommand();
  const returnedError = tempRoverCommand.setPlateauBoundary('5');
  expect(returnedError.data).toBe('Error: Plateau input too long or short');
});

test('setPlateauBoundary should return error if given non valid plateau characters', () => {
  const tempRoverCommand = RoverCommand();
  const returnedError = tempRoverCommand.setPlateauBoundary('5 Y');
  expect(returnedError.data).toBe('Error: Input is not valid Plateau');
});

test('checkWithinPlateau should return false if given coOrdinates outside plateau area', () => {
  const tempRoverCommand = RoverCommand();
  tempRoverCommand.setPlateauBoundary('6 6');
  const returnValue = tempRoverCommand.checkWithinPlateau({ x: 7, y: 7 });
  expect(returnValue).toStrictEqual(false);
});

test('validateStartingPosition should return error if input too long', () => {
  const tempRoverCommand = RoverCommand();
  const returnError = tempRoverCommand.validateStartingPosition('3 3 3 E');
  expect(returnError.data).toBe('Error: Starting coords too long or short');
});

test('validateStartingPosition should return error if input includes invalid cardinal e.g Z', () => {
  const tempRoverCommand = RoverCommand();
  const returnError = tempRoverCommand.validateStartingPosition('3 3 Z');
  expect(returnError.data).toBe('Error: Coordinate values not valid');
});
test('validateStartingPosition should return object given correct input', () => {
  const tempRoverCommand = RoverCommand();
  const returnError = tempRoverCommand.validateStartingPosition('3 3 N');
  expect(returnError.data.x).toBe(3);
  expect(returnError.data.y).toBe(3);
  expect(returnError.data.o).toBe('N');
});
