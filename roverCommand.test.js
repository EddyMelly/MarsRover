const RoverCommand = require('./roverCommand');

test('empty test for usage', () => {
  const tempRoverCommand = RoverCommand();
  tempRoverCommand.setPlateauBoundary('5 5');
});

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
  expect(isError).toBe('Error: input too long or short');
});

test('validatePlateauBoundary should return error when given input too short', () => {
  const tempRoverCommand = RoverCommand();
  const isError = tempRoverCommand.validatePlateauBoundary('5');
  expect(isError).toBe('Error: input too long or short');
});

test('validatePlateauBoundary should return object when given correct input', () => {
  const tempRoverCommand = RoverCommand();
  const isObject = tempRoverCommand.validatePlateauBoundary('5 5');
  expect(isObject).toStrictEqual({ x: 5, y: 5 });
});

test('setPlateauBoundary should assing objects plateauBoundary when given correct input', () => {
  const tempRoverCommand = RoverCommand();
  tempRoverCommand.setPlateauBoundary('5 7');
  const plateauAfterSet = tempRoverCommand.getPlateauBoundary();
  expect(plateauAfterSet).toStrictEqual({ x: 5, y: 7 });
});
