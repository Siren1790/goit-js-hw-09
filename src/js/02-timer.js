// Описаний в документації
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
// Додатковий імпорт стилів

const refs = {
   startBtn: document.querySelector('button[data-start]'),
   spanDays: document.querySelector('span[data-days]'),
   spanHours: document.querySelector('span[data-hours]'),
   spanMinutes: document.querySelector('span[data-minutes]'),
   spanSeconds: document.querySelector('span[data-seconds]'),
}

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
     if (Date.now() >= selectedDates[0].getTime()) {
        Notiflix.Notify.failure("Please choose a date in the future");
     } else {
        // Кнопка стає активною.
         refs.startBtn.disabled = false;
   }
  },
};
const flatPick = flatpickr('#datetime-picker', options);

class Timer {
   constructor({ onTick, startTime }) {
      this.intervalId = null,
      this.isActive = false,
      this.onTick = onTick;
      this.startTime = startTime;
   }

   start() {
      if (this.isActive) {
         return;
      }
      Notiflix.Notify.success('Таймер Запущено');
      this.intervalId = setInterval(() => {
         const currentTime = Date.now();
         const deltaTime = this.startTime - currentTime;
         if (deltaTime < 0) {
            clearInterval(this.intervalId);
            this.isActive = false;
            this.stop();
            return;
         }

         const time = this.convertMs(deltaTime);
         this.onTick(time);
      }, 1000);
   }

   stop() {
      Notiflix.Notify.success('DONE');
      clearInterval(this.intervalId);
      this.isActive = false;
      const time = this.convertMs(0);
      this.onTick(time);
   }

   pad(value) {
      return String(value).padStart(2, '0');
   }

   convertMs(ms) {
      // Number of milliseconds per unit of time
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      // Remaining days
      const days = this.pad(Math.floor(ms / day));
      // Remaining hours
      const hours = this.pad(Math.floor((ms % day) / hour));
      // Remaining minutes
      const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
      // Remaining seconds
      const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

      return { days, hours, minutes, seconds };
   }
}


refs.startBtn.addEventListener('click', () => {
   refs.startBtn.disabled = true;
   const timer = new Timer({
      onTick: updateClockFace,
      startTime: flatPick.selectedDates[0].getTime(),
   });
   timer.start();
});

function updateClockFace({ days, hours, minutes, seconds }) {
   refs.spanDays.textContent = `${days}`;
   refs.spanHours.textContent = `${hours}`;
   refs.spanMinutes.textContent = `${minutes}`;
   refs.spanSeconds.textContent = `${seconds}`;
};
