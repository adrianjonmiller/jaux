import Jaunt from '../lib';

let bars = document.querySelectorAll('.bar');
let play = document.getElementById('play');
let pause = document.getElementById('pause');
let stop = document.getElementById('stop');

let animation = new Jaunt({
  points: [.75, 0, .22, 1],
  duration: 1000,
  cb (val) {
    bars.forEach((bar, index) => {
      setTimeout(() => {
        bar.style.width = 100 * val + '%';
      }, index * 10)
      
    });
  }
});


play.addEventListener('click', () => {
  animation.play();
})

pause.addEventListener('click', () => {
  animation.pause();
});

stop.addEventListener('click', () => {
  animation.stop();
});