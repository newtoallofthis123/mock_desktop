"use client";

import { useState } from "react";
import LockScreen from "./components/LockScreen";
import Desktop from "./components/Desktop";

export default function Home() {
  const [isLocked, setIsLocked] = useState(true);

  const handleUnlock = (password: string) => {
    if (password === "1489") {
      setIsLocked(false);
      return "";
    } else {
      return "Incorrect Password: Hint -> ????";
    }
  };

  return (
    <main className="bg-gradient-to-br to-[#740000] from-[#1e2b33]  h-screen w-screen bg-red-800">
      {isLocked ? <LockScreen onUnlock={handleUnlock} /> : <Desktop />}
    </main>
  );
}
