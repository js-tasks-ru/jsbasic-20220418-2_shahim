function isValidNumber(item) {
  // Либо можно использовать функцию Number.isFinite(item)
  return !isNaN(item) && typeof item === 'number' && item !== (item + 1);
}


function sumSalary(salaries) {
  let resultSalary = 0;
  Object.values(salaries).forEach(item => {
    if (isValidNumber(item)) {
      resultSalary += item;
    }
  });
  return resultSalary;
}