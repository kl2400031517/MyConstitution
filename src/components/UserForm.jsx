import { useState } from 'react';
import { Link } from 'react-router-dom';

const UserForm = ({ onLogin, isLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Citizen',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    if (isLogin) {
      // Login logic
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        const { password, ...userWithoutPassword } = user;
        onLogin(userWithoutPassword);
        setMessage('Login successful!');
      } else {
        setMessage('Invalid email or password');
      }
    } else {
      // Registration logic
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find(u => u.email === formData.email);
      
      if (existingUser) {
        setMessage('User with this email already exists');
        return;
      }

      const newUser = { ...formData, id: Date.now() };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      const { password, ...userWithoutPassword } = newUser;
      onLogin(userWithoutPassword);
      setMessage('Registration successful!');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">
        {isLogin ? 'Login to Your Account' : 'Create Your Account'}
      </h2>
      
      {message && (
        <div className={message.includes('successful') ? 'success-message' : 'error-message'}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {!isLogin && (
          <>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="Citizen">Citizen</option>
                <option value="Educator">Educator</option>
                <option value="Legal Expert">Legal Expert</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </>
        )}

        <button type="submit" className="submit-btn">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <div className="text-center mt-2">
        {isLogin ? (
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        ) : (
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default UserForm;


