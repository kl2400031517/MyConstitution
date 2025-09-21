import { useState, useEffect } from 'react';

const Educator = () => {
  const [content, setContent] = useState([]);
  const [newContent, setNewContent] = useState({
    title: '',
    description: '',
    type: 'article',
    content: ''
  });
  const [quizzes, setQuizzes] = useState([]);
  const [newQuiz, setNewQuiz] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadContent();
    loadQuizzes();
  }, []);

  const loadContent = () => {
    const savedContent = JSON.parse(localStorage.getItem('educationalContent') || '[]');
    setContent(savedContent);
  };

  const loadQuizzes = () => {
    const savedQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    setQuizzes(savedQuizzes);
  };

  const handleAddContent = (e) => {
    e.preventDefault();
    const contentItem = {
      ...newContent,
      id: Date.now(),
      author: 'Current Educator',
      createdAt: new Date().toISOString()
    };
    
    const updatedContent = [...content, contentItem];
    setContent(updatedContent);
    localStorage.setItem('educationalContent', JSON.stringify(updatedContent));
    
    setNewContent({ title: '', description: '', type: 'article', content: '' });
    setMessage('Content added successfully');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleAddQuiz = (e) => {
    e.preventDefault();
    const quizItem = {
      ...newQuiz,
      id: Date.now(),
      author: 'Current Educator',
      createdAt: new Date().toISOString()
    };
    
    const updatedQuizzes = [...quizzes, quizItem];
    setQuizzes(updatedQuizzes);
    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
    
    setNewQuiz({ question: '', options: ['', '', '', ''], correctAnswer: 0 });
    setMessage('Quiz added successfully');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDeleteContent = (id) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      const updatedContent = content.filter(item => item.id !== id);
      setContent(updatedContent);
      localStorage.setItem('educationalContent', JSON.stringify(updatedContent));
      setMessage('Content deleted successfully');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDeleteQuiz = (id) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      const updatedQuizzes = quizzes.filter(quiz => quiz.id !== id);
      setQuizzes(updatedQuizzes);
      localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
      setMessage('Quiz deleted successfully');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center" style={{ color: 'var(--navy-blue)', marginBottom: '2rem' }}>
        Educator Dashboard
      </h1>

      {message && (
        <div className={message.includes('successful') ? 'success-message' : 'error-message'}>
          {message}
        </div>
      )}

      {/* Statistics */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3 className="card-title">Total Content</h3>
          <p className="card-content" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--saffron)' }}>
            {content.length}
          </p>
        </div>
        <div className="dashboard-card">
          <h3 className="card-title">Quizzes Created</h3>
          <p className="card-content" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--green)' }}>
            {quizzes.length}
          </p>
        </div>
        <div className="dashboard-card">
          <h3 className="card-title">Articles</h3>
          <p className="card-content" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--navy-blue)' }}>
            {content.filter(c => c.type === 'article').length}
          </p>
        </div>
        <div className="dashboard-card">
          <h3 className="card-title">Flashcards</h3>
          <p className="card-content" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--gray)' }}>
            {content.filter(c => c.type === 'flashcard').length}
          </p>
        </div>
      </div>

      {/* Add Content Form */}
      <div className="dashboard-card" style={{ marginTop: '2rem' }}>
        <h3 className="card-title">Create Educational Content</h3>
        <form onSubmit={handleAddContent}>
          <div className="form-group">
            <label htmlFor="content-title">Title</label>
            <input
              type="text"
              id="content-title"
              value={newContent.title}
              onChange={(e) => setNewContent({...newContent, title: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content-description">Description</label>
            <input
              type="text"
              id="content-description"
              value={newContent.description}
              onChange={(e) => setNewContent({...newContent, description: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content-type">Type</label>
            <select
              id="content-type"
              value={newContent.type}
              onChange={(e) => setNewContent({...newContent, type: e.target.value})}
              required
            >
              <option value="article">Article</option>
              <option value="flashcard">Flashcard</option>
              <option value="timeline">Timeline</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="content-body">Content</label>
            <textarea
              id="content-body"
              value={newContent.content}
              onChange={(e) => setNewContent({...newContent, content: e.target.value})}
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
            Add Content
          </button>
        </form>
      </div>

      {/* Add Quiz Form */}
      <div className="dashboard-card" style={{ marginTop: '2rem' }}>
        <h3 className="card-title">Create Quiz</h3>
        <form onSubmit={handleAddQuiz}>
          <div className="form-group">
            <label htmlFor="quiz-question">Question</label>
            <input
              type="text"
              id="quiz-question"
              value={newQuiz.question}
              onChange={(e) => setNewQuiz({...newQuiz, question: e.target.value})}
              required
            />
          </div>
          {newQuiz.options.map((option, index) => (
            <div key={index} className="form-group">
              <label htmlFor={`option-${index}`}>Option {index + 1}</label>
              <input
                type="text"
                id={`option-${index}`}
                value={option}
                onChange={(e) => {
                  const newOptions = [...newQuiz.options];
                  newOptions[index] = e.target.value;
                  setNewQuiz({...newQuiz, options: newOptions});
                }}
                required
              />
            </div>
          ))}
          <div className="form-group">
            <label htmlFor="correct-answer">Correct Answer (1-4)</label>
            <select
              id="correct-answer"
              value={newQuiz.correctAnswer}
              onChange={(e) => setNewQuiz({...newQuiz, correctAnswer: parseInt(e.target.value)})}
              required
            >
              <option value={0}>Option 1</option>
              <option value={1}>Option 2</option>
              <option value={2}>Option 3</option>
              <option value={3}>Option 4</option>
            </select>
          </div>
          <button type="submit" className="submit-btn">
            Add Quiz
          </button>
        </form>
      </div>

      {/* Content List */}
      <div className="dashboard-card" style={{ marginTop: '2rem' }}>
        <h3 className="card-title">Your Content</h3>
        {content.length === 0 ? (
          <div className="text-center" style={{ padding: '2rem', color: 'var(--gray)' }}>
            No content created yet
          </div>
        ) : (
          <div className="content-grid">
            {content.map(item => (
              <div key={item.id} className="content-card">
                <div className="content-header">
                  <h4 className="content-title">{item.title}</h4>
                  <span style={{ opacity: 0.9, fontSize: '0.9rem' }}>{item.type}</span>
                </div>
                <div className="content-body">
                  <p>{item.description}</p>
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteContent(item.id)}
                      style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quiz List */}
      <div className="dashboard-card" style={{ marginTop: '2rem' }}>
        <h3 className="card-title">Your Quizzes</h3>
        {quizzes.length === 0 ? (
          <div className="text-center" style={{ padding: '2rem', color: 'var(--gray)' }}>
            No quizzes created yet
          </div>
        ) : (
          <div className="content-grid">
            {quizzes.map(quiz => (
              <div key={quiz.id} className="content-card">
                <div className="content-header">
                  <h4 className="content-title">{quiz.question}</h4>
                </div>
                <div className="content-body">
                  <div className="quiz-options">
                    {quiz.options.map((option, index) => (
                      <div key={index} className="quiz-option" style={{ 
                        backgroundColor: index === quiz.correctAnswer ? 'var(--light-blue)' : 'transparent',
                        borderColor: index === quiz.correctAnswer ? 'var(--saffron)' : 'var(--border-gray)'
                      }}>
                        <span>{String.fromCharCode(65 + index)}. {option}</span>
                        {index === quiz.correctAnswer && <span style={{ marginLeft: 'auto', color: 'var(--green)', fontWeight: 'bold' }}>✓</span>}
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteQuiz(quiz.id)}
                      style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Educator;

