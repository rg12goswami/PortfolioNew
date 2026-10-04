import React, { useEffect, useRef, useState } from "react";
import { cursorStore, initCursorListeners } from "../utils/cursorStore";

export default function CharacterCanvas() {
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const centerImgRef = useRef(null);
  const isLoadedRef = useRef(false);
  const loadedCountRef = useRef(0);
  const lastThresholdRef = useRef(0); // 0 to 10
  const smoothedAngleRef = useRef(0);
  const rectRef = useRef({
    width: 0,
    height: 0,
    dpr: 1,
    faceX: 0,
    faceY: 0,
    screenRadius: 0,
  });

  const [loadProgress, setLoadProgress] = useState(0);

  // 1. Image Preload with 10% Thresholding (Max 10 setState calls total)
  useEffect(() => {
    let loadedCount = 0;
    const totalFrames = 64;
    const totalImages = totalFrames + 1; // 64 frames + center.webp
    const framesArray = [];

    const handleLoad = () => {
      loadedCount++;
      loadedCountRef.current = loadedCount;

      // Only call setState when crossing a new 10% threshold
      const threshold = Math.floor((loadedCount / totalImages) * 10);
      if (threshold > lastThresholdRef.current || loadedCount === totalImages) {
        lastThresholdRef.current = threshold;
        setLoadProgress(threshold * 10);
      }

      if (loadedCount === totalImages) {
        isLoadedRef.current = true;
      }
    };

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = `/frames/frame_${i}.webp`;
      img.onload = handleLoad;
      img.onerror = handleLoad;
      framesArray.push(img);
    }
    framesRef.current = framesArray;

    const centerImg = new Image();
    centerImg.src = `/frames/center.webp`;
    centerImg.onload = handleLoad;
    centerImg.onerror = handleLoad;
    centerImgRef.current = centerImg;
  }, []);

  // 2. Cached Dimensions via ResizeObserver & Capped DPR at 2 (No layout thrashing in loop)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCachedRect = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR at 2
      const rect = canvas.getBoundingClientRect();
      const width = Math.floor(rect.width || window.innerWidth);
      const height = Math.floor(rect.height || window.innerHeight);

      // Only resize backing store if dimensions changed
      const targetW = Math.floor(width * dpr);
      const targetH = Math.floor(height * dpr);
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      rectRef.current = {
        width,
        height,
        dpr,
        faceX: width * 0.5,
        faceY: height * 0.42,
        screenRadius: Math.hypot(width, height) * 0.5,
      };
    };

    updateCachedRect();

    // ResizeObserver updates rect ONLY on resize
    const resizeObserver = new ResizeObserver(() => {
      updateCachedRect();
    });
    resizeObserver.observe(canvas);

    window.addEventListener("resize", updateCachedRect, { passive: true });
    window.addEventListener("orientationchange", updateCachedRect, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateCachedRect);
      window.removeEventListener("orientationchange", updateCachedRect);
    };
  }, []);

  // 3. Global Cursor Pointer Listeners (Writes to ref only, zero setState)
  useEffect(() => {
    const cleanup = initCursorListeners();
    return cleanup;
  }, []);

  // Shortest-path circular angular lerp
  const lerpAngle = (current, target, factor) => {
    let diff = target - current;
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;
    return current + diff * factor;
  };

  // 4. SINGLE UNIFIED requestAnimationFrame LOOP for BOTH Canvas & Custom Cursor
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animId;

    const renderTick = () => {
      animId = requestAnimationFrame(renderTick);

      const rect = rectRef.current;
      if (!rect || !rect.width || !rect.height) return;

      const curX = cursorStore.pos.x;
      const curY = cursorStore.pos.y;

      // A. Update Custom Cursor (Dot & Trailing Aura Ring)
      if (cursorStore.dotEl) {
        cursorStore.dotEl.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
      }

      if (cursorStore.ringEl) {
        cursorStore.ringPos.x += (curX - cursorStore.ringPos.x) * 0.18;
        cursorStore.ringPos.y += (curY - cursorStore.ringPos.y) * 0.18;

        const scale = cursorStore.isClicking ? 0.8 : cursorStore.isHovered ? 1.8 : 1.0;
        cursorStore.ringEl.style.transform = `translate3d(${cursorStore.ringPos.x}px, ${cursorStore.ringPos.y}px, 0) scale(${scale})`;
        
        if (cursorStore.isHovered) {
          cursorStore.ringEl.classList.add("hovered");
        } else {
          cursorStore.ringEl.classList.remove("hovered");
        }
      }

      // B. Update Character Canvas
      const width = rect.width;
      const height = rect.height;
      const dpr = rect.dpr;
      const backingW = canvas.width;
      const backingH = canvas.height;

      // Clear/Fill canvas background with wine #8a1f2b
      ctx.fillStyle = "#8a1f2b";
      ctx.fillRect(0, 0, backingW, backingH);

      if (!isLoadedRef.current) return;

      const dx = rect.faceX - curX;
      const dy = rect.faceY - curY;
      const dist = Math.hypot(dx, dy);
      const deadzoneRadius = rect.screenRadius * 0.12;

      let activeImg;

      if (dist < deadzoneRadius || cursorStore.pos.isIdle) {
        activeImg = centerImgRef.current;
      } else {
        let targetAngle = Math.atan2(dy, dx);
        if (targetAngle < 0) targetAngle += Math.PI * 2;

        smoothedAngleRef.current = lerpAngle(
          smoothedAngleRef.current,
          targetAngle,
          0.26
        );

        let normAngle = (smoothedAngleRef.current % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        let frameIdx = Math.round((normAngle / (Math.PI * 2)) * 64) % 64;
        activeImg = framesRef.current[frameIdx];
      }

      if (!activeImg || !activeImg.complete) {
        activeImg = centerImgRef.current;
      }

      if (activeImg && activeImg.complete) {
        const imgW = activeImg.naturalWidth || 1280;
        const imgH = activeImg.naturalHeight || 720;
        const imgAspect = imgW / imgH;
        const canvasAspect = backingW / backingH;

        let drawW, drawH, drawX, drawY;
        if (canvasAspect > imgAspect) {
          drawW = backingW;
          drawH = backingW / imgAspect;
          drawX = 0;
          drawY = (backingH - drawH) / 2;
        } else {
          drawH = backingH;
          drawW = backingH * imgAspect;
          drawX = (backingW - drawW) / 2;
          drawY = 0;
        }

        ctx.globalAlpha = 1.0;
        ctx.drawImage(activeImg, drawX, drawY, drawW, drawH);
      }
    };

    renderTick();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" />;
}
