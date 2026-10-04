// Shared performance-tuned cursor state refs (zero React re-renders)
export const cursorStore = {
  pos: { x: -1000, y: -1000, isIdle: true },
  ringPos: { x: -1000, y: -1000 },
  isHovered: false,
  isClicking: false,
  dotEl: null,
  ringEl: null,
};

let idleTimer = null;

export function initCursorListeners() {
  if (typeof window === "undefined") return () => {};

  const handlePointerMove = (e) => {
    cursorStore.pos.x = e.clientX;
    cursorStore.pos.y = e.clientY;
    cursorStore.pos.isIdle = false;

    // Fast target check without calling setState
    const target = e.target;
    cursorStore.isHovered = !!(
      target &&
      (target.closest("button") ||
        target.closest("a") ||
        target.closest(".nav-item") ||
        target.closest(".btn-resume") ||
        target.closest(".btn-talk") ||
        target.closest(".frosted-card") ||
        target.closest(".tag") ||
        target.closest("[role='button']") ||
        target.classList.contains("interactive"))
    );

    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      cursorStore.pos.isIdle = true;
    }, 3000);
  };

  const handleMouseDown = () => {
    cursorStore.isClicking = true;
  };

  const handleMouseUp = () => {
    cursorStore.isClicking = false;
  };

  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  window.addEventListener("mousemove", handlePointerMove, { passive: true });
  window.addEventListener("mousedown", handleMouseDown, { passive: true });
  window.addEventListener("mouseup", handleMouseUp, { passive: true });

  return () => {
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("mousemove", handlePointerMove);
    window.removeEventListener("mousedown", handleMouseDown);
    window.removeEventListener("mouseup", handleMouseUp);
    clearTimeout(idleTimer);
  };
}
