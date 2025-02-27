import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { marked } from "marked";

function makeMarkdown(content: string) {
  const html = marked.parse(content);

  return html;
}

export default function Mail() {
  const emails = [
    {
      subject: "Checking In & AI Model Update!",
      content: `
Hey Geherman,

I hope this email finds you well! It’s been a while since we caught up, and I’ve been thinking about you lately. How have you been? I know you’ve been deep into that AI model of yours, and I’m really curious to hear how it’s going. Any breakthroughs yet? You always had such a knack for that kind of thing, and I bet this project is going to be amazing when it’s all done!
By the way, I wanted to tell you about the new game I’ve been working on. It’s in beta testing right now, and I thought you’d love it since I know how much you enjoy arcade games. This one has a coin system, where players collect coins as they play. The twist is that these coins are tied to real money, and the beta is specifically focused on testing the transfer of these coins to actual cash in the bank.

It’s a pretty exciting concept, and I’d love for you to try it out and let me know how the transfer process works on your end. You’ve always been great at spotting potential issues, and it would mean a lot to have your feedback on this system.
Take care of yourself, buddy. I know you’re always busy, but don’t forget to take a breather every now and then. Looking forward to hearing back from you!


Best,

Jacob
`,
    },
    {
      subject: "Little Surprise",
      content: `Hey Geherman,

I hope you’re doing well! I’ve been trying to reach you but haven’t heard back, so I thought I’d send you an email instead. I just wanted to say I really admire you – I’ve always looked up to you and want to be like you when I grow up!
While working on a project, I somehow ended up fitting one of my friend’s games into a calculator app. It’s kind of random, but it gets triggered by a special number. I’ve left some clues in the gallery to help you find it. I know you’ll figure it out!

Hope we can catch up soon.

Take care!

Jake (Nephew)`,
    },
    {
      subject: "Beware of Betting Apps",
      content: `
Dear Geherman,

This is an official reminder from Gov USA about the risks of betting apps:

Financial losses and gambling addiction.
Potential fraud from unregulated platforms.
Legal issues in some areas.
Please ensure any app is licensed, set betting limits, and seek help if needed.

Stay safe,

Government of USA
`,
    },
    {
      subject: "Booking Confirmation – Paris Anniversary Trip",
      content: `
Dear Geherman,

Your tickets to Paris for your 26th anniversary have been successfully booked.
Booking Reference: 21213sajj12
Departure Date: 07-03-2025
Return Date: 14-03-2025
Please find your e-tickets attached. If you have any questions, feel free to contact us.
Wishing you a wonderful anniversary celebration!

Best regards,

Plan Ahead
`,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Mail</h2>
      <div className="space-y-4">
        {emails.map((email, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{email.subject}</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                dangerouslySetInnerHTML={{
                  __html: makeMarkdown(email.content.replace(";", "")),
                }}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
