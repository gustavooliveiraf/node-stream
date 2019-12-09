const request = require('supertest');

const app = require('../../../../../app.js');

// ========================= payloads =========================
// const guid = guidTest;
// const authentication = `bearer ${tokenTest}`;

// ========================= start test =========================
describe('integration test immobile', () => {
  describe('Success', () => {
    test('/list', async () => {
      try {
        const resZap = await request(app)
          .get('/list/zap')
          .expect(200);

        const resVivaReal = await request(app)
          .get('/list/viva-real')
          .expect(200);

        expect(resZap.body.length).toBe(3941);
        expect(resVivaReal.body.length).toBe(4922);
      } catch (err) {
        expect(1).toBeNull();
      }
    });
  });

  describe('Error - Portal that does not exist', () => {
    test('/list', async () => {
      try {
        const res = await request(app)
          .get('/list/unlisted')
          .expect(422);

        expect(res.body.error).toBe('Unprocessable Entity');
      } catch (err) {
        expect(1).toBeNull();
      }
    });
  });
});
