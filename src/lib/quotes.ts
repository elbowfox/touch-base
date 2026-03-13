// Inspirational quotes from Dao De Jing and Buddhist philosophy
export interface Quote {
  text: string;
  source: string;
  chapter?: string;
}

export const daoDeJingQuotes: Quote[] = [
  {
    text: "The journey of a thousand miles begins with a single step.",
    source: "Dao De Jing",
    chapter: "Chapter 64",
  },
  {
    text: "When I let go of what I am, I become what I might be.",
    source: "Dao De Jing",
    chapter: "Lao Tzu",
  },
  {
    text: "Nature does not hurry, yet everything is accomplished.",
    source: "Dao De Jing",
    chapter: "Lao Tzu",
  },
  {
    text: "To the mind that is still, the whole universe surrenders.",
    source: "Dao De Jing",
    chapter: "Lao Tzu",
  },
  {
    text: "Those who know do not speak. Those who speak do not know.",
    source: "Dao De Jing",
    chapter: "Chapter 56",
  },
  {
    text: "Be content with what you have; rejoice in the way things are.",
    source: "Dao De Jing",
    chapter: "Lao Tzu",
  },
  {
    text: "The wise man is one who knows what he does not know.",
    source: "Dao De Jing",
    chapter: "Lao Tzu",
  },
  {
    text: "Silence is a source of great strength.",
    source: "Dao De Jing",
    chapter: "Lao Tzu",
  },
  {
    text: "Do the difficult things while they are easy and do the great things while they are small.",
    source: "Dao De Jing",
    chapter: "Chapter 63",
  },
  {
    text: "He who knows that enough is enough will always have enough.",
    source: "Dao De Jing",
    chapter: "Chapter 46",
  },
];

export const buddhistQuotes: Quote[] = [
  {
    text: "Peace comes from within. Do not seek it without.",
    source: "Buddhist Wisdom",
    chapter: "Buddha",
  },
  {
    text: "The root of suffering is attachment.",
    source: "Buddhist Wisdom",
    chapter: "Buddha",
  },
  {
    text: "No one saves us but ourselves. No one can and no one may. We ourselves must walk the path.",
    source: "Buddhist Wisdom",
    chapter: "Buddha",
  },
  {
    text: "In the end, only three things matter: how much you loved, how gently you lived, and how gracefully you let go of things not meant for you.",
    source: "Buddhist Wisdom",
    chapter: "Buddha",
  },
  {
    text: "Every morning we are born again. What we do today is what matters most.",
    source: "Buddhist Wisdom",
    chapter: "Buddha",
  },
  {
    text: "The mind is everything. What you think you become.",
    source: "Buddhist Wisdom",
    chapter: "Buddha",
  },
  {
    text: "Three things cannot be long hidden: the sun, the moon, and the truth.",
    source: "Buddhist Wisdom",
    chapter: "Buddha",
  },
  {
    text: "You yourself, as much as anybody in the entire universe, deserve your love and affection.",
    source: "Buddhist Wisdom",
    chapter: "Buddha",
  },
  {
    text: "Holding onto anger is like drinking poison and expecting the other person to die.",
    source: "Buddhist Wisdom",
    chapter: "Buddha",
  },
  {
    text: "Thousands of candles can be lighted from a single candle, and the life of the candle will not be shortened. Happiness never decreases by being shared.",
    source: "Buddhist Wisdom",
    chapter: "Buddha",
  },
  {
    text: "The present moment is the only time over which we have dominion.",
    source: "Buddhist Wisdom",
    chapter: "Thich Nhat Hanh",
  },
  {
    text: "Breathing in, I calm body and mind. Breathing out, I smile.",
    source: "Buddhist Wisdom",
    chapter: "Thich Nhat Hanh",
  },
];

const allQuotes = [...daoDeJingQuotes, ...buddhistQuotes];

/**
 * Get a random inspirational quote
 */
export function getRandomQuote(): Quote {
  const randomIndex = Math.floor(Math.random() * allQuotes.length);
  return allQuotes[randomIndex];
}

/**
 * Get a specific number of random quotes
 */
export function getRandomQuotes(count: number): Quote[] {
  const shuffled = [...allQuotes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Get quotes by source
 */
export function getQuotesBySource(source: 'dao' | 'buddhist'): Quote[] {
  return source === 'dao' ? daoDeJingQuotes : buddhistQuotes;
}

/**
 * Get quote of the day (deterministic based on date)
 */
export function getQuoteOfTheDay(): Quote {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const index = dayOfYear % allQuotes.length;
  return allQuotes[index];
}
