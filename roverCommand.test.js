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
  expect(isObject.data).toStrictEqual({ endX: 5, endY: 5 });
});

test('setPlateauBoundary should assign objects plateauBoundary when given correct input', () => {
  const tempRoverCommand = RoverCommand();
  tempRoverCommand.setPlateauBoundary('5 7');
  const plateauAfterSet = tempRoverCommand.getPlateauBoundary();
  expect(plateauAfterSet.endX).toStrictEqual(5);
  expect(plateauAfterSet.endY).toStrictEqual(7);
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

test('checkArrayIsValidCommand should return false when given non command letters e.g Z', () => {
  const tempRoverCommand = RoverCommand();
  const returnValue = tempRoverCommand.checkArrayIsValidCommand([
    'L',
    'R',
    'Z',
  ]);
  expect(returnValue).toStrictEqual(false);
});

test('checkArrayIsValidCommand should return true when given correct command letters', () => {
  const tempRoverCommand = RoverCommand();
  const returnValue = tempRoverCommand.checkArrayIsValidCommand([
    'L',
    'R',
    'M',
  ]);
  expect(returnValue).toStrictEqual(true);
});

test('validateRoverCommand should return false and give error if given unusable command string', () => {
  const tempRoverCommand = RoverCommand();
  const validatedRoverCommand = tempRoverCommand.validateRoverCommand('LRM0');
  expect(validatedRoverCommand.success).toStrictEqual(false);
  expect(validatedRoverCommand.data).toBe('Error: Invalid command string');
});

test('validateRoverCommand should return true and return Chars if given usable command string', () => {
  const tempRoverCommand = RoverCommand();
  const validatedRoverCommand = tempRoverCommand.validateRoverCommand(
    'LRLRLRM'
  );
  expect(validatedRoverCommand.success).toStrictEqual(true);
  expect(validatedRoverCommand.data).toBe('LRLRLRM');
});

test('deployAndCommandRover should take an object of starting position and commands and return an object with error if starting position is outside of current Plateua', () => {
  const tempRoverCommand = RoverCommand();
  const returnedObject = tempRoverCommand.deployAndCommandRover({
    startingInput: '6 6 N',
    command: 'LMLMLMLMLM',
  });
  expect(returnedObject.success).toStrictEqual(false);
  expect(returnedObject.data).toBe('Error: Coordinate values not valid');
});

test('deployAndCommandRover should take an object of starting position and commands and return an object with error if starting position is too long or short', () => {
  const tempRoverCommand = RoverCommand();
  const returnedObject = tempRoverCommand.deployAndCommandRover({
    startingInput: '6 6 7 N',
    command: 'LMLMLMLMLM',
  });
  expect(returnedObject.success).toStrictEqual(false);
  expect(returnedObject.data).toBe('Error: Starting coords too long or short');
});

test('deployAndCommandRover should take an object of starting position and commands and return an object with truthy success and string new position', () => {
  const tempRoverCommand = RoverCommand();
  const returnedObject = tempRoverCommand.deployAndCommandRover({
    startingInput: '1 2 N',
    command: 'LMLMLMLMM',
  });
  expect(returnedObject.success).toStrictEqual(true);
  expect(returnedObject.data).toBe('1 3 N');
});

test('deployAndCommandRover should take an object of starting position and commands and return an object with truthy success and string new position', () => {
  const tempRoverCommand = RoverCommand();
  const returnedObject = tempRoverCommand.deployAndCommandRover({
    startingInput: '3 3 E',
    command: 'MMRMMRMRRM',
  });
  expect(returnedObject.success).toStrictEqual(true);
  expect(returnedObject.data).toBe('5 1 E');
});

test('receiveCommandString should take an string of inputs and return an array of objects with the rover responses', () => {
  const tempRoverCommand = RoverCommand();
  const returnedArrayOfReports = tempRoverCommand.receiveCommandString(
    `1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM`
  );
  expect(returnedArrayOfReports[0]).toStrictEqual({
    success: true,
    data: '1 3 N',
  });
  expect(returnedArrayOfReports[1]).toStrictEqual({
    success: true,
    data: '5 1 E',
  });
});
