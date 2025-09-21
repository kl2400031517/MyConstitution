import { useState, useEffect } from 'react';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    role: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(savedUsers);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setMessage('User deleted successfully');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role
    });
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const updatedUsers = users.map(user => 
      user.id === editingUser.id 
        ? { ...user, ...editForm }
        : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setEditingUser(null);
    setMessage('User updated successfully');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditForm({ name: '', email: '', role: '' });
  };

  const getRoleColor = (role) => {
    const colors = {
      'Admin': '#DC3545',
      'Educator': '#28A745',
      'Legal Expert': '#007BFF',
      'Citizen': '#6C757D'
    };
    return colors[role] || '#6C757D';
  };

  return (
    <div className="container">
      <h1 className="text-center" style={{ color: 'var(--navy-blue)', marginBottom: '2rem' }}>
        Admin Dashboard
      </h1>

      {message && (
        <div className={message.includes('successful') ? 'success-message' : 'error-message'}>
          {message}
        </div>
      )}

      {/* Statistics Cards */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3 className="card-title">Total Users</h3>
          <p className="card-content" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--saffron)' }}>
            {users.length}
          </p>
        </div>
        <div className="dashboard-card">
          <h3 className="card-title">Educators</h3>
          <p className="card-content" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--green)' }}>
            {users.filter(u => u.role === 'Educator').length}
          </p>
        </div>
        <div className="dashboard-card">
          <h3 className="card-title">Legal Experts</h3>
          <p className="card-content" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--navy-blue)' }}>
            {users.filter(u => u.role === 'Legal Expert').length}
          </p>
        </div>
        <div className="dashboard-card">
          <h3 className="card-title">Citizens</h3>
          <p className="card-content" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--gray)' }}>
            {users.filter(u => u.role === 'Citizen').length}
          </p>
        </div>
      </div>

      {/* User Management */}
      <div className="dashboard-card" style={{ marginTop: '2rem' }}>
        <h3 className="card-title">User Management</h3>
        <div className="user-list">
          {users.length === 0 ? (
            <div className="text-center" style={{ padding: '2rem', color: 'var(--gray)' }}>
              No users registered yet
            </div>
          ) : (
            users.map(user => (
              <div key={user.id} className="user-item">
                <div className="user-details-item">
                  <div className="user-name-item">{user.name}</div>
                  <div className="user-email-item">{user.email}</div>
                </div>
                <div className="user-role-item" style={{ backgroundColor: getRoleColor(user.role) + '20', color: getRoleColor(user.role) }}>
                  {user.role}
                </div>
                <div className="user-actions">
                  <button 
                    className="edit-btn"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div className="form-container" style={{ margin: '1rem', maxWidth: '500px' }}>
            <h3 className="form-title">Edit User</h3>
            <form onSubmit={handleUpdateUser}>
              <div className="form-group">
                <label htmlFor="edit-name">Name</label>
                <input
                  type="text"
                  id="edit-name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-email">Email</label>
                <input
                  type="email"
                  id="edit-email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-role">Role</label>
                <select
                  id="edit-role"
                  value={editForm.role}
                  onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                  required
                >
                  <option value="Citizen">Citizen</option>
                  <option value="Educator">Educator</option>
                  <option value="Legal Expert">Legal Expert</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="submit-btn" style={{ flex: 1 }}>
                  Update User
                </button>
                <button 
                  type="button" 
                  onClick={handleCancelEdit}
                  className="submit-btn" 
                  style={{ 
                    flex: 1, 
                    backgroundColor: 'var(--gray)',
                    color: 'var(--white)'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;


