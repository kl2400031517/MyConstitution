import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const getDashboardLink = () => {
    if (!user) return null;
    
    switch (user.role) {
      case 'Admin':
        return '/admin';
      case 'Educator':
        return '/educator';
      case 'Citizen':
        return '/citizen';
      case 'Legal Expert':
        return '/legal-expert';
      default:
        return '/';
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          🇮🇳 Know Your Constitution
        </Link>
        
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          
          {user ? (
            <>
              <li><Link to={getDashboardLink()}>Dashboard</Link></li>
              <li><Link to="/citizen">Browse Content</Link></li>
              <li><Link to="/citizen">Discussion</Link></li>
              <li><Link to="/citizen">Quiz</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>

        {user && (
          <div className="user-info">
            <div className="user-details">
              <div className="user-name">{user.name}</div>
              <div className="user-role">{user.role}</div>
            </div>
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

