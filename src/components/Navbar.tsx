import './Navbar.css';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

function Navbar({ currentPage, onNavigate }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <img 
            src="/src/types/mattmlogo.png" 
            alt="Mattemästaren" 
            className="navbar-logo"
            onClick={() => onNavigate('home')}
          />
        </div>
        
        <div className="navbar-menu">
          <button 
            className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            Hem
          </button>
          
          <button 
            className={`nav-button ${currentPage === 'exercises' ? 'active' : ''}`}
            onClick={() => onNavigate('exercises')}
          >
            Uppgifter
          </button>
          
          <div className="navbar-auth">
            <button 
              className="auth-button login-btn"
              onClick={() => onNavigate('login')}
            >
              Logga in
            </button>
            <button 
              className="auth-button register-btn"
              onClick={() => onNavigate('register')}
            >
              Registrera
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
