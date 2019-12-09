const { checkUsableAreas, saleRule, main } = require('../index');
const payload = require('../../../mock/source-sample');

describe('Immobile', () => {
  describe('Business rules', () => {
    describe('Zap', () => {
      describe('Success', () => {
        describe('Function checkUsableAreas', () => {
          test('usableAreas === 0', async () => {
            const payloadCopy = JSON.parse(JSON.stringify(payload[0]));
            payloadCopy.usableAreas = 0;

            const res = checkUsableAreas(payloadCopy);

            expect(res).toBe(false);
          });

          test('price/usableAreas <= squareMeterValue', async () => {
            const payloadCopy = JSON.parse(JSON.stringify(payload[0]));
            payloadCopy.usableAreas = 999;

            const res = checkUsableAreas(payloadCopy);

            expect(res).toBe(false);
          });

          test('saleRule', async () => {
            const payloadCopy = JSON.parse(JSON.stringify(payload[0]));
            payloadCopy.usableAreas = 0.1;

            const res = checkUsableAreas(payloadCopy);

            expect(res).toBe(true);
          });
        });

        describe('Function saleRule', () => {
          test('boundingBoxFunc === true', async () => {
            const payloadCopy = JSON.parse(JSON.stringify(payload[0]));
            payloadCopy.address.geoLocation.location.lat = -23.55;
            payloadCopy.address.geoLocation.location.lon = -46.65;

            const res = saleRule(payloadCopy);

            expect(res).toBe(false);
          });

          test('boundingBoxFunc === false', async () => {
            const res = saleRule(payload[0]);

            expect(res).toBe(false);
          });
        });

        describe('Function main', () => {
          test('checkLocation', async () => {
            const payloadCopy = JSON.parse(JSON.stringify(payload[0]));
            payloadCopy.address.geoLocation.location.lat = 0;
            payloadCopy.address.geoLocation.location.lon = 0;

            const res = main(payloadCopy);

            expect(res).toBe(false);
          });

          test("businessType === 'RENTAL'", async () => {
            const payloadCopy = JSON.parse(JSON.stringify(payload[0]));
            payloadCopy.pricingInfos.businessType = 'RENTAL';

            const res = main(payloadCopy);

            expect(res).toBe(true);
          });

          test('checkUsableAreas', async () => {
            const payloadCopy = JSON.parse(JSON.stringify(payload[0]));
            payloadCopy.usableAreas = 0;

            const res = main(payloadCopy);

            expect(res).toBe(false);
          });

          test('saleRule', async () => {
            const payloadCopy = JSON.parse(JSON.stringify(payload[0]));

            const res = main(payloadCopy);

            expect(res).toBe(false);
          });
        });
      });

      describe('Error catch', () => {
        test('Funtion checkUsableAreas', async () => {
          const payloadCopy = undefined;

          const res = checkUsableAreas(payloadCopy);

          expect(res).toBe(false);
        });

        test('Function saleRule', async () => {
          const payloadCopy = undefined;

          const res = saleRule(payloadCopy);

          expect(res).toBe(false);
        });

        test('Function main', async () => {
          const payloadCopy = JSON.parse(JSON.stringify(payload[0]));
          payloadCopy.pricingInfos = undefined;

          const res = main(payloadCopy);

          expect(res).toBe(false);
        });
      });
    });
  });
});
