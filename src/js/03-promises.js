
import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  let delay = e.target.delay.valueAsNumber;
  let step = e.target.step.valueAsNumber;
  let amount = e.target.amount.valueAsNumber;
  
  for (let i = 1; i <= amount; i++){
    createPromise(i, delay)
      .then(value => {
        Notiflix.Notify.success(value);
      })
      .catch(value => {
        Notiflix.Notify.failure(value);
      })
    delay += step;

  }
});

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        // Reject
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }      
    }, delay);
  });

  return promise;
};