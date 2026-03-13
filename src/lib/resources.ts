import { Resource } from './types';

// Default resources for mental health and wellbeing
export const defaultResources: Resource[] = [
  {
    id: '1',
    title: 'Guided Meditation for Beginners',
    description: 'Start your meditation journey with simple breathing exercises',
    category: 'meditation',
    icon: '🧘',
    url: 'https://www.mindful.org/meditation/mindfulness-getting-started/',
  },
  {
    id: '2',
    title: 'Mindfulness in Daily Life',
    description: 'Practical tips to bring mindfulness into everyday activities',
    category: 'mindfulness',
    icon: '🌸',
  },
  {
    id: '3',
    title: 'Find a Therapist',
    description: 'Connect with licensed mental health professionals',
    category: 'therapy',
    icon: '💚',
    karmaPointsCost: 0,
  },
  {
    id: '4',
    title: 'National Suicide Prevention Lifeline',
    description: '24/7 free and confidential support - Call 988',
    category: 'crisis-hotlines',
    icon: '📞',
    url: 'tel:988',
  },
  {
    id: '5',
    title: 'Crisis Text Line',
    description: 'Text HOME to 741741 - Free 24/7 crisis support',
    category: 'crisis-hotlines',
    icon: '💬',
    url: 'sms:741741',
  },
  {
    id: '6',
    title: 'Anxiety Support Group',
    description: 'Connect with others who understand what you\'re going through',
    category: 'support-groups',
    icon: '🤝',
  },
  {
    id: '7',
    title: 'The Power of Now',
    description: 'Recommended reading on mindfulness and presence',
    category: 'reading',
    icon: '📚',
  },
  {
    id: '8',
    title: 'Breathing Exercises',
    description: 'Quick techniques to calm your mind in stressful moments',
    category: 'meditation',
    icon: '🌬️',
  },
];

// Sample vents for initial feed (for development/demo)
export const sampleVents = [
  {
    id: '1',
    content: 'Feeling overwhelmed with work lately. Just needed to get this off my chest.',
    category: 'work' as const,
    isAnonymous: true,
    supportCount: 12,
  },
  {
    id: '2',
    content: 'Taking things one day at a time. Small steps forward.',
    category: 'general' as const,
    isAnonymous: false,
    supportCount: 8,
  },
  {
    id: '3',
    content: 'Anxiety has been high, but I\'m learning to breathe through it.',
    category: 'anxiety' as const,
    isAnonymous: true,
    supportCount: 15,
  },
];
