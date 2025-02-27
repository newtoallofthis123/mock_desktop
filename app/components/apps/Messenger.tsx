import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { marked } from "marked";
import ChatInterface from "./chat-interface";

function makeMarkdown(content: string) {
  const html = marked.parse(content);

  return html;
}

export default function Messenger() {
  const chats = [
    {
      name: "Researcher Jacob",
      messages: [
        {
          name: "Jacob",
          content:
            "Hey, have you finished testing the new AI model you’ve been working on?",
        },
        {
          name: "You",
          content:
            "Not yet, still running some final adjustments. I’m trying to improve its ability to handle ambiguous input.",
        },
        {
          name: "Jacob",
          content: "Interesting. Are you planning to release the beta soon?",
        },
        {
          name: "You",
          content:
            "I’m aiming for next week. A few more refinements and we’ll be good to go.",
        },
      ],
    },
    {
      name: "Colleague Lily",
      messages: [
        {
          name: "Lily",
          content:
            "How’s the AI language model progressing? Any breakthroughs?",
        },
        {
          name: "You",
          content:
            "We’ve got the model, LexiBot, working for basic queries now, but still need to train it on a broader dataset.",
        },
        {
          name: "Lily",
          content:
            "Sounds like a huge project. Any issues with the training set?",
        },
        {
          name: "You",
          content:
            "Yeah, some datasets are hard to balance, but we’re working on that. It’s a bit slow, but we’ll get there.",
        },
      ],
    },
    {
      name: "Specilist Varun",
      messages: [
        {
          name: "Varun",
          content:
            "You mentioned implementing a new neural network architecture. How’s that going?",
        },
        {
          name: "You",
          content:
            "It’s going well! The initial tests are showing good results in terms of contextual understanding.",
        },
        {
          name: "Varun",
          content:
            "Great! Keep me posted when you start the real-world scenario testing.",
        },
        {
          name: "You",
          content:
            "Definitely! I’ll let you know when the model hits the next milestone.",
        },
      ],
    },
    {
      name: "Honey",
      messages: [
        {
          name: "Honey",
          content:
            "Have you talked to Amy today? How’s she feeling about her trip?",
        },
        {
          name: "You",
          content:
            "She’s really excited, but a bit nervous about going alone. You know, it’s her first big solo trip.",
        },
        {
          name: "Honey",
          content:
            "She’ll be fine. She’s 20 now, she’s more than capable of handling it. Plus, this is a great opportunity for her.",
        },
        {
          name: "You",
          content:
            "Yeah, I think so too. It’s a big step for her. I just hope she enjoys it and stays safe.",
        },
      ],
    },
    {
      name: "Amy",
      messages: [
        {
          name: "You",
          content:
            "Hey, sweetie, is everything okay? You’ve seemed a little quiet today.",
        },
        {
          name: "Daughter",
          content:
            "I don't know, I’ve just been feeling a bit off. I can’t help but feel disappointed that you didn’t remember.",
        },
        {
          name: "You",
          content: "Remember what, honey?",
        },
        {
          name: "Daughter",
          content:
            "My birthday. Yesterday was my birthday, and I thought you’d remember. You know, it’s always such an important day for us, and I just felt... overlooked. It kind of hurts.",
        },
        {
          name: "You",
          content:
            "Oh no, I’m so sorry! I’ve been so caught up with the AI project that I completely lost track. I never meant to hurt your feelings.",
        },
        {
          name: "Daughter",
          content:
            "I know you’ve been busy with work, but I just expected a little more. It’s always been a special day for us, and I thought we'd do something to celebrate, you know?",
        },
        {
          name: "You",
          content:
            "I get it. I’m really sorry I missed it. I promise we’ll make it up, just the two of us. How about we do something special tonight? I’ll plan something just for you, I swear.",
        },
        {
          name: "Daughter",
          content:
            "I guess... that would be nice. I just wanted to feel like it mattered, you know? But I’ll try not to be too upset about it.",
        },
        {
          name: "You",
          content:
            "You matter so much to me, honey. And I won’t forget this. Let’s make tonight unforgettable. We’ll celebrate you, and I’ll make it the best birthday ever, even if it’s a little late.",
        },
      ],
    },
  ];
  return (
    <div>
      <ChatInterface conversations={chats} />
    </div>
  );
}
