function getMinMax(str) {
  let minMax = str.split(' ').reduce((result, item) => {
    if (Number(item)) {
      item = Number(item);
      if (!result.min || item < result.min) {
        result.min = item;
      }
      if (!result.max || item > result.max) {
        result.max = item;
      }
    }
    return result;
  }, {});
  return minMax;
}
