import { useState, useEffect } from 'react';
import { OnboardingScreen } from './components/OnboardingScreen';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { AdminDashboard } from './components/AdminDashboard';
import { EducatorPage } from './components/EducatorPage';
import { CitizenPage } from './components/CitizenPage';
import { LegalExpertPage } from './components/LegalExpertPage';
import { QuizScreen } from './components/QuizScreen';
import { DiscussionBoard } from './components/DiscussionBoard';
import { ProfileScreen } from './components/ProfileScreen';
import { StorageUtils, initializeApp, trackPageVisit } from './utils/storage';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize app and check for saved user session
  useEffect(() => {
    initializeApp();
    
    // Check if user is already logged in
    const savedUser = StorageUtils.getUser();
    if (savedUser && StorageUtils.isLoggedIn()) {
      setUser(savedUser);
      setCurrentScreen('home');
    }
    
    setIsLoading(false);
  }, []);

  // Track page visits
  useEffect(() => {
    if (currentScreen !== 'onboarding' && currentScreen !== 'login') {
      trackPageVisit(currentScreen);
    }
  }, [currentScreen]);

  const navigateToScreen = (screen) => {
    setCurrentScreen(screen);
  };

  const handleLogin = (userData) => {
    // Save user to localStorage
    StorageUtils.saveUser(userData);
    setUser(userData);
    setCurrentScreen('home');
    
    // Update learning streak
    StorageUtils.updateLearningStreak();
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    StorageUtils.logout();
    setUser(null);
    setCurrentScreen('onboarding');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen onGetStarted={() => navigateToScreen('login')} />;
      case 'login':
        return <LoginScreen onLogin={handleLogin} onBack={() => navigateToScreen('onboarding')} />;
      case 'home':
        return <HomeScreen user={user} onNavigate={navigateToScreen} onLogout={handleLogout} />;
      case 'admin':
        return <AdminDashboard user={user} onNavigate={navigateToScreen} onLogout={handleLogout} />;
      case 'educator':
        return <EducatorPage user={user} onNavigate={navigateToScreen} onLogout={handleLogout} />;
      case 'citizen':
        return <CitizenPage user={user} onNavigate={navigateToScreen} onLogout={handleLogout} />;
      case 'legal':
        return <LegalExpertPage user={user} onNavigate={navigateToScreen} onLogout={handleLogout} />;
      case 'quiz':
        return <QuizScreen user={user} onNavigate={navigateToScreen} onLogout={handleLogout} />;
      case 'discussion':
        return <DiscussionBoard user={user} onNavigate={navigateToScreen} onLogout={handleLogout} />;
      case 'profile':
        return <ProfileScreen user={user} onNavigate={navigateToScreen} onLogout={handleLogout} />;
      default:
        return <OnboardingScreen onGetStarted={() => navigateToScreen('login')} />;
    }
  };

  // Show loading screen while checking for saved session
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-navy-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">⚖️</span>
          </div>
          <h2 className="text-xl font-bold text-navy-blue mb-2">MyConstitution</h2>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {renderCurrentScreen()}
    </div>
  );
}


