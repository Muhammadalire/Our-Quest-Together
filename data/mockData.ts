
import { Task, Reward, TaskType, RewardType } from '../types';

export const TASKS: Task[] = [
  {
    id: 't7',
    title: 'Hydration Challenge',
    description: 'Drink 8 glasses of water a day. Your body is a temple!',
    type: TaskType.DAILY,
    duration: 3,
    rewardId: 'r7',
  },
  {
    id: 't5',
    title: 'Spreading Positivity',
    description: 'Give 1 compliment to each family member, it can be anything like telling Nada how well she draws or telling Kakak how hard she worked for degree, etc.',
    type: TaskType.DAILY,
    duration: 2,
    rewardId: 'r5',
  },
  {
    id: 't6',
    title: 'Morning Appreciation',
    description: 'When you wake up, go in front of the mirror and praise yourself: "how adorable, kind, caring I am. How I am so loved and cared for. How sweet I am and how deeply I care. How I am such a good girl"',
    type: TaskType.DAILY,
    duration: 4,
    rewardId: 'r6',
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
    id: 'r7',
    title: 'A Silly Video',
    type: RewardType.TEXT,
    content: "A 30 second video of me doing cat-cow strech, trust me its weird.",
  },
  {
    id: 'r5',
    title: 'A Video ',
    type: RewardType.TEXT,
    content: 'A video of me doing dual jerk-off workout',
  },
  {
    id: 'r6',
    title: 'An Essay on Youu',
    type: RewardType.TEXT,
    content: 'A descriptive essay on your beauty, soul heart and appereance.',
  },
  
  {
    id: 'r4',
    title: 'Tummy Drum',
    type: RewardType.TEXT,
    content: "Me doing tummy drum."
  }
];
   