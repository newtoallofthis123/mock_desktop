import React, { useState, useEffect, useCallback } from "react";

const SnakeGame = ({ handleUnlock }) => {
  const GRID_SIZE = 30;
  const CELL_SIZE = 15;
  const INITIAL_SNAKE = [{ x: 10, y: 10 }];

  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [berry, setBerry] = useState(generateBerry());
  const [direction, setDirection] = useState("RIGHT");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  function generateBerry() {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  }

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setBerry(generateBerry());
    setDirection("RIGHT");
    setScore(0);
    setGameOver(false);
  };

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case "RIGHT":
          head.x += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
        case "UP":
          head.y -= 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
      }

      // Check boundaries
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
      ) {
        setGameOver(true);
        return prevSnake;
      }

      // Check self-collision
      if (
        newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
        return prevSnake;
      }

      newSnake.unshift(head);

      // Check if berry is eaten
      if (head.x === berry.x && head.y === berry.y) {
        setScore((prev) => {
          const newScore = prev + 1;
          if (newScore === 20) {
            setGameOver(true);
            handleUnlock();
          }
          return newScore;
        });
        setBerry(generateBerry());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, berry, gameOver, handleUnlock]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver) return;

      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, gameOver]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, 200);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  return (
    <div style={{ textAlign: "center" }}>
      <div className="text-white">Score: {score}</div>
      <div className="flex flex-col justify-center items-center">
        <svg
          width={GRID_SIZE * CELL_SIZE}
          height={GRID_SIZE * CELL_SIZE}
          style={{ backgroundColor: "white" }}
        >
          {/* Render snake */}
          {snake.map((segment, index) => (
            <rect
              key={index}
              x={segment.x * CELL_SIZE}
              y={segment.y * CELL_SIZE}
              width={CELL_SIZE}
              height={CELL_SIZE}
              fill="green"
            />
          ))}
          {/* Render berry */}
          <rect
            x={berry.x * CELL_SIZE}
            y={berry.y * CELL_SIZE}
            width={CELL_SIZE}
            height={CELL_SIZE}
            fill="red"
          />
        </svg>
      </div>
      {gameOver && (
        <div className="text-white mt-4">
          <div>
            {score >= 20 ? "Congratulations! Game Complete!" : "Game Over!"}
          </div>
          <button
            onClick={resetGame}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
