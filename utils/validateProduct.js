const validateProduct = (a, b) => {
  if (
    a.localeCompare(b, undefined, {
      sensitivity: "base",
    }) === 0
  ) {
    console.log("VALID ", a, b);
    return true;
  }
  return false;
};

module.exports = { validateProduct };
