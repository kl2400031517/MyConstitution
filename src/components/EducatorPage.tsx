import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Navigation } from './Navigation';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  FileText,
  Video,
  Image,
  Download,
  Eye,
  Upload,
  Shield,
  Heart,
  ChevronDown,
  ChevronRight,
  Users,
  GraduationCap,
  Lightbulb,
  Target
} from 'lucide-react';
import { Badge } from './ui/badge';
import type { User, Screen } from '../types';

interface EducatorPageProps {
  user: User | null;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function EducatorPage({ user, onNavigate, onLogout }: EducatorPageProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'resources' | 'content' | 'students'>('resources');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    type: 'article'
  });

  // Mock educational resources
  const resources = [
    {
      id: 1,
      title: 'Understanding Fundamental Rights',
      type: 'Article',
      description: 'A comprehensive guide to the six fundamental rights',
      views: 1250,
      downloads: 89,
      createdDate: '2024-03-01'
    },
    {
      id: 2,
      title: 'Directive Principles Explained',
      type: 'Video',
      description: 'Visual explanation of state policy guidelines',
      views: 890,
      downloads: 45,
      createdDate: '2024-02-28'
    },
    {
      id: 3,
      title: 'Constitution Quiz - Part 1',
      type: 'Quiz',
      description: 'Interactive quiz on basic constitutional concepts',
      views: 2100,
      downloads: 156,
      createdDate: '2024-02-25'
    },
    {
      id: 4,
      title: 'Rights vs Duties Infographic',
      type: 'Image',
      description: 'Visual comparison of fundamental rights and duties',
      views: 567,
      downloads: 234,
      createdDate: '2024-02-20'
    }
  ];

  // Constitutional content for educators
  const constitutionalContent = [
    {
      id: 'rights',
      title: 'Teaching Fundamental Rights',
      icon: Shield,
      color: 'saffron',
      brief: 'Educational resources and teaching strategies for Fundamental Rights. Includes lesson plans, activities, and assessment tools.',
      items: [
        {
          name: 'Right to Equality (Articles 14-18)',
          description: 'Equality before law and equal protection of laws',
          details: 'Teaching strategies for explaining equality concepts to students of different age groups.',
          examples: [
            'Create role-play activities demonstrating equality in different scenarios',
            'Use case studies of landmark equality judgments',
            'Design worksheets comparing equality vs discrimination',
            'Organize debates on reservation policies and equality'
          ],
          articles: 'Articles 14-18',
          gradeLevel: 'Class 6-12',
          duration: '2-3 periods',
          resources: ['Case studies', 'Worksheets', 'Videos', 'Interactive activities']
        },
        {
          name: 'Right to Freedom (Articles 19-22)',
          description: 'Freedom of speech, expression, assembly, association',
          details: 'Interactive methods to teach freedom concepts while explaining reasonable restrictions.',
          examples: [
            'Conduct mock assemblies to demonstrate freedom of expression',
            'Create social media awareness campaigns about digital rights',
            'Organize peaceful protest simulations with proper guidelines',
            'Design projects on freedom of profession and occupation'
          ],
          articles: 'Articles 19-22',
          gradeLevel: 'Class 8-12',
          duration: '3-4 periods',
          resources: ['Simulation activities', 'Digital tools', 'Project templates', 'Assessment rubrics']
        }
      ]
    },
    {
      id: 'duties',
      title: 'Fundamental Duties Education',
      icon: Heart,
      color: 'constitution-green',
      brief: 'Resources for teaching citizen responsibilities and duties. Focus on practical application and community engagement.',
      items: [
        {
          name: 'Environmental Protection (Article 51A(g))',
          description: 'To protect and improve the natural environment',
          details: 'Hands-on environmental education with practical duty implementation.',
          examples: [
            'Organize tree plantation drives in school and community',
            'Create awareness campaigns about waste management',
            'Design eco-friendly projects and competitions',
            'Conduct environmental audits of school premises'
          ],
          articles: 'Article 51A(g)',
          gradeLevel: 'Class 1-12',
          duration: 'Ongoing projects',
          resources: ['Project guides', 'Environmental kits', 'Assessment tools', 'Community engagement plans']
        },
        {
          name: 'Preserve Culture (Article 51A(f))',
          description: 'To value and preserve the rich heritage of our composite culture',
          details: 'Cultural education programs to instill pride in Indian heritage.',
          examples: [
            'Organize cultural festivals showcasing regional diversity',
            'Create heritage walks and museum visits',
            'Design projects on traditional arts and crafts',
            'Conduct workshops on classical music and dance'
          ],
          articles: 'Article 51A(f)',
          gradeLevel: 'Class 3-12',
          duration: '1-2 weeks',
          resources: ['Cultural kits', 'Heritage guides', 'Art supplies', 'Performance materials']
        }
      ]
    },
    {
      id: 'principles',
      title: 'Directive Principles Teaching',
      icon: BookOpen,
      color: 'navy-blue',
      brief: 'Educational content about government policies and state responsibilities. Connect theory with real-world implementations.',
      items: [
        {
          name: 'Education (Article 45)',
          description: 'The State shall endeavour to provide free and compulsory education',
          details: 'Teaching about education policies and their implementation in India.',
          examples: [
            'Analyze Right to Education Act implementation in local schools',
            'Create awareness about government education schemes',
            'Design projects on educational infrastructure development',
            'Organize visits to government and private schools for comparison'
          ],
          articles: 'Article 45',
          gradeLevel: 'Class 9-12',
          duration: '2-3 weeks',
          resources: ['Policy documents', 'Case studies', 'Field visit guides', 'Analysis templates']
        }
      ]
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding new resource:', formData);
    setShowAddForm(false);
    setFormData({ title: '', description: '', content: '', type: 'article' });
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'video': return Video;
      case 'image': return Image;
      case 'quiz': return BookOpen;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'video': return 'bg-red-100 text-red-600';
      case 'image': return 'bg-blue-100 text-blue-600';
      case 'quiz': return 'bg-green-100 text-constitution-green';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentScreen="educator" 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
        user={user} 
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-navy-blue mb-2">Educator Dashboard</h1>
            <p className="text-gray-600">Create and manage educational resources for constitutional learning</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-constitution-green hover:bg-constitution-green/90 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Content
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          <Button
            variant={activeTab === 'resources' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('resources')}
            className={activeTab === 'resources' ? 'bg-constitution-green text-white' : 'text-gray-600'}
          >
            <FileText className="w-4 h-4 mr-2" />
            My Resources
          </Button>
          <Button
            variant={activeTab === 'content' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('content')}
            className={activeTab === 'content' ? 'bg-constitution-green text-white' : 'text-gray-600'}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Teaching Content
          </Button>
          <Button
            variant={activeTab === 'students' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('students')}
            className={activeTab === 'students' ? 'bg-constitution-green text-white' : 'text-gray-600'}
          >
            <Users className="w-4 h-4 mr-2" />
            Student Progress
          </Button>
        </div>

        {/* Add Content Form */}
        {showAddForm && (
          <Card className="mb-8 border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-constitution-green">Add New Educational Content</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter content title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Content Type</Label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-constitution-green"
                    >
                      <option value="article">Article</option>
                      <option value="video">Video</option>
                      <option value="quiz">Quiz</option>
                      <option value="image">Image/Infographic</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of the content"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Enter the main content or upload files"
                    rows={6}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Button type="button" variant="outline" className="flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>Upload Files</span>
                  </Button>
                  <div className="space-x-2">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setShowAddForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      className="bg-constitution-green hover:bg-constitution-green/90 text-white"
                    >
                      Add Content
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Tab Content */}
        {activeTab === 'resources' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-navy-blue">Your Educational Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => {
              const TypeIcon = getTypeIcon(resource.type);
              return (
                <Card key={resource.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(resource.type)}`}>
                          <TypeIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                          <Badge variant="outline" className="text-xs mt-1">
                            {resource.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {resource.description}
                    </p>
                    
                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{resource.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="w-4 h-4" />
                          <span>{resource.downloads}</span>
                        </div>
                      </div>
                      <span>{resource.createdDate}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm" className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>Preview</span>
                      </Button>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm" className="text-navy-blue hover:text-navy-blue hover:bg-navy-blue/10">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            </div>
          </div>
        )}

        {/* Teaching Content Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="w-5 h-5 text-constitution-green" />
                  <span>Constitutional Teaching Resources</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Comprehensive teaching materials and strategies for constitutional education. Includes lesson plans, activities, and assessment tools.
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
                                      <h4 className="font-semibold text-constitution-green mb-1">{item.name}</h4>
                                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                                      <p className="text-sm text-gray-700 mb-3">{item.details}</p>
                                    </div>
                                    <div className="flex items-center space-x-2 ml-4">
                                      <Badge variant="outline" className="text-xs">
                                        {item.articles}
                                      </Badge>
                                      <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800">
                                        {item.gradeLevel}
                                      </Badge>
                                    </div>
                                  </div>
                                  
                                  <div className="mb-3">
                                    <h5 className="font-medium text-sm mb-2">Teaching Examples:</h5>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                      {item.examples.map((example, idx) => (
                                        <li key={idx} className="flex items-start space-x-2">
                                          <span className="text-constitution-green mt-1">•</span>
                                          <span>{example}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  <div className="mb-3">
                                    <h5 className="font-medium text-sm mb-2">Available Resources:</h5>
                                    <div className="flex flex-wrap gap-2">
                                      {item.resources.map((resource, idx) => (
                                        <Badge key={idx} variant="secondary" className="text-xs">
                                          {resource}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                    <span>Duration: {item.duration}</span>
                                    <span>Grade Level: {item.gradeLevel}</span>
                                  </div>
                                  
                                  <div className="flex space-x-2">
                                    <Button size="sm" className="bg-constitution-green hover:bg-constitution-green/90 text-white text-xs">
                                      <Lightbulb className="w-3 h-3 mr-1" />
                                      Use Lesson Plan
                                    </Button>
                                    <Button size="sm" variant="outline" className="text-xs">
                                      <Download className="w-3 h-3 mr-1" />
                                      Download Resources
                                    </Button>
                                    <Button size="sm" variant="outline" className="text-xs">
                                      <Target className="w-3 h-3 mr-1" />
                                      View Assessment
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

        {/* Student Progress Tab */}
        {activeTab === 'students' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-constitution-green" />
                  <span>Student Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Fundamental Rights Quiz</span>
                    <span className="text-constitution-green font-bold">85% avg</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Duties Assignment</span>
                    <span className="text-constitution-green font-bold">92% avg</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Constitution Project</span>
                    <span className="text-constitution-green font-bold">78% avg</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="w-5 h-5 text-constitution-green" />
                  <span>Class Engagement</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Active Students</span>
                    <span className="text-blue-600 font-bold">24/30</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Completed Assignments</span>
                    <span className="text-blue-600 font-bold">28/30</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Discussion Participation</span>
                    <span className="text-blue-600 font-bold">22/30</span>
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