
import { Task, Reward, TaskType, RewardType } from '../types';

export const TASKS: Task[] = [
  {
    id: 't1',
    title: 'Hydration Challenge',
    description: 'Drink 8 glasses of water a day. Your body is a temple!',
    type: TaskType.DAILY,
    duration: 3,
    rewardId: 'r1',
  },
  {
    id: 't2',
    title: 'Spreading Positivity',
    description: 'Give 1 compliment to each family member, it can be anything like telling Nada how well she draws or telling Kakak how hard she worked for degree, etc.',
    type: TaskType.ONCE,
    duration: 1,
    rewardId: 'r2',
  },
  {
    id: 't3',
    title: 'Morning Appreciation',
    description: 'When you wake up, go in front of the mirror and praise yourself: "how adorable, kind, caring I am. How I am so loved and cared for. How sweet I am and how deeply I care. How I am such a good girl"',
    type: TaskType.ONCE,
    duration: 1,
    rewardId: 'r3',
  },
  {
    id: 't4',
    title: 'Good Girl',
    description: 'Write "I am my sweet loves good girl" three times on any journal/copy/notebook or digitally.',
    type: TaskType.ONCE,
    duration: 1,
    rewardId: 'r4'
  }
];

export const REWARDS: Reward[] = [
  {
    id: 'r1',
    title: 'A Silly Video',
    type: RewardType.TEXT,
    content: "A 30 second video of me doing cat-cow strech",
  },
  {
    id: 'r2',
    title: 'A TikTok ',
    type: RewardType.TEXT,
    content: 'A video of me pn geyomi song.',
  },
  {
    id: 'r3',
    title: 'An Essay on Youu',
    type: RewardType.TEXT,
    content: 'A descriptive essay on your beauty, soul heart and appereance.',
  },
  {
    id: 'r4',
    title: 'A Promise',
    type: RewardType.TEXT,
    content: "I promise, always make time for us, to put away distractions, and to be present with you. This is just the beginning."
  }
];
   