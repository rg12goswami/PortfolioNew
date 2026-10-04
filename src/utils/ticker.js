// Centralized single requestAnimationFrame ticker to eliminate competing rAF callbacks
const subscribers = new Set();
let animFrameId = null;

function tick(time) {
  subscribers.forEach((callback) => {
    try {
      callback(time);
    } catch (e) {
      console.error("Ticker error:", e);
    }
  });

  if (subscribers.size > 0) {
    animFrameId = requestAnimationFrame(tick);
  } else {
    animFrameId = null;
  }
}

export function subscribeTicker(callback) {
  subscribers.add(callback);
  if (!animFrameId) {
    animFrameId = requestAnimationFrame(tick);
  }
  return () => {
    subscribers.delete(callback);
    if (subscribers.size === 0 && animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
  };
}
