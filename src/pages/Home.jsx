import { Link } from 'react-router-dom';

const Home = ({ user }) => {
  const constitutionContent = [
    {
      title: "Fundamental Rights",
      description: "Learn about the six fundamental rights guaranteed by the Indian Constitution including Right to Equality, Right to Freedom, and more.",
      articles: "Articles 14-32"
    },
    {
      title: "Fundamental Duties",
      description: "Understand the fundamental duties of every Indian citizen as outlined in Article 51A of the Constitution.",
      articles: "Article 51A"
    },
    {
      title: "Directive Principles",
      description: "Explore the Directive Principles of State Policy that guide the government in policy-making and governance.",
      articles: "Articles 36-51"
    },
    {
      title: "Preamble",
      description: "Discover the essence of the Indian Constitution through its preamble, which reflects the aspirations of the people.",
      articles: "Preamble"
    }
  ];

  const features = [
    {
      title: "Interactive Learning",
      description: "Engage with quizzes, flashcards, and interactive content to better understand constitutional concepts."
    },
    {
      title: "Discussion Board",
      description: "Participate in meaningful discussions about constitutional topics with fellow citizens and experts."
    },
    {
      title: "Expert Guidance",
      description: "Get answers to your legal questions from qualified legal experts in our community."
    },
    {
      title: "Educational Resources",
      description: "Access comprehensive educational materials created by educators and constitutional experts."
    }
  ];

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="text-center mb-2">
        <h1 style={{ 
          fontSize: '3rem', 
          color: 'var(--navy-blue)', 
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, var(--navy-blue), var(--saffron))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Know Your Constitution
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--gray)', marginBottom: '2rem' }}>
          Empowering citizens through constitutional knowledge and democratic participation
        </p>
        
        {!user ? (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="submit-btn" style={{ width: 'auto', padding: '1rem 2rem' }}>
              Get Started
            </Link>
            <Link to="/login" className="submit-btn" style={{ 
              width: 'auto', 
              padding: '1rem 2rem',
              background: 'transparent',
              border: '2px solid var(--saffron)',
              color: 'var(--saffron)'
            }}>
              Login
            </Link>
          </div>
        ) : (
          <div className="success-message" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h3>Welcome back, {user.name}!</h3>
            <p>Ready to continue your constitutional learning journey?</p>
            <Link to={`/${user.role.toLowerCase().replace(' ', '-')}`} className="submit-btn" style={{ width: 'auto', padding: '0.8rem 1.5rem' }}>
              Go to Dashboard
            </Link>
          </div>
        )}
      </section>

      {/* Constitution Content */}
      <section className="mb-2">
        <h2 className="text-center" style={{ color: 'var(--navy-blue)', marginBottom: '2rem' }}>
          Explore Constitutional Concepts
        </h2>
        <div className="content-grid">
          {constitutionContent.map((content, index) => (
            <div key={index} className="content-card">
              <div className="content-header">
                <h3 className="content-title">{content.title}</h3>
                <p style={{ opacity: 0.9 }}>{content.articles}</p>
              </div>
              <div className="content-body">
                <p>{content.description}</p>
                {user && (
                  <Link to="/citizen" className="submit-btn" style={{ 
                    width: '100%', 
                    padding: '0.8rem',
                    marginTop: '1rem',
                    fontSize: '0.9rem'
                  }}>
                    Learn More
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mb-2">
        <h2 className="text-center" style={{ color: 'var(--navy-blue)', marginBottom: '2rem' }}>
          Platform Features
        </h2>
        <div className="dashboard-grid">
          {features.map((feature, index) => (
            <div key={index} className="dashboard-card">
              <h3 className="card-title">{feature.title}</h3>
              <p className="card-content">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center mb-2" style={{ 
        background: 'linear-gradient(135deg, var(--light-blue), var(--white))',
        padding: '3rem 2rem',
        borderRadius: '15px',
        margin: '2rem 0'
      }}>
        <h2 style={{ color: 'var(--navy-blue)', marginBottom: '1rem' }}>
          Ready to Deepen Your Constitutional Understanding?
        </h2>
        <p style={{ color: 'var(--gray)', marginBottom: '2rem', fontSize: '1.1rem' }}>
          Join thousands of citizens who are actively learning about their rights, duties, and the democratic framework of India.
        </p>
        {!user && (
          <Link to="/register" className="submit-btn" style={{ 
            width: 'auto', 
            padding: '1.2rem 2.5rem',
            fontSize: '1.1rem'
          }}>
            Start Learning Today
          </Link>
        )}
      </section>
    </div>
  );
};

export default Home;


