function makeDiagonalRed(table) {
  Object.values(table.rows).forEach((item, i) => {
    item.cells[i].style.backgroundColor = 'red';
  });
}
