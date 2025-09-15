
import { useState } from 'react';
import './App.css'
import MathGame from './MathGame'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      
      {currentPage === 'home' && (
        <HomePage onNavigate={handleNavigate} />
      )}
      
      {currentPage === 'exercises' && (
        <MathGame />
      )}
      
      {currentPage === 'login' && (
        <LoginPage onNavigate={handleNavigate} />
      )}
      
      {currentPage === 'register' && (
        <RegisterPage onNavigate={handleNavigate} />
      )}
    </>
  )
}

export default App
