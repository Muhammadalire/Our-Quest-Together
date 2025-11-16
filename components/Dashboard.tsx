import React, { useState, useCallback, useMemo } from 'react';
import { Task, Reward, UserProgress, TaskType } from '../types';
import useUserProgress from '../hooks/useUserProgress';
import RewardModal from './RewardModal';
import { TASKS, REWARDS } from '../data/mockData';
import { HeartIcon, CheckCircleIcon, LockIcon, GiftIcon, SyncIcon } from './icons';
import SyncProgressModal from './SyncProgressModal';

interface DashboardProps {
  userName: string;
}

const isToday = (someDate: string) => {
    const today = new Date();
    const date = new Date(someDate);
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
};

const Header: React.FC<{ userName: string, streak: number, onOpenSync: () => void }> = ({ userName, streak, onOpenSync }) => (
    <header className="bg-blush/80 backdrop-blur-sm p-4 rounded-b-2xl shadow-lg sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div>
                <h1 className="font-serif text-2xl md:text-3xl text-rose-gold">For {userName}</h1>
                <p className="font-sans text-charcoal">Our Love Quests</p>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
                <div className="text-center">
                    <HeartIcon className="w-8 h-8 text-red-500 mx-auto"/>
                    <span className="font-bold text-lg text-rose-gold">{streak}</span>
                </div>
                <button onClick={onOpenSync} title="Sync Progress" className="font-sans bg-rose-gold text-white p-2 rounded-full hover:bg-opacity-80 transition">
                    <SyncIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    </header>
);

const TaskItem: React.FC<{ task: Task, progress: UserProgress, onComplete: (taskId: string) => void }> = ({ task, progress, onComplete }) => {
    const taskProgress = progress.dailyProgress[task.id] || { currentProgress: 0, completedDates: [] };
    const isCompleted = progress.completedTasks.includes(task.id);
    const todayStr = new Date().toDateString();
    const completedToday = taskProgress.completedDates.includes(todayStr);

    return (
        <div className={`bg-white/80 p-5 rounded-xl shadow-md transition-all duration-300 ${isCompleted ? 'bg-green-100/80' : 'hover:shadow-lg hover:scale-[1.02]'}`}>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-serif text-xl text-charcoal">{task.title}</h3>
                    <p className="font-sans text-sm text-gray-600 mt-1">{task.description}</p>
                </div>
                {isCompleted && <CheckCircleIcon className="w-8 h-8 text-green-500 flex-shrink-0 ml-2" />}
            </div>
            
            {task.type === TaskType.DAILY && !isCompleted && (
                <div className="mt-4">
                    <div className="w-full bg-blush rounded-full h-2.5">
                        <div className="bg-rose-gold h-2.5 rounded-full" style={{ width: `${(taskProgress.currentProgress / task.duration) * 100}%` }}></div>
                    </div>
                    <p className="text-right text-xs font-sans text-rose-gold mt-1">Day {taskProgress.currentProgress} of {task.duration}</p>
                </div>
            )}
            
            {!isCompleted && (
                <button 
                    onClick={() => onComplete(task.id)}
                    disabled={completedToday}
                    className="mt-4 w-full bg-rose-gold text-white font-bold py-2 px-4 rounded-lg transition-all disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-opacity-50"
                >
                    {completedToday ? "Done for Today!" : "I did this!"}
                </button>
            )}
        </div>
    );
};

const RewardItem: React.FC<{ reward: Reward, isUnlocked: boolean, onOpen: (reward: Reward) => void }> = ({ reward, isUnlocked, onOpen }) => (
    <div 
        onClick={() => isUnlocked && onOpen(reward)}
        className={`relative p-5 rounded-xl shadow-md transition-all duration-300 text-center flex flex-col justify-center items-center h-40 ${isUnlocked ? 'bg-gold-leaf/80 cursor-pointer hover:shadow-xl hover:scale-105' : 'bg-gray-300/70'}`}
    >
        {isUnlocked ? (
            <>
                <GiftIcon className="w-12 h-12 text-white" />
                <h3 className="font-serif text-lg text-white mt-2">{reward.title}</h3>
                <p className="font-sans text-sm text-white/90">Click to Open</p>
            </>
        ) : (
            <>
                <LockIcon className="w-12 h-12 text-gray-500" />
                <h3 className="font-serif text-lg text-gray-600 mt-2">Locked Surprise</h3>
            </>
        )}
    </div>
);


const Dashboard: React.FC<DashboardProps> = ({ userName }) => {
  const [userProgress, saveUserProgress] = useUserProgress(userName);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  const tasks = useMemo(() => TASKS, []);
  const rewards = useMemo(() => REWARDS, []);
  
  const handleTaskCompletion = useCallback((taskId: string) => {
      if (!userProgress) return;
  
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;
  
      let newProgress = { ...userProgress, dailyProgress: { ...userProgress.dailyProgress } };
      const today = new Date();
      const todayStr = today.toDateString();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
  
      // Update streak
      if (userProgress.lastCompletedDate !== todayStr) {
          if (userProgress.lastCompletedDate === yesterday.toDateString()) {
              newProgress.streak += 1;
          } else {
              newProgress.streak = 1;
          }
          newProgress.lastCompletedDate = todayStr;
      }
  
      let taskProgress = newProgress.dailyProgress[taskId] || { currentProgress: 0, completedDates: [] };
      if (taskProgress.completedDates.includes(todayStr)) return; // Already completed today
      
      taskProgress.completedDates.push(todayStr);
  
      if (task.type === TaskType.ONCE) {
          newProgress.completedTasks = [...newProgress.completedTasks, taskId];
          newProgress.unlockedRewards = [...newProgress.unlockedRewards, task.rewardId];
      } else if (task.type === TaskType.DAILY) {
          taskProgress.currentProgress += 1;
          if (taskProgress.currentProgress >= task.duration) {
              newProgress.completedTasks = [...newProgress.completedTasks, taskId];
              newProgress.unlockedRewards = [...newProgress.unlockedRewards, task.rewardId];
          }
      }
  
      newProgress.dailyProgress[taskId] = taskProgress;
      saveUserProgress(newProgress);
  }, [userProgress, saveUserProgress, tasks]);

  if (!userProgress) {
    return (
        <div className="min-h-screen bg-rose-gold flex items-center justify-center">
            <p className="text-white font-serif text-2xl animate-pulse">Loading your love story...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream font-sans text-charcoal">
      <Header userName={userName} streak={userProgress.streak} onOpenSync={() => setIsSyncModalOpen(true)} />
      
      <main className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
        <section>
          <h2 className="font-serif text-3xl text-rose-gold mb-4">Your Quests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.map(task => (
              <TaskItem key={task.id} task={task} progress={userProgress} onComplete={handleTaskCompletion} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-serif text-3xl text-rose-gold mb-4">Unlocked Surprises</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {rewards.map(reward => (
              <RewardItem 
                key={reward.id} 
                reward={reward} 
                isUnlocked={userProgress.unlockedRewards.includes(reward.id)} 
                onOpen={setSelectedReward} 
              />
            ))}
          </div>
        </section>
      </main>
      
      <RewardModal 
        reward={selectedReward} 
        onClose={() => setSelectedReward(null)}
        userProgress={userProgress}
      />
      <SyncProgressModal 
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        userNameToLoad={userName}
        onLoadSuccess={() => {
            // This is mainly for the login screen, but we close the modal here
            setIsSyncModalOpen(false);
        }}
      />
    </div>
  );
};

export default Dashboard;