import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Navigation } from './Navigation';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  MessageCircle,
  Send,
  ThumbsUp,
  Reply,
  Clock,
  Pin,
  Filter,
  Search,
  Plus,
  Users
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import type { User, Screen } from '../types';

interface DiscussionBoardProps {
  user: User | null;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function DiscussionBoard({ user, onNavigate, onLogout }: DiscussionBoardProps) {
  const [newPost, setNewPost] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Discussions', count: 147 },
    { id: 'rights', name: 'Fundamental Rights', count: 45 },
    { id: 'duties', name: 'Fundamental Duties', count: 23 },
    { id: 'amendments', name: 'Constitutional Amendments', count: 31 },
    { id: 'judiciary', name: 'Judicial Review', count: 28 },
    { id: 'general', name: 'General Questions', count: 20 }
  ];

  const discussionPosts = [
    {
      id: 1,
      author: {
        name: 'Dr. Rajesh Kumar',
        role: 'Legal Expert',
        avatar: 'RK'
      },
      time: '2 hours ago',
      category: 'rights',
      isPinned: true,
      title: 'Understanding Article 21 - Right to Life and Personal Liberty',
      content: 'The Supreme Court has significantly expanded the scope of Article 21 over the years. It now includes right to privacy, right to clean environment, right to education, and many more. What are your thoughts on this judicial activism?',
      likes: 34,
      replies: 12,
      tags: ['Article 21', 'Right to Life', 'Judicial Activism']
    },
    {
      id: 2,
      author: {
        name: 'Priya Sharma',
        role: 'Citizen',
        avatar: 'PS'
      },
      time: '4 hours ago',
      category: 'duties',
      isPinned: false,
      title: 'How can we promote awareness about Fundamental Duties?',
      content: 'While everyone knows about fundamental rights, duties are often overlooked. As citizens, how can we create more awareness about our constitutional duties? I\'ve been thinking about organizing community workshops.',
      likes: 18,
      replies: 8,
      tags: ['Fundamental Duties', 'Community Awareness']
    },
    {
      id: 3,
      author: {
        name: 'Prof. Meera Singh',
        role: 'Educator',
        avatar: 'MS'
      },
      time: '6 hours ago',
      category: 'amendments',
      isPinned: false,
      title: 'The 73rd and 74th Constitutional Amendments',
      content: 'These amendments revolutionized local governance in India by introducing Panchayati Raj institutions and urban local bodies. Students often struggle with understanding their impact. Any teaching strategies that work well?',
      likes: 25,
      replies: 15,
      tags: ['Panchayati Raj', 'Local Governance', 'Teaching']
    },
    {
      id: 4,
      author: {
        name: 'Arjun Patel',
        role: 'Citizen',
        avatar: 'AP'
      },
      time: '8 hours ago',
      category: 'judiciary',
      isPinned: false,
      title: 'Basic Structure Doctrine - Need for clarification',
      content: 'I\'m confused about the basic structure doctrine. The Kesavananda Bharati case established it, but what exactly constitutes the "basic structure"? Can someone explain with examples?',
      likes: 12,
      replies: 6,
      tags: ['Basic Structure', 'Kesavananda Bharati', 'Constitutional Law']
    },
    {
      id: 5,
      author: {
        name: 'Sneha Reddy',
        role: 'Educator',
        avatar: 'SR'
      },
      time: '1 day ago',
      category: 'general',
      isPinned: false,
      title: 'Creating engaging content for Constitution Day',
      content: 'Constitution Day (November 26) is approaching. I\'m looking for creative ideas to make it more engaging for students. What activities have worked well in your experience?',
      likes: 22,
      replies: 11,
      tags: ['Constitution Day', 'Education', 'Student Engagement']
    }
  ];

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim()) {
      console.log('New post:', newPost);
      setNewPost('');
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Legal Expert':
        return 'bg-purple-100 text-purple-600';
      case 'Educator':
        return 'bg-constitution-green/20 text-constitution-green';
      case 'Admin':
        return 'bg-navy-blue/20 text-navy-blue';
      default:
        return 'bg-saffron/20 text-saffron';
    }
  };

  const filteredPosts = discussionPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentScreen="discussion" 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
        user={user} 
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-navy-blue mb-2">Discussion Board</h1>
            <p className="text-gray-600">Connect with the community and share constitutional insights</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button className="bg-navy-blue hover:bg-navy-blue/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Discussion
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="space-y-6">
            {/* Search */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search discussions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-navy-blue text-white'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{category.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Active Users */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Users className="w-5 h-5" />
                  <span>Active Now</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Dr. Kumar', 'Prof. Singh', 'Priya S.', 'Arjun P.'].map((name, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-constitution-green rounded-full"></div>
                      <span className="text-sm text-gray-600">{name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Discussion Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* New Post Form */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <form onSubmit={handlePostSubmit} className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Avatar>
                      <AvatarFallback>
                        {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Share your thoughts about the Constitution, ask questions, or start a discussion..."
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        rows={4}
                        className="resize-none"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Add Category
                      </Button>
                    </div>
                    <Button 
                      type="submit" 
                      disabled={!newPost.trim()}
                      className="bg-navy-blue hover:bg-navy-blue/90 text-white"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Post
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Discussion Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback>{post.author.avatar}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 space-y-3">
                        {/* Post Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="font-bold text-gray-900">{post.author.name}</span>
                            <Badge className={getRoleColor(post.author.role)}>
                              {post.author.role}
                            </Badge>
                            {post.isPinned && (
                              <Pin className="w-4 h-4 text-saffron" />
                            )}
                          </div>
                          <div className="flex items-center space-x-1 text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{post.time}</span>
                          </div>
                        </div>

                        {/* Post Content */}
                        <div className="space-y-2">
                          <h3 className="font-bold text-lg text-gray-900">{post.title}</h3>
                          <p className="text-gray-700">{post.content}</p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              #{tag.replace(' ', '')}
                            </Badge>
                          ))}
                        </div>

                        {/* Post Actions */}
                        <div className="flex items-center space-x-6 pt-3 border-t border-gray-100">
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-constitution-green">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            <span>{post.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-navy-blue">
                            <Reply className="w-4 h-4 mr-1" />
                            <span>{post.replies} replies</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            <span>Join discussion</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}