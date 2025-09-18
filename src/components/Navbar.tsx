import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { userService } from '../fake-backend/user';

interface NavbarProps {
    currentPage: string;
}

function Navbar({ currentPage }: NavbarProps) {
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
                        className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
                        onClick={() => navigate('/home')}
                    >
                        Hem
                    </button>

                    <button
                        className={`nav-button ${currentPage === 'exercises' ? 'active' : ''}`}
                        onClick={() => navigate('/exercises')}
                    >
                        Uppgifter
                    </button>

                    <button
                        className={`nav-button ${currentPage === 'statistics' ? 'active' : ''}`}
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
