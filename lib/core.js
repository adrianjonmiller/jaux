export default function (points, duration = 1000, nextFrameCb) {
  let curve = acceleration.apply(null, points);
  let requestID = null;
  let onCompleteCb;
  let coords; 
  let t;
  let timePassed;
  
  function nextFrame (cb) {
    nextFrameCb = cb
  }

  function onComplete (cb) {
      onCompleteCb = cb;
  }
  
  function pause () {
    if (requestID) {
      window.cancelAnimationFrame(requestID);
      requestID = null;
    }
  }

  function stop () {
      if (requestID) {
          window.cancelAnimationFrame(requestID);
          t = 0;
          timePassed = null;
          requestID = null;
          nextFrameCb(t)
      }
  }

  function play (newDuration) {
      if (!requestID) {
        let resume = timePassed ? Date.now() - timePassed : null;
        loop(curve, newDuration || duration, resume);
      }
  }

  return {play, stop, pause, onComplete, nextFrame}

  function loop (curve, duration, startTime) {
    requestID = window.requestAnimationFrame(() => {
      startTime = startTime || Date.now();
      let currentTime = Date.now();
      
      if ((startTime + duration) > currentTime) {
          if (typeof nextFrameCb === 'function') {
            timePassed = currentTime - startTime;
            t = timePassed/duration;
            coords = curve(t);
            nextFrameCb(coords.y);              
          }
      
          loop(curve, duration, startTime);
      } else {
        t = 0;
        requestID = null;
        timePassed = null;
        
        if (typeof onCompleteCb === 'function') {
          onCompleteCb();
        }
      }
    });
  }

  function acceleration (bx,by,cx,cy) {
    let ax = 0, ay = 0;
    let dx = 1, dy = 1;

    return function (t) {
      return {
        x: cubic(ax, bx, cx, dx, t),
        y: cubic(ay, by, cy, dy, t),
      }
    }
  }

  function cubic (a, b, c, d, t) {
    return (Math.pow((1 - t), 3) * a) + (3 * Math.pow(1 - t, 2) * t * b) + (3 * (1 - t) * Math.pow(t, 2) * c) + (Math.pow(t,3) * d);
  }
};
