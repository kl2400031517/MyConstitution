import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Navigation } from './Navigation';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronRight, 
  Send,
  Clock,
  User,
  MessageCircle,
  Badge as BadgeIcon,
  Shield,
  Heart,
  BookOpen,
  Gavel,
  Scale,
  FileText,
  TrendingUp,
  Award,
  Target
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import type { User, Screen } from '../types';

interface LegalExpertPageProps {
  user: User | null;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function LegalExpertPage({ user, onNavigate, onLogout }: LegalExpertPageProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'faq' | 'content' | 'analytics'>('faq');
  const [questionForm, setQuestionForm] = useState({
    title: '',
    description: '',
    category: ''
  });

  const faqCategories = [
    {
      title: 'Fundamental Rights',
      questions: [
        {
          id: 1,
          question: 'Can fundamental rights be suspended during emergency?',
          answer: 'Yes, during a national emergency declared under Article 352, the right to move courts for enforcement of fundamental rights can be suspended. However, Articles 20 and 21 (right to life and personal liberty) cannot be suspended even during emergency.',
          author: 'Dr. Rajesh Kumar',
          date: '2024-03-15',
          upvotes: 23
        },
        {
          id: 2,
          question: 'What is the scope of Right to Privacy?',
          answer: 'The Right to Privacy, recognized as a fundamental right by the Supreme Court in 2017 (Justice K.S. Puttaswamy vs Union of India), includes informational privacy, bodily privacy, and privacy of choice. It protects individuals against state surveillance and data misuse.',
          author: 'Prof. Meera Singh',
          date: '2024-03-12',
          upvotes: 34
        }
      ]
    },
    {
      title: 'Constitutional Amendments',
      questions: [
        {
          id: 3,
          question: 'What is the basic structure doctrine?',
          answer: 'The basic structure doctrine, established in Kesavananda Bharati case (1973), states that Parliament cannot amend the Constitution in a way that alters its basic structure. This includes democracy, rule of law, judicial review, and federal structure.',
          author: 'Dr. Anjali Verma',
          date: '2024-03-10',
          upvotes: 45
        }
      ]
    },
    {
      title: 'Directive Principles',
      questions: [
        {
          id: 4,
          question: 'Are Directive Principles enforceable in courts?',
          answer: 'No, Directive Principles are not enforceable in courts as per Article 37. However, they are fundamental in governance and the state should apply these principles in making laws. They can be used to interpret ambiguous laws.',
          author: 'Justice (Retd.) Sharma',
          date: '2024-03-08',
          upvotes: 28
        }
      ]
    }
  ];

  const recentQuestions = [
    {
      id: 1,
      title: 'Difference between Writ of Habeas Corpus and Mandamus',
      author: 'Student123',
      time: '2 hours ago',
      status: 'pending',
      category: 'Fundamental Rights'
    },
    {
      id: 2,
      title: 'Constitutional validity of Triple Talaq Bill',
      author: 'LawStudent',
      time: '5 hours ago',
      status: 'answered',
      category: 'Personal Law'
    },
    {
      id: 3,
      title: 'Article 370 abrogation - legal implications',
      author: 'Researcher',
      time: '1 day ago',
      status: 'pending',
      category: 'Constitutional Amendments'
    }
  ];

  // Constitutional content for legal experts
  const constitutionalContent = [
    {
      id: 'rights',
      title: 'Fundamental Rights Analysis',
      icon: Shield,
      color: 'saffron',
      brief: 'In-depth legal analysis of Fundamental Rights with case laws, precedents, and current legal developments.',
      items: [
        {
          name: 'Right to Equality (Articles 14-18)',
          description: 'Equality before law and equal protection of laws',
          details: 'Comprehensive legal analysis of equality provisions with landmark judgments and current interpretations.',
          examples: [
            'State of West Bengal v. Anwar Ali Sarkar (1952) - Reasonable classification test',
            'E.P. Royappa v. State of Tamil Nadu (1974) - Arbitrariness test',
            'Maneka Gandhi v. Union of India (1978) - Due process of law',
            'Navtej Singh Johar v. Union of India (2018) - Decriminalization of homosexuality'
          ],
          articles: 'Articles 14-18',
          caseLaws: ['State of West Bengal v. Anwar Ali Sarkar', 'E.P. Royappa v. State of Tamil Nadu', 'Maneka Gandhi v. Union of India'],
          recentDevelopments: 'Recent SC judgments on reservation policies and affirmative action',
          expertNotes: 'Article 14 is the cornerstone of equality jurisprudence in India, evolving from formal equality to substantive equality.'
        },
        {
          name: 'Right to Freedom (Articles 19-22)',
          description: 'Freedom of speech, expression, assembly, association',
          details: 'Analysis of freedom provisions with emphasis on reasonable restrictions and their judicial interpretation.',
          examples: [
            'Romesh Thappar v. State of Madras (1950) - Freedom of speech and expression',
            'Kameshwar Prasad v. State of Bihar (1962) - Right to strike',
            'Bennett Coleman v. Union of India (1972) - Freedom of press',
            'Shreya Singhal v. Union of India (2015) - Section 66A struck down'
          ],
          articles: 'Articles 19-22',
          caseLaws: ['Romesh Thappar v. State of Madras', 'Bennett Coleman v. Union of India', 'Shreya Singhal v. Union of India'],
          recentDevelopments: 'Digital rights and social media regulation cases',
          expertNotes: 'Article 19(1)(a) has been interpreted broadly to include right to information, right to silence, and right to criticize government.'
        }
      ]
    },
    {
      id: 'duties',
      title: 'Fundamental Duties Jurisprudence',
      icon: Heart,
      color: 'constitution-green',
      brief: 'Legal analysis of Fundamental Duties and their enforceability in courts of law.',
      items: [
        {
          name: 'Environmental Protection (Article 51A(g))',
          description: 'To protect and improve the natural environment',
          details: 'Legal framework for environmental protection duties and their judicial enforcement.',
          examples: [
            'M.C. Mehta v. Union of India (1987) - Environmental protection as fundamental duty',
            'Vellore Citizens Welfare Forum v. Union of India (1996) - Precautionary principle',
            'T.N. Godavarman Thirumulpad v. Union of India (1997) - Forest conservation',
            'Arjun Gopal v. Union of India (2017) - Air pollution and firecrackers'
          ],
          articles: 'Article 51A(g)',
          caseLaws: ['M.C. Mehta v. Union of India', 'Vellore Citizens Welfare Forum v. Union of India', 'T.N. Godavarman Thirumulpad v. Union of India'],
          recentDevelopments: 'Climate change litigation and environmental rights',
          expertNotes: 'While Fundamental Duties are not directly enforceable, courts have used them to interpret environmental laws and policies.'
        }
      ]
    },
    {
      id: 'principles',
      title: 'Directive Principles Implementation',
      icon: BookOpen,
      color: 'navy-blue',
      brief: 'Analysis of Directive Principles and their role in policy-making and judicial interpretation.',
      items: [
        {
          name: 'Education (Article 45)',
          description: 'The State shall endeavour to provide free and compulsory education',
          details: 'Legal framework for education rights and implementation of Right to Education Act.',
          examples: [
            'Unni Krishnan v. State of Andhra Pradesh (1993) - Education as fundamental right',
            'Mohini Jain v. State of Karnataka (1992) - Right to education',
            'Society for Unaided Private Schools v. Union of India (2012) - RTE Act validity',
            'Pramati Educational Trust v. Union of India (2014) - Minority institutions and RTE'
          ],
          articles: 'Article 45',
          caseLaws: ['Unni Krishnan v. State of Andhra Pradesh', 'Mohini Jain v. State of Karnataka', 'Society for Unaided Private Schools v. Union of India'],
          recentDevelopments: 'Digital education and online learning regulations',
          expertNotes: 'Article 45 led to the 86th Constitutional Amendment making education a fundamental right under Article 21A.'
        }
      ]
    }
  ];

  const handleFaqToggle = (questionId: number) => {
    setExpandedFaq(expandedFaq === questionId ? null : questionId);
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New question:', questionForm);
    setQuestionForm({ title: '', description: '', category: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentScreen="legal" 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
        user={user} 
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy-blue mb-2">Legal Expert Hub</h1>
          <p className="text-gray-600">Constitutional law guidance, expert analysis, and legal resources</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          <Button
            variant={activeTab === 'faq' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('faq')}
            className={activeTab === 'faq' ? 'bg-purple-600 text-white' : 'text-gray-600'}
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQ & Q&A
          </Button>
          <Button
            variant={activeTab === 'content' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('content')}
            className={activeTab === 'content' ? 'bg-purple-600 text-white' : 'text-gray-600'}
          >
            <Gavel className="w-4 h-4 mr-2" />
            Legal Analysis
          </Button>
          <Button
            variant={activeTab === 'analytics' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('analytics')}
            className={activeTab === 'analytics' ? 'bg-purple-600 text-white' : 'text-gray-600'}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Analytics
          </Button>
        </div>

        {/* Tab Content */}
        {activeTab === 'faq' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* FAQ Section */}
            <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-navy-blue">Frequently Asked Questions</h2>
              <Badge className="bg-purple-100 text-purple-600">
                <BadgeIcon className="w-3 h-3 mr-1" />
                Expert Verified
              </Badge>
            </div>

            {faqCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="border-0 shadow-md">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="text-lg text-navy-blue">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {category.questions.map((faq) => (
                    <div key={faq.id} className="border-b border-gray-100 last:border-b-0">
                      <div 
                        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleFaqToggle(faq.id)}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900 pr-4">{faq.question}</h3>
                          {expandedFaq === faq.id ? (
                            <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                      
                      {expandedFaq === faq.id && (
                        <div className="px-4 pb-4">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-gray-700 mb-4">{faq.answer}</p>
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                  <User className="w-4 h-4" />
                                  <span>{faq.author}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{faq.date}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-1 text-green-600">
                                <span>{faq.upvotes}</span>
                                <span>upvotes</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ask a Question Form */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-purple-600" />
                  <span>Ask a Question</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleQuestionSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="question-title">Question Title</Label>
                    <Input
                      id="question-title"
                      value={questionForm.title}
                      onChange={(e) => setQuestionForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Brief title for your question"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      value={questionForm.category}
                      onChange={(e) => setQuestionForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    >
                      <option value="">Select category</option>
                      <option value="fundamental-rights">Fundamental Rights</option>
                      <option value="directive-principles">Directive Principles</option>
                      <option value="constitutional-amendments">Constitutional Amendments</option>
                      <option value="judicial-review">Judicial Review</option>
                      <option value="emergency-provisions">Emergency Provisions</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Detailed Description</Label>
                    <Textarea
                      id="description"
                      value={questionForm.description}
                      onChange={(e) => setQuestionForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Provide context and details for your question..."
                      rows={4}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-600/90 text-white">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Question
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Recent Questions */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-navy-blue" />
                  <span>Recent Questions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentQuestions.map((question) => (
                  <div key={question.id} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                    <h4 className="font-medium text-sm mb-2 line-clamp-2">{question.title}</h4>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-5 h-5">
                          <AvatarFallback className="text-xs">
                            {question.author.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{question.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={question.status === 'answered' ? 'default' : 'secondary'}
                          className={`text-xs ${question.status === 'answered' ? 'bg-green-100 text-green-600' : ''}`}
                        >
                          {question.status}
                        </Badge>
                        <span>{question.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-4 text-sm">
                  View All Questions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        )}

        {/* Legal Analysis Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gavel className="w-5 h-5 text-purple-600" />
                  <span>Constitutional Law Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Comprehensive legal analysis of constitutional provisions with case laws, precedents, and expert commentary.
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
                                      <h4 className="font-semibold text-purple-600 mb-1">{item.name}</h4>
                                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                                      <p className="text-sm text-gray-700 mb-3">{item.details}</p>
                                    </div>
                                    <div className="flex items-center space-x-2 ml-4">
                                      <Badge variant="outline" className="text-xs">
                                        {item.articles}
                                      </Badge>
                                    </div>
                                  </div>
                                  
                                  <div className="mb-3">
                                    <h5 className="font-medium text-sm mb-2">Landmark Cases:</h5>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                      {item.examples.map((example, idx) => (
                                        <li key={idx} className="flex items-start space-x-2">
                                          <span className="text-purple-600 mt-1">•</span>
                                          <span>{example}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  <div className="mb-3">
                                    <h5 className="font-medium text-sm mb-2">Key Case Laws:</h5>
                                    <div className="flex flex-wrap gap-2">
                                      {item.caseLaws.map((caseLaw, idx) => (
                                        <Badge key={idx} variant="secondary" className="text-xs">
                                          {caseLaw}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div className="mb-3 p-3 bg-blue-50 rounded">
                                    <h5 className="font-medium text-sm mb-1 text-blue-800">Recent Developments:</h5>
                                    <p className="text-sm text-blue-700">{item.recentDevelopments}</p>
                                  </div>
                                  
                                  <div className="mb-3 p-3 bg-yellow-50 rounded">
                                    <h5 className="font-medium text-sm mb-1 text-yellow-800">Expert Notes:</h5>
                                    <p className="text-sm text-yellow-700">{item.expertNotes}</p>
                                  </div>
                                  
                                  <div className="flex space-x-2">
                                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white text-xs">
                                      <FileText className="w-3 h-3 mr-1" />
                                      View Full Analysis
                                    </Button>
                                    <Button size="sm" variant="outline" className="text-xs">
                                      <Scale className="w-3 h-3 mr-1" />
                                      Case Law Database
                                    </Button>
                                    <Button size="sm" variant="outline" className="text-xs">
                                      <Award className="w-3 h-3 mr-1" />
                                      Expert Commentary
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
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <span>Expert Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Questions Answered</span>
                    <span className="text-purple-600 font-bold">156</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Expert Ratings</span>
                    <span className="text-purple-600 font-bold">4.9/5</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Legal Analysis Published</span>
                    <span className="text-purple-600 font-bold">23</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  <span>Specialization Areas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Fundamental Rights</span>
                    <span className="text-blue-600 font-bold">45 cases</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Constitutional Law</span>
                    <span className="text-blue-600 font-bold">38 cases</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Public Interest Litigation</span>
                    <span className="text-blue-600 font-bold">29 cases</span>
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