
export enum TaskType {
  DAILY = 'daily',
  ONCE = 'once'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  duration: number; // For daily tasks, number of days
  rewardId: string;
}

export enum RewardType {
  TEXT = 'text',
  IMAGE = 'image',
  GEMINI_STORY = 'gemini-story'
}

export interface Reward {
  id: string;
  title: string;
  type: RewardType;
  content: string; // URL for image, prompt for Gemini, text for text
}

export interface UserProgress {
  name: string;
  completedTasks: string[];
  unlockedRewards: string[];
  dailyProgress: Record<string, {
    completedDates: string[];
    currentProgress: number;
  }>;
}
