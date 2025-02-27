import React, { useState, useEffect } from "react";

// Define types
interface CardType {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryGameProps {
  onWin: () => void;
}

const EMOJIS: string[] = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐯",
];

const MemoryGame: React.FC<MemoryGameProps> = ({ onWin }) => {
  // Create pairs of emojis and shuffle them
  const createDeck = (): CardType[] => {
    const emojiPairs = [...EMOJIS, ...EMOJIS];
    return emojiPairs
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
  };

  const [cards, setCards] = useState<CardType[]>(createDeck());
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [hasWon, setHasWon] = useState<boolean>(false);

  // Handle card click
  const handleCardClick = (index: number): void => {
    // Prevent clicking if already checking a pair or card is already flipped/matched
    if (
      isChecking ||
      flippedCards.length >= 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched
    ) {
      return;
    }

    // Flip the card
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    setFlippedCards([...flippedCards, index]);
  };

  // Check for matches when two cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true);

      const [firstIndex, secondIndex] = flippedCards;

      if (cards[firstIndex].emoji === cards[secondIndex].emoji) {
        // Match found
        setTimeout(() => {
          const newCards = [...cards];
          newCards[firstIndex].isMatched = true;
          newCards[secondIndex].isMatched = true;
          setCards(newCards);
          setMatchedPairs(matchedPairs + 1);
          setFlippedCards([]);
          setIsChecking(false);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const newCards = [...cards];
          newCards[firstIndex].isFlipped = false;
          newCards[secondIndex].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  }, [flippedCards, cards, matchedPairs]);

  // Check for win condition
  useEffect(() => {
    if (matchedPairs === EMOJIS.length) {
      if (!hasWon) {
        onWin();
      } else {
        return;
      }
    }
  }, [matchedPairs, onWin]);

  // Reset game
  const resetGame = (): void => {
    setCards(createDeck());
    setFlippedCards([]);
    setIsChecking(false);
    setMatchedPairs(0);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-4 flex items-center justify-between w-full max-w-md">
        <div className="text-xl font-bold">
          Matches: {matchedPairs}/{EMOJIS.length}
        </div>
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Reset Game
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 w-full max-w-md">
        {cards.map((card, index) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(index)}
            className={`
              aspect-square flex items-center justify-center rounded-lg text-4xl cursor-pointer transition-all duration-300 transform
              ${
                card.isFlipped || card.isMatched
                  ? "bg-white rotate-y-180"
                  : "bg-blue-500"
              }
              ${card.isMatched ? "bg-green-100" : ""}
              ${!card.isFlipped && !card.isMatched ? "hover:bg-blue-400" : ""}
            `}
          >
            {(card.isFlipped || card.isMatched) && (
              <span className="select-none">{card.emoji}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
