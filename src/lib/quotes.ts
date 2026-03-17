// Inspirational quotes for the zen garden UI (from PR3)
export const INSPIRATIONAL_QUOTES = [
  { text: "You are not alone. Reach out and touch someone.", author: "TouchBase" },
  { text: "The present moment always will have been.", author: "Unknown" },
  { text: "Rest if you must, but don't you quit.", author: "Edgar A. Guest" },
  { text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared, and anxious.", author: "Lori Deschene" },
  { text: "In the middle of winter, I at last discovered that there was in me an invincible summer.", author: "Albert Camus" },
  { text: "Even the darkest night will end and the sun will rise.", author: "Victor Hugo" },
  { text: "Your feelings are valid. Your experience matters.", author: "TouchBase" },
  { text: "Sometimes the bravest thing you can do is ask for help.", author: "TouchBase" },
  { text: "Healing is not linear.", author: "Unknown" },
  { text: "You survived all of your worst days so far.", author: "Unknown" },
];

export function getRandomQuote() {
  return INSPIRATIONAL_QUOTES[Math.floor(Math.random() * INSPIRATIONAL_QUOTES.length)];
}
