import React from 'react';
import Home from './Home';
import Exercise from './Exercise';
import AIAssistantPage from './AIAssistantPage';
import AssistantWeb from './AssistantWeb';
import Diet from './Diet';
import Login from './Login';
import Profile from './Profile';
import { ThemeProvider } from './ThemeContext';
import { BMIProvider } from './BMIContext';
import './App.css';

function App() {
  const [route] = useHashRoute();

  return (
    <ThemeProvider>
      <BMIProvider>
        {route === '/exercise' ? (
          <Exercise />
        ) : route === '/assistant' ? (
          <AIAssistantPage />
        ) : route === '/assistant-web' ? (
          <AssistantWeb />
        ) : route === '/diet' ? (
          <Diet />
        ) : route === '/login' ? (
          <Login />
        ) : route === '/profile' ? (
          <Profile />
        ) : (
          <Home />
        )}
      </BMIProvider>
    </ThemeProvider>
  );
}

export default App

function useHashRoute() {
  const [route, setRoute] = React.useState(getHashRoute());

  React.useEffect(() => {
    const handler = () => setRoute(getHashRoute());
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  return [route, setRoute];
}

function getHashRoute() {
  const hash = window.location.hash || '#/';
  return hash.replace('#', '') || '/';
}
