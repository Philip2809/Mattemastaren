// Login sida - backend kommer att läggas till senare
import { useState } from 'react';
import './AuthPages.css';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

function LoginPage({ onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Backend integration kommer här / för Phillip
    console.log('Login attempt:', { email, password });
    alert('Login funktionalitet kommer att implementeras senare!');
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
            <label htmlFor="email">E-postadress:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="din.email@exempel.se"
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
            onClick={() => onNavigate('register')}
          >
            Registrera dig här
          </button>
        </div>

        <div className="back-home">
          <button 
            className="back-button"
            onClick={() => onNavigate('home')}
          >
            ← Tillbaka till startsidan
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
