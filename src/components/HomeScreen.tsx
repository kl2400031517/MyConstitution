import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Navigation } from './Navigation';
import { 
  Shield, 
  Heart, 
  BookOpen, 
  Brain, 
  Users, 
  Award,
  ArrowRight,
  TrendingUp,
  Bookmark,
  Clock,
  CheckCircle
} from 'lucide-react';
import type { User, Screen } from '../types';
import { StorageUtils } from '../utils/storage';

interface HomeScreenProps {
  user: User | null;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function HomeScreen({ user, onNavigate, onLogout }: HomeScreenProps) {
  // Get user's learning progress and stats
  const progress = StorageUtils.getProgress();
  const usageStats = StorageUtils.getUsageStats();
  const bookmarks = StorageUtils.getBookmarks();
  const quizHistory = StorageUtils.getQuizHistory();

  const mainSections = [
    {
      id: 'fundamental-rights',
      title: 'Fundamental Rights',
      description: 'Explore your constitutional rights as an Indian citizen',
      icon: Shield,
      color: 'saffron',
      stats: '6 Rights',
      isCompleted: progress.completedSections.includes('fundamental-rights')
    },
    {
      id: 'fundamental-duties',
      title: 'Fundamental Duties',
      description: 'Learn about your duties towards the nation',
      icon: Heart,
      color: 'constitution-green',
      stats: '11 Duties',
      isCompleted: progress.completedSections.includes('fundamental-duties')
    },
    {
      id: 'directive-principles',
      title: 'Directive Principles',
      description: 'Understanding state policy guidelines',
      icon: BookOpen,
      color: 'navy-blue',
      stats: '16 Principles',
      isCompleted: progress.completedSections.includes('directive-principles')
    }
  ];

  const quickActions = [
    {
      title: 'Take Quiz',
      description: 'Test your constitutional knowledge',
      icon: Brain,
      action: () => onNavigate('quiz')
    },
    {
      title: 'Join Discussion',
      description: 'Connect with the community',
      icon: Users,
      action: () => onNavigate('discussion')
    },
    {
      title: 'View Progress',
      description: 'Track your learning journey',
      icon: TrendingUp,
      action: () => onNavigate('profile')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentScreen="home" 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
        user={user} 
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy-blue mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Continue your journey to understand the Indian Constitution
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-lg font-bold text-green-600">
                    {progress.completedSections.length}/3
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Bookmark className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Bookmarks</p>
                  <p className="text-lg font-bold text-blue-600">
                    {bookmarks.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Quizzes Taken</p>
                  <p className="text-lg font-bold text-purple-600">
                    {Object.keys(quizHistory).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Learning Streak</p>
                  <p className="text-lg font-bold text-orange-600">
                    {usageStats.learningStreak} days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {mainSections.map((section, index) => {
            const Icon = section.icon;
            const isBookmarked = StorageUtils.isBookmarked(section.id);
            
            return (
              <Card 
                key={index}
                className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-0 shadow-md relative"
                onClick={() => {
                  // Track progress when section is accessed
                  StorageUtils.updateProgress(section.id, 5);
                  
                  if (user?.role === 'Admin') onNavigate('admin');
                  else if (user?.role === 'Educator') onNavigate('educator');
                  else if (user?.role === 'Citizen') onNavigate('citizen');
                  else if (user?.role === 'Legal Expert') onNavigate('legal');
                  else onNavigate('citizen');
                }}
              >
                {/* Completion Badge */}
                {section.isCompleted && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                )}
                
                {/* Bookmark Button */}
                <div className="absolute top-3 left-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isBookmarked) {
                        StorageUtils.removeBookmark(section.id);
                      } else {
                        StorageUtils.addBookmark(section.id, section.title);
                      }
                    }}
                    className="p-1 h-auto"
                  >
                    <Bookmark 
                      className={`w-4 h-4 ${isBookmarked ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} 
                    />
                  </Button>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 bg-${section.color}/20 rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 text-${section.color}`} />
                    </div>
                    <span className={`text-sm font-medium text-${section.color} bg-${section.color}/10 px-2 py-1 rounded`}>
                      {section.stats}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg mb-2">{section.title}</CardTitle>
                  <p className="text-gray-600 text-sm mb-4">{section.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-navy-blue font-medium">
                      <span className="text-sm">Explore</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                    {section.isCompleted && (
                      <span className="text-xs text-green-600 font-medium">Completed</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-navy-blue mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card key={index} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-navy-blue" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold mb-1">{action.title}</h3>
                        <p className="text-gray-600 text-sm">{action.description}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={action.action}
                        className="text-navy-blue hover:bg-navy-blue/10"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Role-specific Content */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-saffron" />
              <span>Your Learning Path - {user?.role}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user?.role === 'Admin' && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-navy-blue mb-2">Admin Dashboard</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Manage users, content, and system settings
                  </p>
                  <Button 
                    onClick={() => onNavigate('admin')}
                    className="bg-navy-blue hover:bg-navy-blue/90 text-white"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              )}
              
              {user?.role === 'Educator' && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-bold text-constitution-green mb-2">Educator Resources</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Create and manage educational content for students
                  </p>
                  <Button 
                    onClick={() => onNavigate('educator')}
                    className="bg-constitution-green hover:bg-constitution-green/90 text-white"
                  >
                    Manage Content
                  </Button>
                </div>
              )}
              
              {user?.role === 'Citizen' && (
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-bold text-saffron mb-2">Citizen Learning</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Explore your rights, duties, and participate in discussions
                  </p>
                  <Button 
                    onClick={() => onNavigate('citizen')}
                    className="bg-saffron hover:bg-saffron/90 text-white"
                  >
                    Start Learning
                  </Button>
                </div>
              )}
              
              {user?.role === 'Legal Expert' && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-bold text-purple-600 mb-2">Legal Expert Hub</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Answer questions and provide legal guidance
                  </p>
                  <Button 
                    onClick={() => onNavigate('legal')}
                    className="bg-purple-600 hover:bg-purple-600/90 text-white"
                  >
                    Expert Dashboard
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}