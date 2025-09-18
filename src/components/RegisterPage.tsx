// Register sida - backend kommer att läggas till senare
import { useState } from 'react';
import './AuthPages.css';
import { useNavigate } from 'react-router';
import { userService } from '../fake-backend/user';


function RegisterPage() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('student');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [classCode, setClassCode] = useState('');
  const [parentEmail, setParentEmail] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Backend integration kommer här / för Phillip
    console.log('Register attempt:', { 
      userType, firstName, lastName, email: username, password, classCode, parentEmail 
    });
    
    if (password !== confirmPassword) {
      alert('Lösenorden matchar inte!');
      return;
    }

    userService.register({ 
        name: firstName + ' ' + lastName, 
        username, 
        password: password
    }).then(() => navigate('/login'));
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Skapa konto</h1>
          <p>Gå med i Mattemästaren idag!</p>
        </div>

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label>Jag är en:</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  value="student"
                  checked={userType === 'student'}
                  onChange={(e) => setUserType(e.target.value)}
                />
                Elev
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  value="teacher"
                  checked={userType === 'teacher'}
                  onChange={(e) => setUserType(e.target.value)}
                />
                Lärare
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  value="parent"
                  checked={userType === 'parent'}
                  onChange={(e) => setUserType(e.target.value)}
                />
                Förälder
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Förnamn:</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ditt förnamn"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Efternamn:</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Ditt efternamn"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username">E-postadress:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="kalle.anka"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Lösenord:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minst 6 tecken"
                required
                minLength={6}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Bekräfta lösenord:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Upprepa lösenord"
                required
                minLength={6}
              />
            </div>
          </div>

          {userType === 'student' && (
            <>
              <div className="form-group">
                <label htmlFor="classCode">Klasskod (valfritt):</label>
                <input
                  type="text"
                  id="classCode"
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value)}
                  placeholder="Ange klasskod från din lärare"
                />
              </div>

              <div className="form-group">
                <label htmlFor="parentEmail">Förälders e-post (valfritt):</label>
                <input
                  type="email"
                  id="parentEmail"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  placeholder="foralder@exempel.se"
                />
              </div>
            </>
          )}

          <div className="form-actions">
            <button type="submit" className="auth-button register-button">
              Skapa konto
            </button>
          </div>
        </form>

        <div className="auth-footer">
          <p>Har du redan ett konto?</p>
          <button 
            className="link-button"
            onClick={() => navigate('/login')}
          >
            Logga in här
          </button>
        </div>

        <div className="back-home">
          <button 
            className="back-button"
            onClick={() => navigate('/home')}
          >
            ← Tillbaka till startsidan
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
