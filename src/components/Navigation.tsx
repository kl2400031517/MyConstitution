import { useState } from 'react';
import { Home, Search, MessageCircle, User, Scale, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import type { Screen, User as UserType } from '../types';
import { StorageUtils } from '../utils/storage';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  user: UserType | null;
}

export function Navigation({ currentScreen, onNavigate, onLogout, user }: NavigationProps) {
  const [theme, setTheme] = useState(StorageUtils.getTheme());

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    StorageUtils.setTheme(newTheme);
  };
  const navItems = [
    { id: 'home' as Screen, label: 'Home', icon: Home },
    { id: 'explore' as Screen, label: 'Explore', icon: Search, 
      onClick: () => {
        if (user?.role === 'Admin') onNavigate('admin');
        else if (user?.role === 'Educator') onNavigate('educator');
        else if (user?.role === 'Citizen') onNavigate('citizen');
        else if (user?.role === 'Legal Expert') onNavigate('legal');
        else onNavigate('citizen');
      }
    },
    { id: 'discussion' as Screen, label: 'Discussion', icon: MessageCircle },
    { id: 'profile' as Screen, label: 'Profile', icon: User },
  ];

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-navy-blue rounded-lg flex items-center justify-center">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-navy-blue">MyConstitution</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id || 
                (item.id === 'explore' && ['admin', 'educator', 'citizen', 'legal'].includes(currentScreen));
              
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={item.onClick || (() => onNavigate(item.id))}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-navy-blue/10 text-navy-blue' 
                      : 'text-gray-600 hover:text-navy-blue hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {user && (
              <div className="hidden md:block text-sm text-gray-600">
                <span className="font-medium">{user.name}</span>
                <span className="ml-2 px-2 py-1 bg-saffron/20 text-saffron rounded text-xs">
                  {user.role}
                </span>
              </div>
            )}
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className="p-2 h-auto"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              onClick={onLogout}
              className="border-gray-300 text-gray-600 hover:text-navy-blue"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200">
          <nav className="flex items-center justify-around py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id || 
                (item.id === 'explore' && ['admin', 'educator', 'citizen', 'legal'].includes(currentScreen));
              
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={item.onClick || (() => onNavigate(item.id))}
                  className={`flex flex-col items-center space-y-1 px-3 py-2 ${
                    isActive 
                      ? 'text-navy-blue' 
                      : 'text-gray-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}