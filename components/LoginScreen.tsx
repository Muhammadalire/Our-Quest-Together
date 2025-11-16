
import React, { useState } from 'react';
import { HeartIcon } from './icons';

interface LoginScreenProps {
  onLogin: (name: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blush to-cream p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-center transform hover:scale-105 transition-transform duration-500">
        <HeartIcon className="w-20 h-20 text-rose-gold mx-auto -mt-20 mb-4 animate-pulse" />
        <h1 className="font-serif text-4xl text-charcoal">Our Love Quests</h1>
        <p className="font-sans text-gray-600 mt-2 mb-8">A little world for just the two of us.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-bold text-charcoal mb-2 font-sans">
              Enter your name my love?
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name here"
              className="font-sans shadow-inner appearance-none border-2 border-blush rounded-lg w-full py-3 px-4 text-white-700 leading-tight focus:outline-none focus:ring-2 focus:ring-rose-gold focus:border-transparent transition"
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
         <div className="mt-8 text-xs text-gray-500 font-sans">
            <p><strong>Note for the developer (my amazing partner):</strong></p>
            <p>This app stores all progress on your device. To add/edit tasks or rewards, you'll need to edit the `data/mockData.ts` file in the code. To add a personalized Gemini story, edit `components/RewardModal.tsx` where it says "Your Name".</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
   