const findAll = (registers) => (businessRulesCore) => {
  try {
    const res = [];

    const regLength = registers.length;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < regLength; i++) {
      const register = registers[i];

      if (businessRulesCore(register)) res.push(register);
    }

    return res;
  } catch (err) {
    return err.message;
  }
};

module.exports = findAll;
