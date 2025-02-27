import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { marked } from "marked";

function makeMarkdown(content: string) {
  const html = marked.parse(content);

  return html;
}

export default function Reminders() {
  const reminders = [
    { title: "AI Model", message: "Deadline: 28th march 2025" },
    {
      title: "Delete: ",
      message: "The mail storage is full, delete all the mails asap.",
    },
    {
      title: "Book Tickets",
      message: "Book tickets for interstellar… it’s only up for a week.",
    },
    {
      title: "The special day:",
      message: `Don't mess this up!!

Balloons and Banner

Tableware

Birthday Cake

Party Games

Music Playlist

Goodie Bags

A Special Gift

Craft Station or DIY Activity

Birthday Crown or Sash

Thank-You Notes

Let's make this her best birthday!
`,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Reminders</h2>
      <div className="grid grid-cols-2 gap-4">
        {reminders.map((reminder, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{reminder.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                dangerouslySetInnerHTML={{
                  __html: makeMarkdown(reminder.message.replace(";", "")),
                }}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
