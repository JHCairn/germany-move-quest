import { useState } from 'react';
import './App.css';
import LandingPage from './pages/LandingPage';
import AppShell from './components/AppShell';

function App() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return <LandingPage onStart={() => setStarted(true)} />;
  }

  return <AppShell />;
}

export default App;