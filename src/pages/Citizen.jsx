import { useState, useEffect } from 'react';

const Citizen = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [content, setContent] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '' });
  const [newLegalQuestion, setNewLegalQuestion] = useState({ title: '', content: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadContent();
    loadQuizzes();
    loadDiscussions();
  }, []);

  const loadContent = () => {
    const savedContent = JSON.parse(localStorage.getItem('educationalContent') || '[]');
    setContent(savedContent);
  };

  const loadQuizzes = () => {
    const savedQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    setQuizzes(savedQuizzes);
  };

  const loadDiscussions = () => {
    const savedDiscussions = JSON.parse(localStorage.getItem('discussions') || '[]');
    setDiscussions(savedDiscussions);
  };

  const handleAddLegalQuestion = (e) => {
    e.preventDefault();
    const question = {
      ...newLegalQuestion,
      id: Date.now(),
      author: 'Current User',
      createdAt: new Date().toISOString()
    };
    
    const savedQuestions = JSON.parse(localStorage.getItem('legalQuestions') || '[]');
    const updatedQuestions = [...savedQuestions, question];
    localStorage.setItem('legalQuestions', JSON.stringify(updatedQuestions));
    
    setNewLegalQuestion({ title: '', content: '' });
    setMessage('Legal question submitted successfully');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleAddDiscussion = (e) => {
    e.preventDefault();
    const discussion = {
      ...newDiscussion,
      id: Date.now(),
      author: 'Current User',
      createdAt: new Date().toISOString()
    };
    
    const updatedDiscussions = [...discussions, discussion];
    setDiscussions(updatedDiscussions);
    localStorage.setItem('discussions', JSON.stringify(updatedDiscussions));
    
    setNewDiscussion({ title: '', content: '' });
    setMessage('Discussion posted successfully');
    setTimeout(() => setMessage(''), 3000);
  };

  const startQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setQuizAnswers({});
    setQuizScore(null);
  };

  const submitQuiz = () => {
    let score = 0;
    Object.keys(quizAnswers).forEach(questionId => {
      if (quizAnswers[questionId] === currentQuiz.correctAnswer) {
        score++;
      }
    });
    setQuizScore(score);
  };

  const resetQuiz = () => {
    setCurrentQuiz(null);
    setQuizAnswers({});
    setQuizScore(null);
  };

  const filteredContent = content.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const constitutionArticles = [
    {
      title: "Article 14 - Right to Equality",
      content: "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India."
    },
    {
      title: "Article 19 - Right to Freedom",
      content: "All citizens shall have the right to freedom of speech and expression, assembly, association, movement, residence, and settlement."
    },
    {
      title: "Article 21 - Right to Life and Personal Liberty",
      content: "No person shall be deprived of his life or personal liberty except according to procedure established by law."
    },
    {
      title: "Article 25 - Freedom of Religion",
      content: "Subject to public order, morality and health, all persons are equally entitled to freedom of conscience and the right to freely profess, practice and propagate religion."
    },
    {
      title: "Article 32 - Right to Constitutional Remedies",
      content: "The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred by this Part is guaranteed."
    }
  ];

  return (
    <div className="container">
      <h1 className="text-center" style={{ color: 'var(--navy-blue)', marginBottom: '2rem' }}>
        Citizen Dashboard
      </h1>

      {message && (
        <div className={message.includes('successful') ? 'success-message' : 'error-message'}>
          {message}
        </div>
      )}

      {/* Navigation Tabs */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '2rem',
        borderBottom: '2px solid var(--border-gray)'
      }}>
        {['browse', 'discussion', 'quiz', 'legal-help'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '1rem 2rem',
              border: 'none',
              background: activeTab === tab ? 'var(--saffron)' : 'transparent',
              color: activeTab === tab ? 'var(--white)' : 'var(--navy-blue)',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
            textTransform: 'capitalize',
            borderBottom: activeTab === tab ? '3px solid var(--navy-blue)' : '3px solid transparent'
          }}
        >
          {tab === 'legal-help' ? 'Legal Help' : tab}
        </button>
      ))}
    </div>

      {/* Browse Content Tab */}
      {activeTab === 'browse' && (
        <>
          {/* Search Bar */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search articles, content, or topics..."
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Constitution Articles */}
          <div className="dashboard-card" style={{ marginBottom: '2rem' }}>
            <h3 className="card-title">Fundamental Rights</h3>
            <div className="content-grid">
              {constitutionArticles.map((article, index) => (
                <div key={index} className="content-card">
                  <div className="content-header">
                    <h4 className="content-title">{article.title}</h4>
                  </div>
                  <div className="content-body">
                    <p>{article.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Educational Content */}
          <div className="dashboard-card">
            <h3 className="card-title">Educational Content</h3>
            {filteredContent.length === 0 ? (
              <div className="text-center" style={{ padding: '2rem', color: 'var(--gray)' }}>
                {searchTerm ? 'No content found matching your search' : 'No educational content available yet'}
              </div>
            ) : (
              <div className="content-grid">
                {filteredContent.map(item => (
                  <div key={item.id} className="content-card">
                    <div className="content-header">
                      <h4 className="content-title">{item.title}</h4>
                      <span style={{ opacity: 0.9, fontSize: '0.9rem' }}>{item.type}</span>
                    </div>
                    <div className="content-body">
                      <p>{item.description}</p>
                      <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--light-blue)', borderRadius: '5px' }}>
                        <p style={{ fontStyle: 'italic' }}>{item.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Discussion Tab */}
      {activeTab === 'discussion' && (
        <>
          {/* Add Discussion Form */}
          <div className="dashboard-card" style={{ marginBottom: '2rem' }}>
            <h3 className="card-title">Start a Discussion</h3>
            <form onSubmit={handleAddDiscussion}>
              <div className="form-group">
                <label htmlFor="discussion-title">Title</label>
                <input
                  type="text"
                  id="discussion-title"
                  value={newDiscussion.title}
                  onChange={(e) => setNewDiscussion({...newDiscussion, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="discussion-content">Content</label>
                <textarea
                  id="discussion-content"
                  value={newDiscussion.content}
                  onChange={(e) => setNewDiscussion({...newDiscussion, content: e.target.value})}
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid var(--border-gray)',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    fontFamily: 'inherit'
                  }}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                Post Discussion
              </button>
            </form>
          </div>

          {/* Discussion List */}
          <div className="dashboard-card">
            <h3 className="card-title">Community Discussions</h3>
            {discussions.length === 0 ? (
              <div className="text-center" style={{ padding: '2rem', color: 'var(--gray)' }}>
                No discussions yet. Start the conversation!
              </div>
            ) : (
              <div>
                {discussions.map(discussion => (
                  <div key={discussion.id} className="discussion-item">
                    <div className="discussion-header">
                      <div className="discussion-author">{discussion.author}</div>
                      <div className="discussion-date">
                        {new Date(discussion.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <h4 style={{ color: 'var(--navy-blue)', marginBottom: '0.5rem' }}>
                      {discussion.title}
                    </h4>
                    <div className="discussion-content">{discussion.content}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Quiz Tab */}
      {activeTab === 'quiz' && (
        <>
          {!currentQuiz ? (
            <div className="dashboard-card">
              <h3 className="card-title">Constitution Quiz</h3>
              {quizzes.length === 0 ? (
                <div className="text-center" style={{ padding: '2rem', color: 'var(--gray)' }}>
                  No quizzes available yet
                </div>
              ) : (
                <div className="content-grid">
                  {quizzes.map(quiz => (
                    <div key={quiz.id} className="content-card">
                      <div className="content-header">
                        <h4 className="content-title">Quiz Question</h4>
                      </div>
                      <div className="content-body">
                        <p style={{ marginBottom: '1rem' }}>{quiz.question}</p>
                        <button 
                          className="submit-btn"
                          onClick={() => startQuiz(quiz)}
                          style={{ width: 'auto', padding: '0.8rem 1.5rem' }}
                        >
                          Start Quiz
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="quiz-container">
              {!quizScore ? (
                <>
                  <h3 className="card-title">Quiz: {currentQuiz.question}</h3>
                  <div className="quiz-options">
                    {currentQuiz.options.map((option, index) => (
                      <div 
                        key={index} 
                        className={`quiz-option ${quizAnswers[currentQuiz.id] === index ? 'selected' : ''}`}
                        onClick={() => setQuizAnswers({...quizAnswers, [currentQuiz.id]: index})}
                      >
                        <input
                          type="radio"
                          name={`quiz-${currentQuiz.id}`}
                          checked={quizAnswers[currentQuiz.id] === index}
                          onChange={() => setQuizAnswers({...quizAnswers, [currentQuiz.id]: index})}
                        />
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <button 
                      className="submit-btn"
                      onClick={submitQuiz}
                      style={{ width: 'auto', padding: '1rem 2rem' }}
                    >
                      Submit Answer
                    </button>
                  </div>
                </>
              ) : (
                <div className="quiz-results">
                  <h3>Quiz Results</h3>
                  <div className="score">
                    {quizScore === 1 ? 'Correct!' : 'Incorrect!'}
                  </div>
                  <p>The correct answer was: <strong>{currentQuiz.options[currentQuiz.correctAnswer]}</strong></p>
                  <button 
                    className="submit-btn"
                    onClick={resetQuiz}
                    style={{ width: 'auto', padding: '1rem 2rem', marginTop: '1rem' }}
                  >
                    Try Another Quiz
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Legal Help Tab */}
      {activeTab === 'legal-help' && (
        <>
          {/* Submit Legal Question Form */}
          <div className="dashboard-card" style={{ marginBottom: '2rem' }}>
            <h3 className="card-title">Ask a Legal Question</h3>
            <p style={{ color: 'var(--gray)', marginBottom: '1.5rem' }}>
              Have a question about constitutional law or your rights? Submit it here and our legal experts will provide answers.
            </p>
            <form onSubmit={handleAddLegalQuestion}>
              <div className="form-group">
                <label htmlFor="legal-question-title">Question Title</label>
                <input
                  type="text"
                  id="legal-question-title"
                  value={newLegalQuestion.title}
                  onChange={(e) => setNewLegalQuestion({...newLegalQuestion, title: e.target.value})}
                  placeholder="Brief title for your legal question"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="legal-question-content">Detailed Question</label>
                <textarea
                  id="legal-question-content"
                  value={newLegalQuestion.content}
                  onChange={(e) => setNewLegalQuestion({...newLegalQuestion, content: e.target.value})}
                  rows="4"
                  placeholder="Please provide details about your legal question or concern..."
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid var(--border-gray)',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    fontFamily: 'inherit'
                  }}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                Submit Legal Question
              </button>
            </form>
          </div>

          {/* Legal Resources */}
          <div className="dashboard-card">
            <h3 className="card-title">Legal Resources</h3>
            <div className="content-grid">
              <div className="content-card">
                <div className="content-header">
                  <h4 className="content-title">Constitution of India</h4>
                </div>
                <div className="content-body">
                  <p>Access the complete text of the Indian Constitution with searchable articles and amendments.</p>
                  <a href="#" style={{ color: 'var(--saffron)', textDecoration: 'none' }}>
                    Read Constitution →
                  </a>
                </div>
              </div>
              <div className="content-card">
                <div className="content-header">
                  <h4 className="content-title">Supreme Court Judgments</h4>
                </div>
                <div className="content-body">
                  <p>Browse landmark Supreme Court judgments related to fundamental rights and constitutional law.</p>
                  <a href="#" style={{ color: 'var(--saffron)', textDecoration: 'none' }}>
                    View Judgments →
                  </a>
                </div>
              </div>
              <div className="content-card">
                <div className="content-header">
                  <h4 className="content-title">Legal Aid</h4>
                </div>
                <div className="content-body">
                  <p>Find information about free legal aid services available to citizens.</p>
                  <a href="#" style={{ color: 'var(--saffron)', textDecoration: 'none' }}>
                    Get Legal Aid →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Citizen;
