import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Navigation } from './Navigation';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  User,
  Mail,
  Calendar,
  Trophy,
  BookOpen,
  MessageCircle,
  Settings,
  LogOut,
  Edit,
  Save,
  X,
  Award,
  Target,
  TrendingUp,
  Clock,
  Bookmark,
  FileText
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import type { User as UserType, Screen } from '../types';
import { StorageUtils } from '../utils/storage';
import { PersonalNotes } from './PersonalNotes';

interface ProfileScreenProps {
  user: UserType | null;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function ProfileScreen({ user, onNavigate, onLogout }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  // Get real data from localStorage
  const progress = StorageUtils.getProgress();
  const usageStats = StorageUtils.getUsageStats();
  const bookmarks = StorageUtils.getBookmarks();
  const quizHistory = StorageUtils.getQuizHistory();

  // Calculate statistics from real data
  const userStats = {
    joinDate: StorageUtils.get('lastLogin') || new Date().toISOString(),
    quizzesTaken: Object.keys(quizHistory).length,
    averageScore: Object.keys(quizHistory).length > 0 
      ? Math.round(Object.values(quizHistory).reduce((sum: number, result: any) => sum + result.bestScore, 0) / Object.keys(quizHistory).length)
      : 0,
    discussionPosts: 0, // Could be implemented later
    questionsAnswered: 0, // Could be implemented later
    learningStreak: usageStats.learningStreak || 0,
    totalPoints: progress.totalTimeSpent || 0,
    level: 'Constitutional Scholar'
  };

  const achievements = [
    {
      id: 1,
      title: 'First Quiz Completed',
      description: 'Completed your first constitutional quiz',
      icon: Trophy,
      earned: true,
      date: '2024-02-01'
    },
    {
      id: 2,
      title: 'Discussion Starter',
      description: 'Started your first discussion thread',
      icon: MessageCircle,
      earned: true,
      date: '2024-02-05'
    },
    {
      id: 3,
      title: 'Knowledge Seeker',
      description: 'Read all fundamental rights articles',
      icon: BookOpen,
      earned: true,
      date: '2024-02-10'
    },
    {
      id: 4,
      title: 'Quiz Master',
      description: 'Score 90%+ on 5 consecutive quizzes',
      icon: Award,
      earned: false,
      date: null
    },
    {
      id: 5,
      title: 'Community Helper',
      description: 'Help 50 community members',
      icon: Target,
      earned: false,
      date: null
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'quiz',
      description: 'Completed "Fundamental Rights Quiz" with 92% score',
      time: '2 hours ago',
      points: 50
    },
    {
      id: 2,
      type: 'discussion',
      description: 'Replied to "Understanding Article 21"',
      time: '1 day ago',
      points: 10
    },
    {
      id: 3,
      type: 'achievement',
      description: 'Earned "Knowledge Seeker" badge',
      time: '2 days ago',
      points: 100
    },
    {
      id: 4,
      type: 'quiz',
      description: 'Completed "Constitutional Amendments Quiz" with 78% score',
      time: '3 days ago',
      points: 35
    }
  ];

  const handleSaveProfile = () => {
    console.log('Saving profile:', editForm);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditForm({
      name: user?.name || '',
      email: user?.email || ''
    });
    setIsEditing(false);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Legal Expert':
        return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'Educator':
        return 'bg-constitution-green/20 text-constitution-green border-constitution-green/30';
      case 'Admin':
        return 'bg-navy-blue/20 text-navy-blue border-navy-blue/30';
      default:
        return 'bg-saffron/20 text-saffron border-saffron/30';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'quiz': return Trophy;
      case 'discussion': return MessageCircle;
      case 'achievement': return Award;
      default: return BookOpen;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentScreen="profile" 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
        user={user} 
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy-blue mb-2">Profile</h1>
          <p className="text-gray-600">Manage your account and track your learning progress</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Profile Information</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarFallback className="text-xl">
                      {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Badge className={`${getRoleColor(user?.role || '')}`}>
                      {user?.role}
                    </Badge>
                    <div className="text-sm text-gray-600">
                      Level: {userStats.level}
                    </div>
                  </div>
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={editForm.name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleSaveProfile} className="flex-1 bg-navy-blue hover:bg-navy-blue/90 text-white">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" onClick={handleCancelEdit} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <User className="w-5 h-5 text-gray-500" />
                      <span>{user?.name}</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <span>Joined {userStats.joinDate}</span>
                    </div>
                  </div>
                )}

                <Button 
                  variant="destructive" 
                  onClick={onLogout}
                  className="w-full"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>

            {/* Learning Stats */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-constitution-green" />
                  <span>Learning Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-navy-blue">{userStats.quizzesTaken}</div>
                    <div className="text-sm text-gray-600">Quizzes Taken</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-constitution-green">{userStats.averageScore}%</div>
                    <div className="text-sm text-gray-600">Avg Score</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Learning Progress</span>
                    <span className="text-sm font-bold text-navy-blue">Level {userStats.level}</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="text-xs text-gray-500 text-center">
                    {userStats.totalPoints} points • {userStats.learningStreak} day streak
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
            {/* Achievements */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-saffron" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                      <div 
                        key={achievement.id} 
                        className={`p-4 rounded-lg border-2 transition-all ${
                          achievement.earned 
                            ? 'border-constitution-green bg-constitution-green/5' 
                            : 'border-gray-200 bg-gray-50 opacity-60'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            achievement.earned ? 'bg-constitution-green/20' : 'bg-gray-200'
                          }`}>
                            <Icon className={`w-5 h-5 ${
                              achievement.earned ? 'text-constitution-green' : 'text-gray-400'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-sm mb-1">{achievement.title}</h4>
                            <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                            {achievement.earned && achievement.date && (
                              <div className="text-xs text-constitution-green">
                                Earned on {achievement.date}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-navy-blue" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => {
                    const Icon = getActivityIcon(activity.type);
                    return (
                      <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                          <Icon className="w-4 h-4 text-navy-blue" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 mb-1">{activity.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{activity.time}</span>
                            <Badge variant="outline" className="text-xs bg-saffron/10 text-saffron border-saffron/30">
                              +{activity.points} points
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
              </TabsContent>

              <TabsContent value="progress" className="space-y-6">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-navy-blue" />
                      <span>Learning Progress</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{progress.completedSections.length}</div>
                          <div className="text-sm text-gray-600">Sections Completed</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{userStats.quizzesTaken}</div>
                          <div className="text-sm text-gray-600">Quizzes Taken</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">{userStats.averageScore}%</div>
                          <div className="text-sm text-gray-600">Average Score</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">{userStats.learningStreak}</div>
                          <div className="text-sm text-gray-600">Day Streak</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-medium">Completed Sections</h4>
                        {progress.completedSections.length === 0 ? (
                          <p className="text-gray-500 text-center py-4">No sections completed yet. Start learning!</p>
                        ) : (
                          <div className="space-y-2">
                            {progress.completedSections.map((section) => (
                              <div key={section} className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span className="text-sm capitalize">{section.replace('-', ' ')}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bookmarks" className="space-y-6">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bookmark className="w-5 h-5 text-blue-600" />
                      <span>Bookmarked Sections</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {bookmarks.length === 0 ? (
                      <div className="text-center py-8">
                        <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No bookmarks yet. Start bookmarking important sections!</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {bookmarks.map((bookmark) => (
                          <div key={bookmark.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">{bookmark.title}</p>
                              <p className="text-sm text-gray-500">{bookmark.id}</p>
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(bookmark.addedAt).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="space-y-6">
                <PersonalNotes />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}