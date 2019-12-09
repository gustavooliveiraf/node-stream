const pricingInfos = {
  businessType: {
    RENTAL: 3500,
    SALE: 600000,
  },
};
const squareMeterValue = 3500;
const boundingBox = pricingInfos.businessType.SALE * (1 - 0.1);

module.exports = {
  pricingInfos,
  squareMeterValue,
  boundingBox,
};
