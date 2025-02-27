import React, { useState, useEffect } from "react";

interface Game256Props {
  handleWin: () => void;
}

const Game256: React.FC<Game256Props> = ({ handleWin }) => {
  const [grid, setGrid] = useState<number[][]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  // Initialize the game
  useEffect(() => {
    initGame();
  }, []);

  const initGame = (): void => {
    // Create a 4x4 grid filled with zeros
    const newGrid: number[][] = Array(4)
      .fill(null)
      .map(() => Array(4).fill(0));

    // Add two random tiles
    addRandomTile(addRandomTile(newGrid));
    setGrid(newGrid);
    setScore(0);
    setGameOver(false);
  };

  const addRandomTile = (grid: number[][]): number[][] => {
    const emptyCells: { i: number; j: number }[] = [];

    // Find all empty cells
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === 0) {
          emptyCells.push({ i, j });
        }
      }
    }

    if (emptyCells.length === 0) return grid;

    // Choose a random empty cell
    const { i, j } = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    // Place a 2 (90% chance) or 4 (10% chance)
    grid[i][j] = Math.random() < 0.9 ? 2 : 4;

    return grid;
  };

  const checkForWin = (grid: number[][]): boolean => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === 128) {
          handleWin();
          return true;
        }
      }
    }
    return false;
  };

  const checkForGameOver = (grid: number[][]): boolean => {
    // Check if there are any empty cells
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === 0) return false;
      }
    }

    // Check if there are any possible merges
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i][j] === grid[i][j + 1]) return false;
      }
    }

    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < 3; i++) {
        if (grid[i][j] === grid[i + 1][j]) return false;
      }
    }

    return true;
  };

  const moveLeft = (): void => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    let changed = false;
    let newScore = score;

    for (let i = 0; i < 4; i++) {
      let row = newGrid[i].filter((val: number) => val !== 0);

      // Merge tiles
      for (let j = 0; j < row.length - 1; j++) {
        if (row[j] === row[j + 1]) {
          row[j] *= 2;
          row[j + 1] = 0;
          newScore += row[j];
          changed = true;
        }
      }

      row = row.filter((val: number) => val !== 0);

      // Fill the row with zeros
      while (row.length < 4) {
        row.push(0);
      }

      if (newGrid[i].join(",") !== row.join(",")) {
        changed = true;
      }

      newGrid[i] = row;
    }

    if (changed) {
      addRandomTile(newGrid);
      setGrid(newGrid);
      setScore(newScore);

      if (checkForWin(newGrid)) {
        return;
      }

      if (checkForGameOver(newGrid)) {
        setGameOver(true);
      }
    }
  };

  const moveRight = (): void => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    let changed = false;
    let newScore = score;

    for (let i = 0; i < 4; i++) {
      let row = newGrid[i].filter((val: number) => val !== 0);

      // Merge tiles
      for (let j = row.length - 1; j > 0; j--) {
        if (row[j] === row[j - 1]) {
          row[j] *= 2;
          row[j - 1] = 0;
          newScore += row[j];
          changed = true;
        }
      }

      row = row.filter((val: number) => val !== 0);

      // Fill the row with zeros
      while (row.length < 4) {
        row.unshift(0);
      }

      if (newGrid[i].join(",") !== row.join(",")) {
        changed = true;
      }

      newGrid[i] = row;
    }

    if (changed) {
      addRandomTile(newGrid);
      setGrid(newGrid);
      setScore(newScore);

      if (checkForWin(newGrid)) {
        return;
      }

      if (checkForGameOver(newGrid)) {
        setGameOver(true);
      }
    }
  };

  const moveUp = (): void => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    let changed = false;
    let newScore = score;

    for (let j = 0; j < 4; j++) {
      let column: number[] = [];

      // Extract column
      for (let i = 0; i < 4; i++) {
        if (newGrid[i][j] !== 0) {
          column.push(newGrid[i][j]);
        }
      }

      // Merge tiles
      for (let i = 0; i < column.length - 1; i++) {
        if (column[i] === column[i + 1]) {
          column[i] *= 2;
          column[i + 1] = 0;
          newScore += column[i];
          changed = true;
        }
      }

      column = column.filter((val: number) => val !== 0);

      // Check if column changed
      let oldColumn: number[] = [];
      for (let i = 0; i < 4; i++) {
        if (newGrid[i][j] !== 0) {
          oldColumn.push(newGrid[i][j]);
        }
      }

      if (oldColumn.join(",") !== column.join(",")) {
        changed = true;
      }

      // Update column in grid
      for (let i = 0; i < 4; i++) {
        newGrid[i][j] = i < column.length ? column[i] : 0;
      }
    }

    if (changed) {
      addRandomTile(newGrid);
      setGrid(newGrid);
      setScore(newScore);

      if (checkForWin(newGrid)) {
        return;
      }

      if (checkForGameOver(newGrid)) {
        setGameOver(true);
      }
    }
  };

  const moveDown = (): void => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    let changed = false;
    let newScore = score;

    for (let j = 0; j < 4; j++) {
      let column: number[] = [];

      // Extract column
      for (let i = 0; i < 4; i++) {
        if (newGrid[i][j] !== 0) {
          column.push(newGrid[i][j]);
        }
      }

      // Merge tiles
      for (let i = column.length - 1; i > 0; i--) {
        if (column[i] === column[i - 1]) {
          column[i] *= 2;
          column[i - 1] = 0;
          newScore += column[i];
          changed = true;
        }
      }

      column = column.filter((val: number) => val !== 0);

      // Check if column changed
      let oldColumn: number[] = [];
      for (let i = 0; i < 4; i++) {
        if (newGrid[i][j] !== 0) {
          oldColumn.push(newGrid[i][j]);
        }
      }

      if (oldColumn.join(",") !== column.join(",")) {
        changed = true;
      }

      // Fixed: Update column in grid for moveDown
      for (let i = 0; i < 4; i++) {
        if (i >= 4 - column.length) {
          newGrid[i][j] = column[i - (4 - column.length)];
        } else {
          newGrid[i][j] = 0;
        }
      }
    }

    if (changed) {
      addRandomTile(newGrid);
      setGrid(newGrid);
      setScore(newScore);

      if (checkForWin(newGrid)) {
        return;
      }

      if (checkForGameOver(newGrid)) {
        setGameOver(true);
      }
    }
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (gameOver) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          moveLeft();
          break;
        case "ArrowRight":
          e.preventDefault();
          moveRight();
          break;
        case "ArrowUp":
          e.preventDefault();
          moveUp();
          break;
        case "ArrowDown":
          e.preventDefault();
          moveDown();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [grid, gameOver, score]);

  // Get font size based on tile value
  const getTileFont = (value: number): string => {
    if (value >= 1000) return "text-xl";
    if (value >= 100) return "text-2xl";
    return "text-3xl";
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex justify-between w-full max-w-md mb-4">
        <button
          onClick={initGame}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          New Game
        </button>
      </div>

      <div className="bg-gray-300 p-4 rounded-lg">
        <div className="grid grid-cols-4 gap-2">
          {grid.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={`w-16 h-16 flex items-center justify-center rounded-md font-bold 
                  ${cell === 0 ? "bg-gray-200" : "bg-amber-400 text-white"} 
                  ${getTileFont(cell)}`}
              >
                {cell !== 0 ? cell : ""}
              </div>
            )),
          )}
        </div>
      </div>

      {gameOver && (
        <div className="mt-4 p-2 bg-red-500 text-white rounded">
          Game Over! No more moves available.
        </div>
      )}

      <div className="mt-6 grid grid-cols-3 gap-2">
        <div></div>
        <button
          onClick={moveUp}
          className="bg-gray-700 hover:bg-gray-800 text-white p-2 rounded"
        >
          ↑
        </button>
        <div></div>
        <button
          onClick={moveLeft}
          className="bg-gray-700 hover:bg-gray-800 text-white p-2 rounded"
        >
          ←
        </button>
        <button
          onClick={moveDown}
          className="bg-gray-700 hover:bg-gray-800 text-white p-2 rounded"
        >
          ↓
        </button>
        <button
          onClick={moveRight}
          className="bg-gray-700 hover:bg-gray-800 text-white p-2 rounded"
        >
          →
        </button>
      </div>

      <div className="mt-4 text-sm text-white">
        <p>Use arrow keys or buttons to move tiles.</p>
        <p>Reach 128 to win!</p>
        <p>
          Beware! Some buttons on the proff's are broken so might stop
          working!!! Your goal is to get around that
        </p>
      </div>
    </div>
  );
};

export default Game256;
