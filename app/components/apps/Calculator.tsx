"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import SnakeGame from "./FlappyBird";

export default function Calculator({ setScore }: { setScore: () => void }) {
  const [display, setDisplay] = useState("0");
  const [isSnake, setIsSnake] = useState(false);

  const handleClick = (value: string) => {
    setDisplay((prev) => (prev === "0" ? value : prev + value));
  };

  function handleUnlock() {
    setScore();
  }

  const handleClear = () => setDisplay("0");

  const handleCalculate = () => {
    try {
      if (display === "77697820") {
        setIsSnake(true);
      }
      setDisplay(eval(display).toString());
    } catch (error) {
      setDisplay("Error");
    }
  };

  return (
    <div>
      {isSnake ? (
        <div>
          <SnakeGame handleUnlock={handleUnlock} />
        </div>
      ) : (
        <div className="grid bg-gray-200/90 shadow-lg p-4 grid-cols-4 gap-2 max-w-xs mx-auto">
          <div className="col-span-4 text-black p-4 rounded-lg mb-2 text-right text-2xl">
            {display}
          </div>
          {[
            "7",
            "8",
            "9",
            "/",
            "4",
            "5",
            "6",
            "*",
            "1",
            "2",
            "3",
            "-",
            "0",
            ".",
            "=",
            "+",
          ].map((btn) => (
            <Button
              key={btn}
              onClick={() =>
                btn === "=" ? handleCalculate() : handleClick(btn)
              }
              className="bg-[#1a1a1a] hover:bg-gray-600 text-white text-xl h-16"
            >
              {btn}
            </Button>
          ))}
          <Button
            onClick={handleClear}
            className="col-span-4 bg-red-500 hover:bg-red-600 text-white text-xl h-16"
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  );
}
