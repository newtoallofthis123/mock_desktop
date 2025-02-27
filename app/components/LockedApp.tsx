"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LockedApp({
  appName,
  onUnlock,
}: {
  appName: string;
  onUnlock: (appName: string, password: string) => void;
}) {
  const [password, setPassword] = useState("");

  return (
    <div className="h-full flex items-center justify-center">
      <div className="bg-white/20 backdrop-blur-lg rounded-lg p-8 space-y-4">
        <h2 className="text-2xl font-bold text-white text-center">
          {appName} is Locked
        </h2>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-white/50 text-black placeholder-gray-500"
        />
        <Button
          onClick={() => onUnlock(appName.toLowerCase(), password)}
          className="w-full bg-purple-700 hover:bg-purple-600"
        >
          Unlock
        </Button>
      </div>
    </div>
  );
}
