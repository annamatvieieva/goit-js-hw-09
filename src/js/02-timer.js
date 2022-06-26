import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputDate = document.querySelector('[id="datetime-picker"]');
const btnStart = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  selectedDates: [],
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (options.defaultDate.getTime() < selectedDates[0].getTime()) {
      btnStart.disabled = false;
      Notify.success('Success!');
    } else {
      Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
    }
    options.selectedDates = selectedDates;
  },
};
let timerId = null;
let timer = {};

btnStart.disabled = true;

flatpickr(inputDate, options);
btnStart.addEventListener('click', () => {
  timerId = setInterval(createTimer, 1000);
});
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function createTimer() {
  const selectedDate = options.selectedDates[0].getTime();
  const defaultDate = Date.now();
  const dateDifference = selectedDate - defaultDate;
  timer = convertMs(dateDifference);
  days.textContent = addLeadingZero(timer.days);
  hours.textContent = addLeadingZero(timer.hours);
  minutes.textContent = addLeadingZero(timer.minutes);
  seconds.textContent = addLeadingZero(timer.seconds);
  if (
    timer.days <= 0 &&
    timer.hours <= 0 &&
    timer.minutes <= 0 &&
    timer.seconds <= 0
  ) {
    clearInterval(timerId);
  }
}
function addLeadingZero(value) {
  if (String(value).length < 2) {
    return String(value).padStart(2, '0');
  } else {
    return String(value);
  }
}
