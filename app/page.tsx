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
    <main className="w-screen">
      {isLocked ? <LockScreen onUnlock={handleUnlock} /> : <Desktop />}
    </main>
  );
}
