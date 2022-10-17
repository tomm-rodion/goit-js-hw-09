import Notiflix from 'notiflix';

const refs = {
  inputFirtDelay: document.querySelector('input[name=delay]'),
  inputStepDelay: document.querySelector('input[name=step]'),
  inputAmount: document.querySelector('input[name=amount]'),
  formEl: document.querySelector('.form'),
};

refs.formEl.addEventListener('submit', onClickButtonForm);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onClickButtonForm(event) {
  event.preventDefault();

  let delay = Number(refs.inputFirtDelay.value);
  let step = Number(refs.inputStepDelay.value);
  let amount = Number(refs.inputAmount.value);

  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, delay + step * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  event.currentTarget.reset(refs.formEl);
}
