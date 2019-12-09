const { boundingBoxFunc, checkLocation } = require('../commonRules');
const { pricingInfos, condoValue, boundingBox } = require('./constants');

const checkMonthlyCondoFee = (register) => {
  try {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(register.pricingInfos.monthlyCondoFee)) return false;
    if (register.pricingInfos.monthlyCondoFee
      >= (register.pricingInfos.price * condoValue)) return false;

    return true;
  } catch (err) {
    return false;
  }
};

const rentalRule = (register) => {
  try {
    const { location } = register.address.geoLocation;
    const boundingBoxRule = boundingBoxFunc(location.lat, location.lon)
      ? pricingInfos.businessType.RENTAL * boundingBox
      : pricingInfos.businessType.RENTAL;

    return register.pricingInfos.price <= boundingBoxRule;
  } catch (err) {
    return false;
  }
};

const main = (register) => {
  try {
    if (!checkLocation(register)) return false;

    if (register.pricingInfos.businessType === 'SALE') return register.pricingInfos.price <= pricingInfos.businessType.SALE;

    if (!checkMonthlyCondoFee(register)) return false;

    return rentalRule(register);
  } catch (err) {
    return false;
  }
};

module.exports = {
  main,
  checkMonthlyCondoFee,
  rentalRule,
};
