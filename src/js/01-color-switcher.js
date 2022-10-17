function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const bodyStyle = document.querySelector('body');
console.log(buttonStart);
console.log(buttonStop);
let timerId = null;

buttonStart.addEventListener('click', onStartRandomBgColor);
buttonStop.addEventListener('click', onStopRandomBgColor);

function onStartRandomBgColor(event) {
  timerId = setInterval(() => {
    bodyStyle.style.backgroundColor = getRandomHexColor();
    buttonStart.setAttribute('disabled', 'disabled');
  }, 1000);
}

function onStopRandomBgColor(event) {
  clearInterval(timerId);
  buttonStart.removeAttribute('disabled');
  buttonStart.setAttribute('type', 'button');
}
