const ref = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};
let timerId = null;

ref.btnStart.addEventListener('click', () => {
  changeColor();
  timerId = setInterval(changeColor, 1000);
  btnDisabled(ref.btnStart, true);
  btnDisabled(ref.btnStop, false);
});
ref.btnStop.addEventListener('click', () => {
  clearInterval(timerId);
  btnDisabled(ref.btnStop, true);
  btnDisabled(ref.btnStart, false);
});
function changeColor() {
  document.querySelector('body').style.backgroundColor = getRandomHexColor();
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function btnDisabled(btn, value) {
  btn.disabled = value;
}
