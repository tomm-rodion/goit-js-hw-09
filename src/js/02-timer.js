import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

console.log('HI Tomm');
const input = document.querySelector('#datetime-picker');
console.log(input);
const buttonStart = document.querySelector('button[data-start]');
console.log(buttonStart);
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
console.log(seconds);
console.log(days);
buttonStart.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > new Date()) {
      buttonStart.removeAttribute('disabled');
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      buttonStart.setAttribute('disabled', 'disabled');
    }
  },
};

const dataPickr = flatpickr(input, options);
flatpickr(input, options);

buttonStart.addEventListener('click', onStart);

function onStart() {
  const startTime = dataPickr.selectedDates[0];
  console.log(startTime);

  const myInterval = setInterval(() => {
    const currentTime = Date.now();
    const valueTimeForTimer = startTime - currentTime;
    console.log(valueTimeForTimer);

    const time = convertMs(valueTimeForTimer);

    if (valueTimeForTimer > currentTime) {
      clearInterval(myInterval);
      return;
    }
    days.textContent = time.days;
    hours.textContent = time.hours;
    minutes.textContent = time.minutes;
    seconds.textContent = time.seconds;
    console.log(days.textContent);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
