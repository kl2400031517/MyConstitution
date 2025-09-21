import { useState, useEffect } from 'react';

const LegalExpert = () => {
  const [legalQuestions, setLegalQuestions] = useState([]);
  const [newAnswer, setNewAnswer] = useState({ questionId: '', answer: '' });
  const [message, setMessage] = useState('');

  const faqs = [
    {
      question: "What are the fundamental rights guaranteed by the Indian Constitution?",
      answer: "The Indian Constitution guarantees six fundamental rights: Right to Equality (Articles 14-18), Right to Freedom (Articles 19-22), Right against Exploitation (Articles 23-24), Right to Freedom of Religion (Articles 25-28), Cultural and Educational Rights (Articles 29-30), and Right to Constitutional Remedies (Article 32)."
    },
    {
      question: "What is the difference between fundamental rights and directive principles?",
      answer: "Fundamental rights are justiciable rights that can be enforced in courts, while directive principles are non-justiciable guidelines for the state to follow in policy-making. Fundamental rights are negative rights (restrictions on state), while directive principles are positive obligations on the state."
    },
    {
      question: "Can fundamental rights be suspended?",
      answer: "Yes, fundamental rights can be suspended during a national emergency (Article 352) except for Articles 20 and 21. However, the right to life and personal liberty (Article 21) can only be suspended according to procedure established by law."
    },
    {
      question: "What is the procedure for amending the Constitution?",
      answer: "The Constitution can be amended under Article 368. Most amendments require a special majority (2/3rd of members present and voting, and majority of total membership) in both houses of Parliament. Some amendments affecting federal structure require ratification by half the state legislatures."
    },
    {
      question: "What is the role of the Supreme Court in protecting fundamental rights?",
      answer: "The Supreme Court acts as the guardian of fundamental rights. It can issue writs under Article 32 for enforcement of fundamental rights. The Court can declare any law unconstitutional if it violates fundamental rights and can provide appropriate remedies."
    },
    {
      question: "What are the fundamental duties of Indian citizens?",
      answer: "Article 51A lists 11 fundamental duties including respecting the Constitution, national flag, and anthem; promoting harmony and spirit of common brotherhood; protecting the environment; developing scientific temper; and striving towards excellence in all spheres of individual and collective activity."
    }
  ];

  useEffect(() => {
    loadLegalQuestions();
  }, []);

  const loadLegalQuestions = () => {
    const savedQuestions = JSON.parse(localStorage.getItem('legalQuestions') || '[]');
    setLegalQuestions(savedQuestions);
  };

  const handleAnswerQuestion = (e) => {
    e.preventDefault();
    const updatedQuestions = legalQuestions.map(q => 
      q.id === newAnswer.questionId 
        ? { ...q, answer: newAnswer.answer, answeredAt: new Date().toISOString(), answeredBy: 'Legal Expert' }
        : q
    );
    setLegalQuestions(updatedQuestions);
    localStorage.setItem('legalQuestions', JSON.stringify(updatedQuestions));
    setNewAnswer({ questionId: '', answer: '' });
    setMessage('Answer submitted successfully');
    setTimeout(() => setMessage(''), 3000);
  };

  const unansweredQuestions = legalQuestions.filter(q => !q.answer);
  const answeredQuestions = legalQuestions.filter(q => q.answer);

  return (
    <div className="container">
      <h1 className="text-center" style={{ color: 'var(--navy-blue)', marginBottom: '2rem' }}>
        Legal Expert Dashboard
      </h1>

      {message && (
        <div className={message.includes('successful') ? 'success-message' : 'error-message'}>
          {message}
        </div>
      )}

      {/* Statistics */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3 className="card-title">Total Questions</h3>
          <p className="card-content" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--saffron)' }}>
            {legalQuestions.length}
          </p>
        </div>
        <div className="dashboard-card">
          <h3 className="card-title">Unanswered</h3>
          <p className="card-content" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#DC3545' }}>
            {unansweredQuestions.length}
          </p>
        </div>
        <div className="dashboard-card">
          <h3 className="card-title">Answered</h3>
          <p className="card-content" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--green)' }}>
            {answeredQuestions.length}
          </p>
        </div>
        <div className="dashboard-card">
          <h3 className="card-title">FAQs Available</h3>
          <p className="card-content" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--navy-blue)' }}>
            {faqs.length}
          </p>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="dashboard-card" style={{ marginTop: '2rem' }}>
        <h3 className="card-title">Frequently Asked Questions</h3>
        <div className="content-grid">
          {faqs.map((faq, index) => (
            <div key={index} className="content-card">
              <div className="content-header">
                <h4 className="content-title">FAQ {index + 1}</h4>
              </div>
              <div className="content-body">
                <h5 style={{ color: 'var(--navy-blue)', marginBottom: '1rem' }}>
                  {faq.question}
                </h5>
                <p style={{ lineHeight: '1.6' }}>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unanswered Questions */}
      {unansweredQuestions.length > 0 && (
        <div className="dashboard-card" style={{ marginTop: '2rem' }}>
          <h3 className="card-title">Unanswered Legal Questions</h3>
          {unansweredQuestions.map(question => (
            <div key={question.id} className="discussion-item">
              <div className="discussion-header">
                <div className="discussion-author">{question.author}</div>
                <div className="discussion-date">
                  {new Date(question.createdAt).toLocaleDateString()}
                </div>
              </div>
              <h4 style={{ color: 'var(--navy-blue)', marginBottom: '0.5rem' }}>
                {question.title}
              </h4>
              <div className="discussion-content" style={{ marginBottom: '1rem' }}>
                {question.content}
              </div>
              
              {newAnswer.questionId === question.id ? (
                <form onSubmit={handleAnswerQuestion}>
                  <div className="form-group">
                    <label htmlFor="legal-answer">Your Answer</label>
                    <textarea
                      id="legal-answer"
                      value={newAnswer.answer}
                      onChange={(e) => setNewAnswer({...newAnswer, answer: e.target.value})}
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
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" className="submit-btn" style={{ width: 'auto', padding: '0.8rem 1.5rem' }}>
                      Submit Answer
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setNewAnswer({ questionId: '', answer: '' })}
                      className="submit-btn" 
                      style={{ 
                        width: 'auto', 
                        padding: '0.8rem 1.5rem',
                        backgroundColor: 'var(--gray)',
                        color: 'var(--white)'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button 
                  className="submit-btn"
                  onClick={() => setNewAnswer({ questionId: question.id, answer: '' })}
                  style={{ width: 'auto', padding: '0.8rem 1.5rem' }}
                >
                  Answer This Question
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Answered Questions */}
      {answeredQuestions.length > 0 && (
        <div className="dashboard-card" style={{ marginTop: '2rem' }}>
          <h3 className="card-title">Answered Questions</h3>
          {answeredQuestions.map(question => (
            <div key={question.id} className="discussion-item">
              <div className="discussion-header">
                <div className="discussion-author">{question.author}</div>
                <div className="discussion-date">
                  Asked: {new Date(question.createdAt).toLocaleDateString()}
                </div>
              </div>
              <h4 style={{ color: 'var(--navy-blue)', marginBottom: '0.5rem' }}>
                {question.title}
              </h4>
              <div className="discussion-content" style={{ marginBottom: '1rem' }}>
                {question.content}
              </div>
              
              <div style={{ 
                backgroundColor: 'var(--light-blue)', 
                padding: '1rem', 
                borderRadius: '5px',
                borderLeft: '4px solid var(--green)'
              }}>
                <h5 style={{ color: 'var(--green)', marginBottom: '0.5rem' }}>
                  Legal Expert Answer:
                </h5>
                <p style={{ lineHeight: '1.6' }}>{question.answer}</p>
                <div style={{ 
                  fontSize: '0.9rem', 
                  color: 'var(--gray)', 
                  marginTop: '0.5rem',
                  fontStyle: 'italic'
                }}>
                  Answered by {question.answeredBy} on {new Date(question.answeredAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Questions Message */}
      {legalQuestions.length === 0 && (
        <div className="dashboard-card" style={{ marginTop: '2rem' }}>
          <div className="text-center" style={{ padding: '2rem', color: 'var(--gray)' }}>
            <h3>No Legal Questions Yet</h3>
            <p>Citizens can submit their legal questions through the Citizen dashboard, and they will appear here for you to answer.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalExpert;


