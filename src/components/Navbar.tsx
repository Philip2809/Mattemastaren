import { useNavigate } from 'react-router';
import './Navbar.css';
import { userService } from '../fake-backend/user';
import { useEffect, useState } from 'react';

function Navbar() {
    const navigate = useNavigate();

    const hasToken = userService.hasToken();
    const [classCode, setClassCode] = useState<string | null>(null);
    const [userType, setUserType] = useState<'student' | 'teacher' | 'parent' | null>(null);


    // This is not the best way to do this but it works for now, the way this should be done is via a context; but it overkill for this demo thing
    if (localStorage.getItem('userType') !== userType) {
        setClassCode(localStorage.getItem('classCode'));
        setUserType(localStorage.getItem('userType') as 'student' | 'teacher' | 'parent' || null);
    }
    useEffect(() => {
        setClassCode(localStorage.getItem('classCode'));
        setUserType(localStorage.getItem('userType') as 'student' | 'teacher' | 'parent' || null);  
    }, [localStorage.getItem('userType')]);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <img
                        src="/src/types/mattmlogo.png"
                        alt="Mattemästaren"
                        className="navbar-logo"
                        onClick={() => navigate('/exercises')}
                    />
                </div>

                {classCode && (
                    <div className="class-code" style={{ color: 'white', fontWeight: 'bold' }}>
                        Din klasskod: <strong>{classCode}</strong>
                    </div>
                )}

                <div className="navbar-menu">

                    {hasToken && (
                        <>
                            {userType === 'student' && (
                                <button
                                    className={`nav-button ${location.pathname === '/exercises' ? 'active' : ''}`}
                                    onClick={() => navigate('/exercises')}
                                >
                                    Uppgifter
                                </button>
                            )}
                            <button
                                className={`nav-button ${location.pathname === '/statistics' ? 'active' : ''}`}
                                onClick={() => navigate('/statistics')}
                            >
                                Statistik
                            </button>
                        </>
                    )}


                    <div className="navbar-auth">
                        {hasToken ? (
                            <button
                                className="auth-button logout-btn"
                                onClick={() => {
                                    localStorage.clear();
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
