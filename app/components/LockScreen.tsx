"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LockScreen({
  onUnlock,
}: {
  onUnlock: (password: string) => string;
}) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div
      style={{
        backgroundImage: `url('/bg.png')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="h-full flex items-center justify-center"
    >
      <div className="h-screen rounded-lg p-8 space-y-4 shadow-lg">
        <h1 className="text-4xl font-bold text-white text-center">
          Enter Password
        </h1>
        <p className="text-white">{message}</p>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-white/80 text-text placeholder-white"
        />
        <Button
          onClick={() => setMessage(onUnlock(password))}
          className="w-full bg-[#000000] hover:bg-gray-600"
        >
          Unlock
        </Button>
      </div>
    </div>
  );
}
