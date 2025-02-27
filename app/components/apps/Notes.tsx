import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { marked } from "marked";

export default function Notes() {
  const notes = [
    {
      title: "The Secret of the Messenger:",
      content: `_The Messenger’s Secret_\n\n
Once upon a time, in a land of shadows and whispers, there was a messenger who held the key to all secrets. His job was to carry messages, but he never spoke a word aloud. The messenger carried a map with five locations marked, each holding a unique treasure. Only those who solved the puzzles at each location could uncover the secret message and gain access to the messenger’s treasure.

\n\n
**The Forest of Numbers**

The first stop on the map led to the Forest of Numbers, where the trees whispered mathematical riddles. The messenger was tasked with solving this puzzle:

“I start with a number, bigger than two,

Add the number of months in a year, and you'll have a clue.

Subtract the number of days in a week, and you’re almost through!”
\n\n

**The River of Letters**

Next, the messenger came to the River of Letters, where the current flowed with letters instead of water. The message read:
\n\n

“In the alphabet, I stand in the 7th place,

Add the 3rd letter to me, and you’ll see my face.”

**The Cave of Shadows**

The cave was dark, with walls covered in strange markings. The messenger found this riddle inscribed on the rock:

“I am the number of sides on a triangle,

If you double me, you'll find the next clue angle.”

**The Mountain of Time**

At the top of the mountain, there was a clock frozen in time. A riddle was carved into the stone:

“I am the number of hours in a day,

Take away the number of minutes in an hour,

And you’ll find the digits for the key to your power.”

**The Key of Words**

Finally, the messenger arrived at the Key of Words, a stone tablet with one final clue:

“I am the letter that stands for the beginning,

But in this puzzle, I must stand at the end”
`,
    },
    {
      title: "My Email",
      content: "mail:gehermanklein@gmail.com\npassword:daughter-dd-YY",
    },
  ];

  function makeMarkdown(content: string) {
    const html = marked.parse(content);

    return html;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Notes</h2>
      <div className="grid grid-cols-1 gap-4">
        {notes.map((note, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                dangerouslySetInnerHTML={{
                  __html: makeMarkdown(note.content.replace(";", "")),
                }}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
