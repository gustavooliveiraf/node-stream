const findAll = require('../findAll');

const res = {
  statusCode: undefined,
  status(statusCode) {
    this.statusCode = statusCode;
    return this;
  },
  json(obj) {
    this.final = obj;
    return this.final;
  },
  final: undefined,
};

describe('Controllers', () => {
  describe('findAll', () => {
    // describe('Success', () => {}); // Already covered Success

    describe('Error catch', () => {
      test('Error catch', async () => {
        const businessRules = undefined;
        const userRepository = undefined;
        const req = undefined;

        const resp = findAll(businessRules)(userRepository)(req, res);

        expect(resp.error).toBe('Server Error');
      });
    });
  });
});
