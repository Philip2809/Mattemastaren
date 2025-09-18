// Login sida - backend kommer att läggas till senare
import { useState } from 'react';
import './AuthPages.css';
import { useNavigate } from 'react-router';
import { userService } from '../fake-backend/user';

function LoginPage() {
  const navigate = useNavigate();
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    userService.login(userName, password).then(res => {
        if (!res) {
            alert('Fel inloggning, försök igen!');
            return;
        }

        // Res is then token
        localStorage.setItem("token", res);
        navigate('/exercises');
    })
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Logga in</h1>
          <p>Välkommen tillbaka till Mattemästaren!</p>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Användarnamn:</label>
            <input
              type="text"
              id="username"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="kalle.anka"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Lösenord:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ange ditt lösenord"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="auth-button login-button">
              Logga in
            </button>
            
            <div className="auth-links">
              <a href="#" className="forgot-link">Glömt lösenord?</a>
            </div>
          </div>
        </form>

        <div className="auth-footer">
          <p>Har du inget konto än?</p>
          <button 
            className="link-button"
            onClick={() => navigate('/register')}
          >
            Registrera dig här
          </button>
        </div>

        {/* <div className="back-home">
          <button 
            className="back-button"
            onClick={() => navigate('/home')}
          >
            ← Tillbaka till startsidan
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default LoginPage;
