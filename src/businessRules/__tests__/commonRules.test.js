const { boundingBoxFunc, checkLocation } = require('../commonRules');
const payload = require('../../mock/source-sample');

describe('Immobile', () => {
  describe('Business rules', () => {
    describe('commonRules', () => {
      describe('Success', () => {
        describe('boundingBoxFunc', () => {
          test('return false', async () => {
            const lat = -23.55;
            const lon = 0;

            const res = boundingBoxFunc(lat, lon);

            expect(res).toBe(false);
          });

          test('return true', async () => {
            const lat = -23.55;
            const lon = -46.65;

            const res = boundingBoxFunc(lat, lon);

            expect(res).toBe(true);
          });
        });

        describe('checkLocation', () => {
          test('checkLocation return true', async () => {
            const payloadCopy = JSON.parse(JSON.stringify(payload[0]));
            payloadCopy.address.geoLocation.location.lat = 0;
            payloadCopy.address.geoLocation.location.lon = 0;

            const res = checkLocation(payloadCopy);

            expect(res).toBe(false);
          });

          test('checkLocation return false', async () => {
            const res = checkLocation(payload[0]);

            expect(res).toBe(true);
          });
        });
      });

      describe('Error catch', () => {
        test('Funtion checkLocation', async () => {
          const payloadCopy = undefined;

          const res = checkLocation(payloadCopy);

          expect(res).toBe(false);
        });
      });
    });
  });
});
