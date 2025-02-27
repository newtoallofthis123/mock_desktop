import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Calculator from "./apps/Calculator";
import Messenger from "./apps/Messenger";
import Gallery from "./apps/Gallery";
import Notes from "./apps/Notes";
import Mail from "./apps/Mail";
import Reminders from "./apps/Reminders";
import LockedApp from "./LockedApp";
import Game2048 from "./apps/Game2048";
import MemoryGame from "./apps/MemoryGame";
import { Button } from "@/components/ui/button";

export default function Desktop() {
  const [unlockedApps, setUnlockedApps] = useState<string[]>([]);
  const [coin, setCoin] = useState<number>(0);
  const [isGame2048Open, setIsGame2048Open] = useState<boolean>(false);
  const [isMemoryGameOpen, setIsMemoryGameOpen] = useState<boolean>(false);

  function handleGameWin() {
    setCoin(coin + 10);
  }

  const handleUnlock = (appName: string, password: string) => {
    if (appName === "messenger" && password === "8GC623A") {
      setUnlockedApps([...unlockedApps, appName]);
    }
    if (appName === "mail" && password === "amy-27-05") {
      setUnlockedApps([...unlockedApps, appName]);
    }
  };

  return (
    <div className="p-4">
      <div className="bg-black/60 text-white py-4 rounded-lg mb-1 flex justify-between items-center">
        <p className="pl-4">
          Your Current Coins: {coin} | Play Games to Earn Coins
        </p>
        <Button
          onClick={() => {
            setIsMemoryGameOpen(false);
            setIsGame2048Open(false);
          }}
          className="bg-white text-black hover:bg-gray-200"
        >
          Go Back
        </Button>
        <Button
          onClick={() => {
            setIsMemoryGameOpen(false);
            setIsGame2048Open(true);
          }}
          className="bg-white text-black hover:bg-gray-200"
        >
          Play 2048
        </Button>
        <Button
          onClick={() => {
            setIsGame2048Open(false);
            setIsMemoryGameOpen(true);
          }}
          className="bg-white text-black hover:bg-gray-200"
        >
          Play Memory Game
        </Button>
      </div>
      {!isGame2048Open && !isMemoryGameOpen && (
        <Tabs defaultValue="calculator" className="h-full">
          <TabsList className="grid grid-cols-6 gap-4 h-12 bg-black/0">
            <TabsTrigger
              value="calculator"
              className="bg-gray-800 text-white hover:bg-blue-600"
            >
              Calculator
            </TabsTrigger>
            <TabsTrigger
              value="messenger"
              className="bg-gray-800 text-white hover:bg-green-600"
            >
              Messenger
            </TabsTrigger>
            <TabsTrigger
              value="gallery"
              className="bg-gray-800 text-white hover:bg-yellow-600"
            >
              Gallery
            </TabsTrigger>
            <TabsTrigger
              value="notes"
              className="bg-gray-800 text-white hover:bg-red-600"
            >
              Notes
            </TabsTrigger>
            <TabsTrigger
              value="mail"
              className="bg-gray-800 text-white hover:bg-purple-600"
            >
              Mail
            </TabsTrigger>
            <TabsTrigger
              value="reminders"
              className="bg-gray-800 text-white hover:bg-pink-600"
            >
              Reminders
            </TabsTrigger>
          </TabsList>
          <div className="mt-4 rounded-lg p-4 h-[calc(100%-5rem)]">
            <TabsContent value="calculator">
              <Calculator setScore={handleGameWin} />
            </TabsContent>
            <TabsContent value="messenger">
              {unlockedApps.includes("messenger") ? (
                <Messenger />
              ) : (
                <LockedApp appName="Messenger" onUnlock={handleUnlock} />
              )}
            </TabsContent>
            <TabsContent value="gallery">
              <Gallery />
            </TabsContent>
            <TabsContent value="notes">
              <Notes />
            </TabsContent>
            <TabsContent value="mail">
              {unlockedApps.includes("mail") ? (
                <Mail />
              ) : (
                <LockedApp appName="Mail" onUnlock={handleUnlock} />
              )}
            </TabsContent>
            <TabsContent value="reminders">
              <Reminders />
            </TabsContent>
          </div>
        </Tabs>
      )}
      {isGame2048Open && (
        <div>
          <Game2048 handleWin={handleGameWin} />
        </div>
      )}
      {isMemoryGameOpen && (
        <div>
          <MemoryGame onWin={handleGameWin} />
        </div>
      )}
    </div>
  );
}
