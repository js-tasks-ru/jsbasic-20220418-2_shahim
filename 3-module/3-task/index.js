function camelize(str) {
  result = str.split('-').map((item, ind) => {
    if (ind > 0) {
      return item[0].toUpperCase() + item.slice(1);
    }
    return item;
  }).join('');
  return result;
}
