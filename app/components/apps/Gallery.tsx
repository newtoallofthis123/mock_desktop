import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";

export default function Gallery() {
  const images = ["/calendar.jpeg", "/76.jpeg", "/978.png", "clock.jpeg"];

  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [locked, setLocked] = useState(true);
  const [message, setMessage] = useState("");
  const [inQuestions, setInQuestions] = useState(false);

  function handleSubmit() {
    if (question1.toLowerCase().includes("interstellar")) {
      if (question2.includes("1999")) {
        if (question3.toLowerCase().includes("lexibot")) {
          setLocked(false);
        } else {
          setMessage("Incorrect answer");
        }
      } else {
        setMessage("Incorrect answer");
      }
    }
  }

  return (
    <div>
      {inQuestions ? (
        <div>
          {locked ? (
            <div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  What’s your favourite movie?
                </h2>
                <Input
                  onChange={(e) => setQuestion1(e.target.value)}
                  className="text-white"
                ></Input>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  In which year were you married?
                </h2>
                <Input
                  onChange={(e) => setQuestion2(e.target.value)}
                  className="text-white"
                ></Input>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  What's the name of your AI model?
                </h2>
                <Input
                  onChange={(e) => setQuestion3(e.target.value)}
                  className="text-white"
                ></Input>
              </div>
              <Button onClick={handleSubmit} className="bg-red-600 mt-5">
                Submit
              </Button>
            </div>
          ) : (
            <div>Unlocked</div>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-full object-cover block hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
          <div>
            <Button onClick={() => setInQuestions(true)} className="bg-red-600">
              Unlock Hidden
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
