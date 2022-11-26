const refs = {
   startBtn: document.querySelector('button[data-start]'),
   stopBtn: document.querySelector('button[data-stop]'),
   body: document.querySelector('body'),
}

let intervalId = null;
refs.stopBtn.disabled = true;

function colorSwitcher() {
   refs.body.style.backgroundColor = getRandomHexColor();   
}; 

refs.startBtn.addEventListener('click', () => {
   intervalId = setInterval(colorSwitcher, 1000);
   refs.startBtn.disabled = true;
   refs.stopBtn.disabled = false;
});

refs.stopBtn.addEventListener('click', () => {
   clearInterval(intervalId);
   refs.startBtn.disabled = false;
   refs.stopBtn.disabled = true;
});


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
