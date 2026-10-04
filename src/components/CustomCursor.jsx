import React, { useEffect, useRef } from "react";
import { cursorStore } from "../utils/cursorStore";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    cursorStore.dotEl = dotRef.current;
    cursorStore.ringEl = ringRef.current;

    return () => {
      cursorStore.dotEl = null;
      cursorStore.ringEl = null;
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  );
}
