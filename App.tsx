import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import LoginScreen from './components/LoginScreen';

const App: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Check for a saved user when the app loads
    const savedUser = localStorage.getItem('loveQuests_currentUser');
    if (savedUser) {
      setUserName(savedUser);
    }
  }, []);

  const handleLogin = (name: string) => {
    localStorage.setItem('loveQuests_currentUser', name);
    setUserName(name);
  };

  if (!userName) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <Dashboard userName={userName} />;
};

export default App;
