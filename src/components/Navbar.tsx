import { useNavigate } from 'react-router';
import './Navbar.css';
import { userService } from '../fake-backend/user';

function Navbar() {
    const navigate = useNavigate();

    const hasToken = userService.hasToken();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <img
                        src="/src/types/mattmlogo.png"
                        alt="Mattemästaren"
                        className="navbar-logo"
                        onClick={() => navigate('/home')}
                    />
                </div>

                <div className="navbar-menu">
                    <button
                        className={`nav-button ${location.pathname === '/home' ? 'active' : ''}`}
                        onClick={() => navigate('/home')}
                    >
                        Hem
                    </button>

                    <button
                        className={`nav-button ${location.pathname === '/exercises' ? 'active' : ''}`}
                        onClick={() => navigate('/exercises')}
                    >
                        Uppgifter
                    </button>

                    <button
                        className={`nav-button ${location.pathname === '/statistics' ? 'active' : ''}`}
                        onClick={() => navigate('/statistics')}
                    >
                        Statistik
                    </button>


                    <div className="navbar-auth">
                        {hasToken ? (
                            <button
                                    className="auth-button logout-btn"
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        navigate('/login')
                                    }}
                                >
                                    Logga out
                                </button>
                        ) : (
                            <>
                                <button
                                    className="auth-button login-btn"
                                    onClick={() => navigate('/login')}
                                >
                                    Logga in
                                </button>
                                <button
                                    className="auth-button register-btn"
                                    onClick={() => navigate('/register')}
                                >
                                    Registrera
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
