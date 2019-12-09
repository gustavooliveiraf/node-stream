const findAll = require('../findAll');

describe('InterfaceRepositories', () => {
  describe('findAll', () => {
    // describe('Success', () => {}); // Already covered Success

    describe('Error catch', () => {
      test('Error catch', async () => {
        const registers = undefined;
        const businessRulesCore = undefined;

        const resp = findAll(registers)(businessRulesCore);

        expect(resp).toBe("Cannot read property 'length' of undefined");
      });
    });
  });
});
