import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Gallery({ score }: { score: number }) {
  const images = ["/calendar.jpeg", "/76.jpeg", "/978.png", "clock.jpeg"];

  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [locked, setLocked] = useState(true);
  const [inQuestions, setInQuestions] = useState(false);
  const [wrong, setWrong] = useState<Array<number>>([]);
  const [unBlured, setUnBlured] = useState(false);

  function handleSubmit() {
    const wrong: number[] = [];
    let correct = true;
    if (!question1.toLowerCase().includes("interstellar")) {
      wrong.push(1);
      correct = false;
    }
    if (!question2.includes("1999")) {
      wrong.push(2);
      correct = false;
    }
    if (!question3.toLowerCase().includes("lexibot")) {
      wrong.push(3);
      correct = false;
    }
    setWrong(wrong);
    setLocked(!correct);
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
              <div>
                {wrong.length > 0 && (
                  <p className="text-white pt-2">
                    Questions {JSON.stringify(wrong)} are wrong
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              {unBlured ? (
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-2xl font-bold text-white mb-4">
                    Congratulations! Now all you have to do is find the USB
                  </h1>
                  <video
                    src="/unblur.mov"
                    autoPlay={true}
                    muted={true}
                    loop={true}
                    className="rounded-md"
                    height="60%"
                    width="60%"
                  />
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <Button
                    onClick={() => {
                      if (score === 30) setUnBlured(true);
                      // setUnBlured(true);
                    }}
                    className="bg-red-600"
                  >
                    Try Unblur (You need to have 30 coins)
                  </Button>
                  <video
                    src="/blur.mov"
                    autoPlay={true}
                    muted={true}
                    loop={true}
                    height="60%"
                    className="rounded-md"
                    width="60%"
                  />
                </div>
              )}
            </div>
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
