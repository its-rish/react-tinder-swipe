# 🔥 react-tinder-swipe

A reusable Tinder-style swipe card stack built with React and Framer Motion. Easily implement swipe-left/swipe-right cards in any application like dating, product selectors, or quiz interfaces.

---

## ✨ Features

- 🧲 Drag cards left/right with physics-based animations
- 🧩 Fully customizable card UI via `renderCard` prop
- 🔄 Swipe via gestures or programmatically
- 🔊 Optional audio support on swipe
- 🎯 Swipe callbacks with direction
- 💅 Easily style with CSS-in-JS or your favorite styling method

---

## 📦 Installation

```bash
npm install react-tinder-swipe
# or
yarn add react-tinder-swipe


## ⚙️ Usage

import { TinderCardStack } from 'react-tinder-swipe';

const cardData = [
  { id: 1, name: "Alice", image: "/images/alice.jpg" },
  { id: 2, name: "Bob", image: "/images/bob.jpg" },
  { id: 3, name: "Charlie", image: "/images/charlie.jpg" },
];

const App = () => {
  return (
    <TinderCardStack
      cards={cardData}
      renderCard={(card) => (
        <div
          style={{
            backgroundImage: `url(${card.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 16,
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
            color: "#fff",
            fontSize: 24,
            padding: 20,
            fontWeight: "bold",
          }}
        >
          {card.name}
        </div>
      )}
      onSwipe={(id, direction) => {
        console.log(`Swiped card ${id} to the ${direction}`);
      }}
      renderButtons={(swipe, direction) => (
        <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
          <button
            style={{
              padding: "10px 20px",
              background: direction === "left" ? "#ff6666" : "#eee",
            }}
            onClick={() => swipe("left")}
          >
            ❌ Dislike
          </button>
          <button
            style={{
              padding: "10px 20px",
              background: direction === "right" ? "#66ff66" : "#eee",
            }}
            onClick={() => swipe("right")}
          >
            ❤️ Like
          </button>
        </div>
      )}
    />
  );
};
