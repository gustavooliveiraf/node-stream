const { checkMonthlyCondoFee, rentalRule, main } = require('../index');
const payload = require('../../../mock/source-sample');

describe('Immobile', () => {
  describe('Business rules', () => {
    describe('Viva real', () => {
      describe('Success', () => {
        describe('Function checkMonthlyCondoFee', () => {
          test('isNaN', async () => {
            const payloadCopy = JSON.parse(JSON.stringify(payload[0]));
            payloadCopy.pricingInfos.monthlyCondoFee = 'Not a Number';

            const res = checkMonthlyCondoFee(payloadCopy);

            expect(res).toBe(false);
          });

          test('monthlyCondoFee >= price * condoValue', async () => {
            const payloadCopy = JSON.parse(JSON.stringify(payload[0]));
            payloadCopy.pricingInfos.monthlyCondoFee = 999999;

            const res = checkMonthlyCondoFee(payloadCopy);

            expect(res).toBe(false);
          });
          test('Function checkMonthlyCondoFee', async () => {
            const res = checkMonthlyCondoFee(payload[0]);

            expect(res).toBe(true);
          });
        });

        describe('Function rentalRule', () => {
          test('boundingBoxFunc === true', async () => {
            const payloadCopy = JSON.parse(JSON.stringify(payload[0]));
            payloadCopy.address.geoLocation.location.lat = -23.55;
            payloadCopy.address.geoLocation.location.lon = -46.65;

            const res = rentalRule(payload[0]);

            expect(res).toBe(false);
          });

          test('boundingBoxFunc === false', async () => {
            const res = rentalRule(payload[0]);

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

          test('Rental', async () => {
            const payloadCopy = JSON.parse(JSON.stringify(payload[0]));
            payloadCopy.pricingInfos.businessType = 'RENTAL';

            const res = main(payload[0]);

            expect(res).toBe(true);
          });

          test("businessType === 'SALE'", async () => {
            const payloadCopy = JSON.parse(JSON.stringify(payload[0]));

            const res = main(payloadCopy);

            expect(res).toBe(true);
          });

          test('checkMonthlyCondoFee', async () => {
            const payloadCopy = JSON.parse(JSON.stringify(payload[0]));
            payloadCopy.pricingInfos.businessType = 'RENTAL';
            payloadCopy.pricingInfos.monthlyCondoFee = 'Not a Number';

            const res = main(payloadCopy);

            expect(res).toBe(false);
          });

          test('rentalRule', async () => {
            const payloadCopy = JSON.parse(JSON.stringify(payload[0]));
            payloadCopy.pricingInfos.businessType = 'RENTAL';

            const res = main(payloadCopy);

            expect(res).toBe(false);
          });
        });
      });

      describe('Error catch', () => {
        describe('Function checkMonthlyCondoFee', () => {
          test('catch', async () => {
            const payloadCopy = undefined;

            const res = checkMonthlyCondoFee(payloadCopy);

            expect(res).toBe(false);
          });
        });

        describe('Function rentalRule', () => {
          test('catch', async () => {
            const payloadCopy = undefined;

            const res = rentalRule(payloadCopy);

            expect(res).toBe(false);
          });
        });

        describe('Function main', () => {
          test('catch', async () => {
            const payloadCopy = JSON.parse(JSON.stringify(payload[0]));
            payloadCopy.pricingInfos = undefined;

            const res = main(payloadCopy);

            expect(res).toBe(false);
          });
        });
      });
    });
  });
});
