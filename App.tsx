import React from 'react';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  // The user is always 'khumaira' for a personalized experience. No login needed.
  const userName = 'khumaira';

  // The Dashboard is rendered directly, as the user is now fixed.
  return <Dashboard userName={userName} />;
};

export default App;
