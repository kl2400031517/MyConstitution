import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Navigation } from './Navigation';
import { 
  Shield, 
  Heart, 
  BookOpen, 
  MessageCircle,
  ChevronDown,
  ChevronRight,
  Users,
  Clock,
  ThumbsUp,
  Reply
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import type { User, Screen } from '../types';

interface CitizenPageProps {
  user: User | null;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function CitizenPage({ user, onNavigate, onLogout }: CitizenPageProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');

  const constitutionSections = [
    {
      id: 'rights',
      title: 'Fundamental Rights',
      icon: Shield,
      color: 'saffron',
      brief: 'Fundamental Rights are the basic human rights guaranteed by the Constitution of India to all citizens. These rights are essential for the development of personality and are enforceable by courts.',
      items: [
        { 
          name: 'Right to Equality (Articles 14-18)', 
          description: 'Equality before law and equal protection of laws',
          details: 'This right ensures that all citizens are equal before the law and prohibits discrimination on grounds of religion, race, caste, sex, or place of birth.',
          examples: [
            'No person can be denied admission to educational institutions based on caste or religion',
            'Equal pay for equal work regardless of gender',
            'No discrimination in public employment based on religion, race, or caste',
            'Abolition of untouchability and prohibition of its practice'
          ],
          articles: 'Articles 14-18'
        },
        { 
          name: 'Right to Freedom (Articles 19-22)', 
          description: 'Freedom of speech, expression, assembly, association, movement, residence, and profession',
          details: 'These freedoms are subject to reasonable restrictions in the interest of sovereignty, integrity, security, public order, decency, or morality.',
          examples: [
            'Right to express opinions freely in newspapers, social media',
            'Right to form associations, trade unions, political parties',
            'Right to peaceful assembly and protest',
            'Right to move freely throughout India and settle anywhere',
            'Right to practice any profession or carry on any occupation'
          ],
          articles: 'Articles 19-22'
        },
        { 
          name: 'Right against Exploitation (Articles 23-24)', 
          description: 'Prohibition of traffic in human beings and forced labour',
          details: 'This right protects individuals from exploitation and ensures human dignity by prohibiting various forms of forced labour and trafficking.',
          examples: [
            'Prohibition of human trafficking and forced labour',
            'Abolition of bonded labour system',
            'Protection of children from hazardous employment',
            'Prohibition of employment of children below 14 years in factories, mines, or other hazardous occupations'
          ],
          articles: 'Articles 23-24'
        },
        { 
          name: 'Right to Freedom of Religion (Articles 25-28)', 
          description: 'Freedom of conscience and free profession, practice and propagation of religion',
          details: 'This right ensures religious freedom while maintaining secularism and preventing religious discrimination.',
          examples: [
            'Right to practice, profess, and propagate any religion',
            'Freedom to manage religious affairs and institutions',
            'No religious instruction in state-funded educational institutions',
            'Right to establish and maintain religious and charitable institutions'
          ],
          articles: 'Articles 25-28'
        },
        { 
          name: 'Cultural and Educational Rights (Articles 29-30)', 
          description: 'Protection of interests of minorities',
          details: 'These rights protect the cultural and educational interests of minorities and ensure their right to conserve their distinct language, script, or culture.',
          examples: [
            'Right of minorities to conserve their distinct language, script, or culture',
            'Right of minorities to establish and administer educational institutions',
            'No discrimination in admission to educational institutions on grounds of religion, race, caste, or language',
            'Right to receive education in mother tongue'
          ],
          articles: 'Articles 29-30'
        },
        { 
          name: 'Right to Constitutional Remedies (Article 32)', 
          description: 'Right to approach the Supreme Court for enforcement of fundamental rights',
          details: 'This is called the "Heart and Soul" of the Constitution as it provides the means to enforce all other fundamental rights.',
          examples: [
            'Right to file writ petitions in Supreme Court (Habeas Corpus, Mandamus, Prohibition, Quo Warranto, Certiorari)',
            'Right to approach High Courts under Article 226',
            'Right to legal aid and assistance',
            'Right to compensation for violation of fundamental rights'
          ],
          articles: 'Article 32'
        }
      ]
    },
    {
      id: 'duties',
      title: 'Fundamental Duties',
      icon: Heart,
      color: 'constitution-green',
      brief: 'Fundamental Duties are moral obligations of all citizens to help promote a spirit of patriotism and to uphold the unity of India. These were added by the 42nd Amendment Act, 1976.',
      items: [
        { 
          name: 'Respect the Constitution (Article 51A(a))', 
          description: 'To abide by the Constitution and respect its ideals and institutions',
          details: 'Every citizen must follow the Constitution and respect the democratic institutions established by it.',
          examples: [
            'Following laws and regulations made under the Constitution',
            'Respecting the judiciary, legislature, and executive',
            'Participating in democratic processes like voting',
            'Upholding the democratic values enshrined in the Constitution'
          ],
          articles: 'Article 51A(a)'
        },
        { 
          name: 'Cherish Noble Ideals (Article 51A(b))', 
          description: 'To cherish and follow the noble ideals which inspired our national struggle for freedom',
          details: 'Citizens should remember and follow the values that guided India\'s freedom struggle.',
          examples: [
            'Remembering sacrifices of freedom fighters',
            'Following principles of non-violence and truth',
            'Promoting values of equality, justice, and fraternity',
            'Celebrating national festivals and remembering historical events'
          ],
          articles: 'Article 51A(b)'
        },
        { 
          name: 'Uphold Sovereignty (Article 51A(c))', 
          description: 'To uphold and protect the sovereignty, unity and integrity of India',
          details: 'Every citizen must work to maintain India\'s independence, unity, and territorial integrity.',
          examples: [
            'Supporting national security and defense efforts',
            'Promoting national unity and opposing divisive forces',
            'Respecting national symbols like flag and anthem',
            'Working for the development and progress of the nation'
          ],
          articles: 'Article 51A(c)'
        },
        { 
          name: 'Defend the Country (Article 51A(d))', 
          description: 'To defend the country and render national service when called upon to do so',
          details: 'Citizens should be ready to serve the nation in times of need, including military service.',
          examples: [
            'Joining armed forces when required',
            'Participating in disaster relief and rescue operations',
            'Contributing to national development projects',
            'Supporting government initiatives for national welfare'
          ],
          articles: 'Article 51A(d)'
        },
        { 
          name: 'Promote Harmony (Article 51A(e))', 
          description: 'To promote harmony and the spirit of common brotherhood',
          details: 'Citizens should work to eliminate discrimination and promote unity among all sections of society.',
          examples: [
            'Treating all people with respect regardless of religion, caste, or gender',
            'Promoting inter-faith harmony and understanding',
            'Working against social evils like untouchability',
            'Supporting initiatives for social equality and justice'
          ],
          articles: 'Article 51A(e)'
        },
        { 
          name: 'Preserve Culture (Article 51A(f))', 
          description: 'To value and preserve the rich heritage of our composite culture',
          details: 'Citizens should protect and promote India\'s diverse cultural heritage.',
          examples: [
            'Learning and preserving traditional arts and crafts',
            'Visiting and maintaining historical monuments',
            'Supporting cultural festivals and traditions',
            'Teaching children about Indian culture and heritage'
          ],
          articles: 'Article 51A(f)'
        },
        { 
          name: 'Protect Environment (Article 51A(g))', 
          description: 'To protect and improve the natural environment',
          details: 'Citizens must work to preserve forests, lakes, rivers, and wildlife for future generations.',
          examples: [
            'Planting trees and maintaining green spaces',
            'Reducing pollution and waste',
            'Supporting wildlife conservation efforts',
            'Using eco-friendly products and practices'
          ],
          articles: 'Article 51A(g)'
        },
        { 
          name: 'Develop Scientific Temper (Article 51A(h))', 
          description: 'To develop the scientific temper, humanism and the spirit of inquiry and reform',
          details: 'Citizens should adopt a scientific approach to problem-solving and reject superstitions.',
          examples: [
            'Questioning superstitions and blind beliefs',
            'Supporting scientific research and innovation',
            'Promoting rational thinking and evidence-based decisions',
            'Encouraging children to pursue science and technology'
          ],
          articles: 'Article 51A(h)'
        },
        { 
          name: 'Safeguard Public Property (Article 51A(i))', 
          description: 'To safeguard public property and to abjure violence',
          details: 'Citizens must protect public assets and avoid violence in all forms.',
          examples: [
            'Not damaging public buildings, monuments, or infrastructure',
            'Reporting vandalism and destruction of public property',
            'Using public facilities responsibly',
            'Promoting peaceful means of protest and expression'
          ],
          articles: 'Article 51A(i)'
        },
        { 
          name: 'Strive for Excellence (Article 51A(j))', 
          description: 'To strive towards excellence in all spheres of individual and collective activity',
          details: 'Citizens should work hard to achieve excellence in their personal and professional lives.',
          examples: [
            'Pursuing education and skill development',
            'Working with dedication and commitment',
            'Contributing to community development',
            'Setting high standards in all endeavors'
          ],
          articles: 'Article 51A(j)'
        },
        { 
          name: 'Provide Education (Article 51A(k))', 
          description: 'To provide opportunities for education to children between 6-14 years',
          details: 'Parents and guardians must ensure their children receive education as a fundamental right.',
          examples: [
            'Enrolling children in schools',
            'Supporting government education initiatives',
            'Creating awareness about importance of education',
            'Contributing to educational infrastructure development'
          ],
          articles: 'Article 51A(k)'
        }
      ]
    },
    {
      id: 'principles',
      title: 'Directive Principles',
      icon: BookOpen,
      color: 'navy-blue',
      brief: 'Directive Principles of State Policy are guidelines for the government to establish a just society. They are not enforceable by courts but are fundamental in governance.',
      items: [
        { 
          name: 'Social Security (Article 38)', 
          description: 'The State shall strive to promote the welfare of the people',
          details: 'The government should work to minimize inequalities in income, status, facilities, and opportunities.',
          examples: [
            'Implementing social welfare schemes for the poor',
            'Providing healthcare facilities to all citizens',
            'Creating employment opportunities',
            'Reducing income disparities through progressive taxation'
          ],
          articles: 'Article 38'
        },
        { 
          name: 'Equal Justice (Article 39A)', 
          description: 'The State shall secure equal justice and free legal aid',
          details: 'The government should ensure that justice is accessible to all, especially the poor and marginalized.',
          examples: [
            'Providing free legal aid to poor litigants',
            'Establishing Lok Adalats for quick justice',
            'Setting up legal aid clinics in rural areas',
            'Training para-legal volunteers to help people access justice'
          ],
          articles: 'Article 39A'
        },
        { 
          name: 'Living Wage (Article 43)', 
          description: 'The State shall endeavour to secure a living wage for all workers',
          details: 'The government should ensure that workers receive fair wages and decent working conditions.',
          examples: [
            'Setting minimum wage standards',
            'Implementing labor welfare schemes',
            'Providing social security benefits to workers',
            'Ensuring safe working conditions in industries'
          ],
          articles: 'Article 43'
        },
        { 
          name: 'Education (Article 45)', 
          description: 'The State shall endeavour to provide free and compulsory education',
          details: 'The government should ensure that all children receive quality education up to a certain age.',
          examples: [
            'Implementing Right to Education Act (RTE)',
            'Building schools in rural and remote areas',
            'Providing mid-day meals to encourage school attendance',
            'Training teachers and improving educational infrastructure'
          ],
          articles: 'Article 45'
        },
        { 
          name: 'Environment Protection (Article 48A)', 
          description: 'The State shall endeavour to protect and improve the environment',
          details: 'The government should work to preserve forests, wildlife, and maintain ecological balance.',
          examples: [
            'Implementing environmental protection laws',
            'Creating national parks and wildlife sanctuaries',
            'Promoting renewable energy sources',
            'Controlling pollution and waste management'
          ],
          articles: 'Article 48A'
        },
        { 
          name: 'Health and Nutrition (Article 47)', 
          description: 'The State shall regard the raising of the level of nutrition and standard of living',
          details: 'The government should work to improve public health and nutrition standards.',
          examples: [
            'Implementing nutrition programs for children and mothers',
            'Providing clean drinking water and sanitation',
            'Running public health campaigns',
            'Establishing primary health centers in rural areas'
          ],
          articles: 'Article 47'
        },
        { 
          name: 'Agriculture and Animal Husbandry (Article 48)', 
          description: 'The State shall endeavour to organise agriculture and animal husbandry',
          details: 'The government should modernize agriculture and improve animal husbandry practices.',
          examples: [
            'Providing modern farming equipment and techniques',
            'Establishing veterinary hospitals and services',
            'Implementing crop insurance schemes',
            'Promoting organic farming and sustainable agriculture'
          ],
          articles: 'Article 48'
        },
        { 
          name: 'Village Development (Article 40)', 
          description: 'The State shall take steps to organise village panchayats',
          details: 'The government should strengthen local self-government and promote rural development.',
          examples: [
            'Implementing Panchayati Raj system',
            'Providing funds for rural development projects',
            'Training panchayat members in governance',
            'Creating employment opportunities in rural areas'
          ],
          articles: 'Article 40'
        }
      ]
    }
  ];

  const discussionPosts = [
    {
      id: 1,
      author: 'Priya Sharma',
      role: 'Citizen',
      time: '2 hours ago',
      content: 'Can someone explain the difference between Fundamental Rights and Directive Principles? I\'m confused about their enforceability.',
      likes: 12,
      replies: 3
    },
    {
      id: 2,
      author: 'Dr. Rajesh Kumar',
      role: 'Legal Expert',
      time: '4 hours ago',
      content: 'The Right to Privacy was declared a fundamental right by the Supreme Court in 2017. This has significant implications for digital rights and data protection.',
      likes: 28,
      replies: 7
    },
    {
      id: 3,
      author: 'Prof. Meera Singh',
      role: 'Educator',
      time: '1 day ago',
      content: 'I\'ve created a new quiz on Constitutional Amendments. It covers the major amendments from 1951 to 2020. Would love to get your feedback!',
      likes: 15,
      replies: 5
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      console.log('New comment:', newComment);
      setNewComment('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentScreen="citizen" 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
        user={user} 
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy-blue mb-2">Explore the Constitution</h1>
          <p className="text-gray-600">Learn about your rights, duties, and the principles that guide our nation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Constitution Content */}
          <div className="lg:col-span-2 space-y-6">
            {constitutionSections.map((section) => {
              const Icon = section.icon;
              const isExpanded = expandedSection === section.id;
              
              return (
                <Card key={section.id} className="border-0 shadow-md">
                  <CardHeader 
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleSection(section.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 bg-${section.color}/20 rounded-lg flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 text-${section.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{section.title}</CardTitle>
                          <p className="text-sm text-gray-600 mt-1">
                            {section.items.length} items • Click to expand
                          </p>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </CardHeader>
                  
                  {isExpanded && (
                    <CardContent>
                      <div className="space-y-4">
                        {section.items.map((item, index) => (
                          <div key={index} className="border-l-4 border-gray-200 pl-4 py-3 hover:border-l-navy-blue transition-colors">
                            <h4 className="font-bold text-navy-blue mb-1">{item.name}</h4>
                            <p className="text-gray-600 text-sm">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Discussion Board Sidebar */}
          <div className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-navy-blue" />
                  <span>Recent Discussions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {discussionPosts.map((post) => (
                  <div key={post.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm">{post.author}</span>
                          <Badge variant="outline" className="text-xs">
                            {post.role}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-3">{post.content}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <ThumbsUp className="w-3 h-3" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Reply className="w-3 h-3" />
                              <span>{post.replies}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{post.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button 
                  onClick={() => onNavigate('discussion')}
                  variant="outline" 
                  className="w-full mt-4"
                >
                  <Users className="w-4 h-4 mr-2" />
                  View All Discussions
                </Button>
              </CardContent>
            </Card>

            {/* Quick Comment */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Share Your Thoughts</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCommentSubmit} className="space-y-3">
                  <Textarea
                    placeholder="Ask a question or share your insights about the Constitution..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-navy-blue hover:bg-navy-blue/90 text-white"
                    disabled={!newComment.trim()}
                  >
                    Post Comment
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}