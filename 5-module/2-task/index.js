function toggleText() {
  const text = document.getElementById('text');
  const btn = document.getElementsByClassName('toggle-text-button')[0];
  btn.addEventListener('click', () => text.hidden = !text.hidden);
}
