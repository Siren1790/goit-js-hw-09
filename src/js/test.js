import '../css/common.css'

const refs = {
   startBtn: document.querySelector('button[data-action-start]'),
   stopBtn: document.querySelector('button[data-action-stop]'),
   clockface: document.querySelector('.clockface'),
}

class Timer {
   constructor({onTick}){
      this.intervalId = null,
      this.isActive = false,
      this.onTick = onTick;
      
      this.init();
   }

   init() {
      const time = this.convertMs(0);
      this.onTick(time);
   }

   start() {
      if (this.isActive) {
         return;
      }
      const startTime = Date.now();
      this.isActive = true;

      this.intervalId = setInterval(() => {
         const currentTime = Date.now();
         const deltaTime = currentTime - startTime;
         const time = this.convertMs(deltaTime);
         this.onTick(time);
      }, 1000);
   }

   stop() {
      clearInterval(this.intervalId);
      this.isActive = false;
      const time = this.convertMs(0);
      this.onTick(time);
   }



   pad(value) {
      return String(value).padStart(2, '0');
   }

   padDays(value) {
      return String(value).padStart(3, '0');
   }

   convertMs(ms) {
      // Number of milliseconds per unit of time
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      // Remaining days
      const days = this.padDays(Math.floor(ms / day));
      // Remaining hours
      const hours = this.pad(Math.floor((ms % day) / hour));
      // Remaining minutes
      const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
      // Remaining seconds
      const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

      return { days, hours, minutes, seconds };
   }
}

const timer = new Timer({
   onTick: updateClockFace,
})
   
refs.startBtn.addEventListener('click', timer.start.bind(timer));

refs.stopBtn.addEventListener('click', timer.stop.bind(timer));

function updateClockFace({ days, hours, minutes, seconds }) {
   refs.clockface.textContent = `${days}:${hours}:${minutes}:${seconds}`;
};


