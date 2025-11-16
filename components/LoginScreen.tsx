
import React, { useState, useRef } from 'react';
import { HeartIcon } from './icons';
import { UserProgress } from '../types';

interface LoginScreenProps {
  onLogin: (name: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  const handleImportClick = () => {
    if (!name.trim()) {
      alert("Please enter your name first before loading progress.");
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result;
        if (typeof content !== 'string') throw new Error("Invalid file content");
        
        const importedProgress: UserProgress = JSON.parse(content);

        if (!importedProgress.name || importedProgress.name.toLowerCase() !== name.trim().toLowerCase()) {
          alert(`This progress file seems to be for "${importedProgress.name}", not "${name.trim()}". Please choose the correct file or enter the correct name.`);
          return;
        }
        if (typeof importedProgress.completedTasks === 'undefined' || typeof importedProgress.streak === 'undefined') {
            throw new Error("Invalid progress file format.");
        }

        window.localStorage.setItem(`userProgress_${name.trim()}`, JSON.stringify(importedProgress));
        
        onLogin(name.trim());

      } catch (error) {
        console.error("Error importing progress:", error);
        alert("Could not load progress from this file. It might be corrupted or not a valid progress file.");
      } finally {
        // Reset file input value to allow re-uploading the same file
        if (e.target) {
            e.target.value = '';
        }
      }
    };
    reader.readAsText(file);
  };


  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blush to-cream p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-center transform hover:scale-105 transition-transform duration-500">
        <HeartIcon className="w-20 h-20 text-rose-gold mx-auto -mt-20 mb-4 animate-pulse" />
        <h1 className="font-serif text-4xl text-charcoal">Our Love Quests</h1>
        <p className="font-sans text-gray-600 mt-2 mb-8">A little world for just the two of us.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-charcoal mb-2 font-sans">
              Enter your name my love?
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name here"
              className="font-sans shadow-inner appearance-none border-2 border-blush rounded-lg w-full py-3 px-4 text-charcoal leading-tight focus:outline-none focus:ring-2 focus:ring-rose-gold focus:border-transparent transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-rose-gold hover:bg-opacity-90 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-transform duration-200 transform hover:scale-105"
          >
            Begin Our Journey
          </button>
        </form>
        <div className="my-4">
            <button
                type="button"
                onClick={handleImportClick}
                className="w-full bg-transparent hover:bg-blush text-rose-gold font-bold py-3 px-4 rounded-lg border-2 border-rose-gold focus:outline-none focus:shadow-outline transition-all duration-200"
            >
                Load Our Progress
            </button>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelected}
                accept="application/json"
                style={{ display: 'none' }}
            />
        </div>
         <div className="mt-8 text-xs text-gray-500 font-sans">
            <p><strong>Note for the developer (my amazing partner):</strong></p>
            <p>This app stores all progress on your device. To add/edit tasks or rewards, you'll need to edit the `data/mockData.ts` file in the code. To add a personalized Gemini story, edit `components/RewardModal.tsx` where it says "Your Name".</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
