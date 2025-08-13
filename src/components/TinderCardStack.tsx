
// src/components/TinderCardStack.tsx
import { AnimatePresence, useAnimation } from "framer-motion";
import { useState } from "react";
import useMediaQuery from "../hooks/mediaQuery";
import { SwipeCard } from "./SwipeCard";

interface TinderCardStackProps {
  cards: any[];
  renderCard: (card: any) => React.ReactNode;
  onSwipe?: (id: number, direction: "left" | "right") => void;
  renderButtons?: (swipe: (dir: "left" | "right") => void, direction: "left" | "right" | null) => React.ReactNode;
}

export const TinderCardStack = ({ cards: initialCards, renderCard, onSwipe, renderButtons }: TinderCardStackProps) => {
  const [cards, setCards] = useState(initialCards);
  const controls = useAnimation();
  const [lastSwipeX, setLastSwipeX] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const smallScreen = useMediaQuery("(max-width:599px)");

  const removeCard = (id: number) => setCards(prev => prev.filter(c => c.id !== id));

  const playSwipeSound = (direction: "left" | "right") => {
    const file = direction === "right" ? "/assets/audio/swipeSound.mp3" : "/assets/audio/demiceSound.mp3";
    new Audio(file).play().catch(() => {});
  };

  const swipe = (direction: "left" | "right") => {
    if (cards.length === 0) return;
    const topCard = cards[cards.length - 1];
    const x = direction === "right" ? 600 : -600;
    const rotate = direction === "right" ? 20 : -20;
    setLastSwipeX(x);
    playSwipeSound(direction);
    controls.start({ x, rotate, transition: { duration: 0.2 } }).then(() => {
      removeCard(topCard.id);
      onSwipe?.(topCard.id, direction);
    });
  };

  return (
    <div style={{ position: "relative", width: smallScreen ? "100%" : 400, height: 600, margin: "0 auto" }}>
      <AnimatePresence>
        {cards.map((card, i) => {
          const isTop = i === cards.length - 1;
          return (
            <SwipeCard
              key={card.id}
              isTop={isTop}
              controls={isTop ? controls : undefined}
              onSwipe={(offsetX) => {
                setLastSwipeX(offsetX);
                const direction = offsetX > 0 ? "right" : "left";
                swipe(direction);
              } }
              onDragUpdate={setSwipeDirection}
              exitX={lastSwipeX}  rotateValue={0}>
              {renderCard(card)}
            </SwipeCard>
          );
        })}
      </AnimatePresence>

      <div style={{ marginTop: 20 }}>
        {renderButtons?.(swipe, swipeDirection)}
      </div>
    </div>
  );
};
