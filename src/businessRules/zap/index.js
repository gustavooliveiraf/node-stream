const { boundingBoxFunc, checkLocation } = require('../commonRules');
const { pricingInfos, squareMeterValue, boundingBox } = require('./constants');

const checkUsableAreas = (register) => {
  try {
    if (register.usableAreas === 0) return false;
    if ((register.pricingInfos.price / register.usableAreas)
      <= squareMeterValue) return false;

    return true;
  } catch (err) {
    return false;
  }
};

const saleRule = (register) => {
  try {
    const { location } = register.address.geoLocation;
    const boundingBoxRule = boundingBoxFunc(location.lat, location.lon)
      ? boundingBox
      : pricingInfos.businessType.SALE;

    return register.pricingInfos.price >= boundingBoxRule;
  } catch (err) {
    return false;
  }
};

const main = (register) => {
  try {
    if (!checkLocation(register)) return false;

    if (register.pricingInfos.businessType === 'RENTAL') return register.pricingInfos.price >= pricingInfos.businessType.RENTAL;

    if (!checkUsableAreas(register)) return false;

    return saleRule(register);
  } catch (err) {
    return false;
  }
};

module.exports = {
  main,
  checkUsableAreas,
  saleRule,
};
