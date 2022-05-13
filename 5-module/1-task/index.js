function hideSelf() {
  // добавит скрытие по нажатию на все кнопки с классом hide-self-button
  const btns = document.getElementsByClassName('hide-self-button');
  Array.from(btns).forEach(item => {
    item.addEventListener('click', (e) => e.target.hidden = !e.target.hidden);
  });
}
