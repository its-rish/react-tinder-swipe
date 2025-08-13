// src/components/SwipeCard.tsx
import { motion } from "framer-motion";
import { useState } from "react";
import useMediaQuery from "../hooks/mediaQuery";
import { SwipeCardProps } from "./types";

const SWIPE_THRESHOLD = 100;



export const SwipeCard = ({
  children,
  isTop,
  onSwipe,
  exitX,
  controls,
  disableSwiping,
  onDragUpdate,
  rotateValue,
}: SwipeCardProps) => {
  const [dragDisabled, setDragDisabled] = useState(false);
  const smallScreen = useMediaQuery("(max-width:599px)");

  const extraStyle = {
    filter: "blur(4px)",
    cursor: "not-allowed",
    animation: "blurPulse 3s ease-in-out infinite",
  };

  return (
    <motion.div
      drag={!dragDisabled && isTop && !disableSwiping ? "x" : false}
      dragMomentum={false}
      onDragEnd={(e, info) => {
        const offsetX = info.offset.x;
        onDragUpdate(null);
        if (Math.abs(offsetX) > SWIPE_THRESHOLD) {
          setDragDisabled(true);
          onSwipe(offsetX);
        } else {
          controls?.start({ x: 0, rotate: 0, transition: { duration: 0.2 } });
        }
      }}
      onDrag={(e, info) => {
        const offsetX = info.offset.x;
        const maxRotation = rotateValue;
        const rotation = Math.max(-maxRotation, Math.min(maxRotation, offsetX / 10));
        controls?.start({ rotate: rotation, x: offsetX, transition: { duration: 0 } });
        if (offsetX > rotateValue) onDragUpdate("right");
        else if (offsetX < -rotateValue) onDragUpdate("left");
        else onDragUpdate(null);
      }}
      initial={{ scale: smallScreen ? 1 : 0.85, y: 0 }}
      animate={
        isTop && controls
          ? controls
          : {
              scale: isTop ? 1 : smallScreen ? 1 : 0.85,
              y: isTop ? 0 : 0,
              transition: { duration: 0.2 },
            }
      }
      exit={{
        x: isTop ? exitX ?? 0 : 0,
        rotate: isTop ? ((exitX ?? 0) > 0 ? rotateValue : -rotateValue) : 0,
        opacity: 0,
        transition: { duration: 0.2 },
      }}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: isTop ? 2 : 1,
        cursor: "grab",
        ...(disableSwiping ? extraStyle : {}),
      }}
    >
      {children}
    </motion.div>
  );
};

