import { Notify } from 'notiflix/build/notiflix-notify-aio';

const firstDelay = document.querySelector('input[name="delay"]');
const delayStep = document.querySelector('input[name="step"]');
const formAmount = document.querySelector('input[name="amount"]');
const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();
  outputMessage();
});
  
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}
function outputMessage() {
  let delay = +firstDelay.value;
  let step = +delayStep.value;
  let amount = +formAmount.value;

  for (let i = 0; i < amount; i++) {
    let curDelay = delay + step * i;

    setTimeout(() => {
      createPromise(i + 1, curDelay)
        .then(({ position, delay }) => {
          Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        });
    }, curDelay);
  }
}
