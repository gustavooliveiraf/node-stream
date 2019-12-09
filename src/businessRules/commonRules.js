const minlon = -46.693419;
const minlat = -23.568704;
const maxlon = -46.641146;
const maxlat = -23.546686;

const boundingBoxFunc = (lat, lon) => {
  if (lat < minlat || lat > maxlat) return false;
  if (lon < minlon || lon > maxlon) return false;

  return true;
};

const checkLocation = (register) => {
  try {
    if (register.address.geoLocation.location.lat !== 0
      && register.address.geoLocation.location.lon !== 0) {
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
};

module.exports = {
  boundingBoxFunc,
  checkLocation,
};
