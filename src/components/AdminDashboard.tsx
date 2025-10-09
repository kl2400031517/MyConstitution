import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Navigation } from './Navigation';
import { 
  Users, 
  Edit, 
  Trash2, 
  Plus, 
  Search,
  Filter,
  UserCheck,
  UserX,
  Crown,
  Shield,
  Heart,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Scale,
  Gavel,
  FileText,
  TrendingUp
} from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import type { User, Screen, UserRole } from '../types';

interface AdminDashboardProps {
  user: User | null;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function AdminDashboard({ user, onNavigate, onLogout }: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'content' | 'analytics'>('users');
  
  // Mock user data for demonstration
  const mockUsers = [
    { id: 1, name: 'Priya Sharma', email: 'priya@example.com', role: 'Citizen' as UserRole, status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Dr. Rajesh Kumar', email: 'rajesh@example.com', role: 'Legal Expert' as UserRole, status: 'Active', joinDate: '2024-02-10' },
    { id: 3, name: 'Prof. Meera Singh', email: 'meera@example.com', role: 'Educator' as UserRole, status: 'Active', joinDate: '2024-03-05' },
    { id: 4, name: 'Arjun Patel', email: 'arjun@example.com', role: 'Citizen' as UserRole, status: 'Inactive', joinDate: '2024-01-20' },
    { id: 5, name: 'Sneha Reddy', email: 'sneha@example.com', role: 'Educator' as UserRole, status: 'Active', joinDate: '2024-02-28' },
  ];

  // Constitutional content for admin management
  const constitutionalContent = [
    {
      id: 'rights',
      title: 'Fundamental Rights Management',
      icon: Shield,
      color: 'saffron',
      brief: 'Manage and monitor content related to Fundamental Rights. Ensure accurate information and proper categorization.',
      items: [
        {
          name: 'Right to Equality (Articles 14-18)',
          description: 'Equality before law and equal protection of laws',
          details: 'Admin can manage content, update examples, and monitor user engagement with equality-related materials.',
          examples: [
            'Review and approve user-generated content about equality',
            'Update case studies and legal precedents',
            'Monitor discussions for misinformation',
            'Manage educational resources and materials'
          ],
          articles: 'Articles 14-18',
          status: 'Active',
          lastUpdated: '2024-01-15',
          views: 1250
        },
        {
          name: 'Right to Freedom (Articles 19-22)',
          description: 'Freedom of speech, expression, assembly, association',
          details: 'Content management for freedom-related rights with special attention to current legal developments.',
          examples: [
            'Curate content about freedom of expression',
            'Update guidelines for digital rights',
            'Manage resources about peaceful assembly',
            'Review content about professional freedoms'
          ],
          articles: 'Articles 19-22',
          status: 'Active',
          lastUpdated: '2024-01-20',
          views: 980
        }
      ]
    },
    {
      id: 'duties',
      title: 'Fundamental Duties Administration',
      icon: Heart,
      color: 'constitution-green',
      brief: 'Oversee content related to Fundamental Duties and citizen responsibilities.',
      items: [
        {
          name: 'Environmental Protection (Article 51A(g))',
          description: 'To protect and improve the natural environment',
          details: 'Manage environmental awareness content and citizen responsibility materials.',
          examples: [
            'Create awareness campaigns about environmental protection',
            'Manage resources about sustainable practices',
            'Monitor environmental duty compliance content',
            'Update guidelines for citizen environmental responsibilities'
          ],
          articles: 'Article 51A(g)',
          status: 'Active',
          lastUpdated: '2024-01-18',
          views: 750
        }
      ]
    },
    {
      id: 'principles',
      title: 'Directive Principles Oversight',
      icon: BookOpen,
      color: 'navy-blue',
      brief: 'Monitor and manage content related to Directive Principles of State Policy.',
      items: [
        {
          name: 'Education (Article 45)',
          description: 'The State shall endeavour to provide free and compulsory education',
          details: 'Manage educational content and monitor government policy implementations.',
          examples: [
            'Track government education initiatives',
            'Manage content about Right to Education Act',
            'Monitor educational infrastructure developments',
            'Update resources about educational policies'
          ],
          articles: 'Article 45',
          status: 'Active',
          lastUpdated: '2024-01-22',
          views: 1100
        }
      ]
    }
  ];

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Total Users', value: mockUsers.length, icon: Users, color: 'navy-blue' },
    { label: 'Active Users', value: mockUsers.filter(u => u.status === 'Active').length, icon: UserCheck, color: 'constitution-green' },
    { label: 'Educators', value: mockUsers.filter(u => u.role === 'Educator').length, icon: Crown, color: 'saffron' },
    { label: 'Legal Experts', value: mockUsers.filter(u => u.role === 'Legal Expert').length, icon: Crown, color: 'purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentScreen="admin" 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
        user={user} 
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-navy-blue mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage users, content, and constitutional resources</p>
          </div>
          <Button className="bg-navy-blue hover:bg-navy-blue/90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          <Button
            variant={activeTab === 'users' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('users')}
            className={activeTab === 'users' ? 'bg-navy-blue text-white' : 'text-gray-600'}
          >
            <Users className="w-4 h-4 mr-2" />
            User Management
          </Button>
          <Button
            variant={activeTab === 'content' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('content')}
            className={activeTab === 'content' ? 'bg-navy-blue text-white' : 'text-gray-600'}
          >
            <FileText className="w-4 h-4 mr-2" />
            Content Management
          </Button>
          <Button
            variant={activeTab === 'analytics' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('analytics')}
            className={activeTab === 'analytics' ? 'bg-navy-blue text-white' : 'text-gray-600'}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Analytics
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                      <p className="text-2xl font-bold text-navy-blue mt-1">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 bg-${stat.color}/20 rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 text-${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'users' && (
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-navy-blue" />
                  <span>User Management</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-gray-600">{user.email}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={`
                          ${user.role === 'Admin' ? 'border-navy-blue text-navy-blue' : ''}
                          ${user.role === 'Educator' ? 'border-constitution-green text-constitution-green' : ''}
                          ${user.role === 'Citizen' ? 'border-saffron text-saffron' : ''}
                          ${user.role === 'Legal Expert' ? 'border-purple-600 text-purple-600' : ''}
                        `}
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.status === 'Active' ? 'default' : 'secondary'}
                        className={user.status === 'Active' ? 'bg-constitution-green hover:bg-constitution-green/90' : ''}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">{user.joinDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm" className="text-navy-blue hover:text-navy-blue hover:bg-navy-blue/10">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        )}

        {/* Content Management Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-navy-blue" />
                  <span>Constitutional Content Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Manage and monitor constitutional content across all sections. Ensure accuracy, update examples, and track user engagement.
                </p>
                
                <div className="space-y-6">
                  {constitutionalContent.map((section) => {
                    const Icon = section.icon;
                    const isExpanded = expandedSection === section.id;
                    
                    return (
                      <div key={section.id} className="border border-gray-200 rounded-lg">
                        <div 
                          className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 bg-${section.color}/20 rounded-lg flex items-center justify-center`}>
                                <Icon className={`w-5 h-5 text-${section.color}`} />
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">{section.title}</h3>
                                <p className="text-sm text-gray-600">{section.brief}</p>
                              </div>
                            </div>
                            {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                          </div>
                        </div>
                        
                        {isExpanded && (
                          <div className="border-t border-gray-200 p-4 bg-gray-50">
                            <div className="space-y-4">
                              {section.items.map((item, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg border">
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                      <h4 className="font-semibold text-navy-blue mb-1">{item.name}</h4>
                                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                                      <p className="text-sm text-gray-700 mb-3">{item.details}</p>
                                    </div>
                                    <div className="flex items-center space-x-2 ml-4">
                                      <Badge variant="outline" className="text-xs">
                                        {item.articles}
                                      </Badge>
                                      <Badge 
                                        variant={item.status === 'Active' ? 'default' : 'secondary'}
                                        className={item.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                                      >
                                        {item.status}
                                      </Badge>
                                    </div>
                                  </div>
                                  
                                  <div className="mb-3">
                                    <h5 className="font-medium text-sm mb-2">Admin Management Examples:</h5>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                      {item.examples.map((example, idx) => (
                                        <li key={idx} className="flex items-start space-x-2">
                                          <span className="text-navy-blue mt-1">•</span>
                                          <span>{example}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>Last updated: {item.lastUpdated}</span>
                                    <span>{item.views} views</span>
                                  </div>
                                  
                                  <div className="flex space-x-2 mt-3">
                                    <Button size="sm" variant="outline" className="text-xs">
                                      <Edit className="w-3 h-3 mr-1" />
                                      Edit Content
                                    </Button>
                                    <Button size="sm" variant="outline" className="text-xs">
                                      <TrendingUp className="w-3 h-3 mr-1" />
                                      View Analytics
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-navy-blue" />
                  <span>Content Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Fundamental Rights</span>
                    <span className="text-navy-blue font-bold">2,450 views</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Fundamental Duties</span>
                    <span className="text-navy-blue font-bold">1,890 views</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Directive Principles</span>
                    <span className="text-navy-blue font-bold">1,650 views</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-navy-blue" />
                  <span>User Engagement</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Active Users (24h)</span>
                    <span className="text-green-600 font-bold">156</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Quiz Completions</span>
                    <span className="text-green-600 font-bold">89</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Discussion Posts</span>
                    <span className="text-green-600 font-bold">23</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}