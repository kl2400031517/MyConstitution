import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Educator from './pages/Educator';
import Citizen from './pages/Citizen';
import LegalExpert from './pages/LegalExpert';
import UserForm from './components/UserForm';
import ProtectedRoute from './components/ProtectedRoute';
import './styles.css';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app load
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  if (isLoading) {
    return (
      <div className="text-center" style={{ padding: '2rem' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route 
              path="/login" 
              element={
                user ? <Navigate to="/" replace /> : 
                <UserForm onLogin={handleLogin} isLogin={true} />
              } 
            />
            <Route 
              path="/register" 
              element={
                user ? <Navigate to="/" replace /> : 
                <UserForm onLogin={handleLogin} isLogin={false} />
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute user={user} requiredRole="Admin">
                  <Admin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/educator" 
              element={
                <ProtectedRoute user={user} requiredRole="Educator">
                  <Educator />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/citizen" 
              element={
                <ProtectedRoute user={user} requiredRole="Citizen">
                  <Citizen />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/legal-expert" 
              element={
                <ProtectedRoute user={user} requiredRole="Legal Expert">
                  <LegalExpert />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;