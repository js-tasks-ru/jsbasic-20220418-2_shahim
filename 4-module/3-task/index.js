function highlight(table) {
  Object.values(table.querySelector('tbody').rows).forEach(item => {
    const rowCells = item.cells;
    if (rowCells[3]?.dataset?.available) {
      item.classList.add((rowCells[3].dataset.available == 'true') ? 'available' : 'unavailable');
    }
    else {
      item.hidden = 'true';
    }
    item.classList.add((rowCells[2].innerText === 'm') ? 'male' : 'female');
    item.style.textDecoration = (Number(rowCells[1].innerText) < 18) ? 'line-through' : '';
  });
}
