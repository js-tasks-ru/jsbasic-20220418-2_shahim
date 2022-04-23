let calculator = {
  x: 0,
  y: 0,
  read: function(x, y) {
    this.x = x;
    this.y = y;
  },
  sum: function() {
    return this.x + this.y;
  },
  mul: function() {
    return this.x * this.y;
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
