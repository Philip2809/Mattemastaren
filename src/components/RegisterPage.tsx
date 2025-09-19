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
  const [parentUsername, setParentUsername] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Lösenorden matchar inte!');
      return;
    }

    userService.register({ 
        name: firstName + ' ' + lastName, 
        username, 
        password: password,
        type: userType as 'student' | 'teacher' | 'parent',
        classCode: userType === 'student' ? classCode : userType === 'teacher' ? Math.random().toString(36).slice(2, 8).toUpperCase() : undefined,
        parentUsername: userType === 'student' ? parentUsername : undefined
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
                placeholder={userType === 'student' ? "Kalle" : userType === 'teacher' ? "Fru" : "Kvacke"}
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
                placeholder={userType === 'student' ? "Anka" : userType === 'teacher' ? "Näbblund" : "Anka"}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username">Användarnamn:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={userType === 'student' ? "kalle.anka" : userType === 'teacher' ? "fru.nabblund" : "kvacke.anka"}
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
                <label htmlFor="parentUsername">Förälders användarnamn (valfritt):</label>
                <input
                  type="text"
                  id="parentUsername"
                  value={parentUsername}
                  onChange={(e) => setParentUsername(e.target.value)}
                  placeholder="kvacke.anka"
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

export default RegisterPage;
