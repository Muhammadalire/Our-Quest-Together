
import { Task, Reward, TaskType, RewardType } from '../types';

export const TASKS: Task[] = [
  {
    id: 't1',
    title: 'Hydration Challenge',
    description: 'Drink 8 glasses of water a day. Your body is a temple!',
    type: TaskType.ONCE,
    duration: 1,
    rewardId: 'r1',
  },
  {
    id: 't2',
    title: 'A Walk to Remember',
    description: 'Go for a 20-minute walk together, hold hands, and talk about your day.',
    type: TaskType.ONCE,
    duration: 1,
    rewardId: 'r2',
  },
  {
    id: 't3',
    title: 'Morning Appreciation',
    description: 'For 1 days, start each morning by telling each other one thing you love about them.',
    type: TaskType.ONCE,
    duration: 1,
    rewardId: 'r3',
  },
  {
    id: 't4',
    title: 'Screen-Free Evening',
    description: 'Spend one evening completely screen-free. Play a board game, read, or just cuddle.',
    type: TaskType.ONCE,
    duration: 1,
    rewardId: 'r4'
  }
];

export const REWARDS: Reward[] = [
  {
    id: 'r1',
    title: 'A Special Video',
    type: RewardType.TEXT,
    content: "A 30 second video of me doing random stuff",
  },
  {
    id: 'r2',
    title: 'Our Adventure',
    type: RewardType.IMAGE,
    content: 'https://picsum.photos/seed/lovewalk/600/400',
  },
  {
    id: 'r3',
    title: 'A Story About Us',
    type: RewardType.GEMINI_STORY,
    content: 'Write a story about how our love is a guiding light, brighter than any star.',
  },
  {
    id: 'r4',
    title: 'A Promise',
    type: RewardType.TEXT,
    content: "I promise to always make time for us, to put away distractions, and to be present with you. This is just the beginning."
  }
];
   