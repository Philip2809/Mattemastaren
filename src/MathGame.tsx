// Matematikspel
import { useState } from 'react';
import { createRandomExercise, checkAnswer } from './exercises';
import './Home.css';

function MathGame() {
  const [currentExercise, setCurrentExercise] = useState<any>(null);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  // Skapa ny uppgift
  function newExercise(category: any = null, difficulty: any = null) {
    try {
      const exercise = createRandomExercise(category, difficulty);
      setCurrentExercise(exercise);
      setStudentAnswer('');
      setFeedback('');
      setShowHints(false);
      setStartTime(Date.now());
    } catch (error) {
      setFeedback('Något gick fel när uppgiften skapades');
    }
  }

  // Kolla svaret
  function checkStudentAnswer() {
    if (!currentExercise || !studentAnswer.trim()) {
      setFeedback('Du måste skriva ett svar först!');
      return;
    }

    let answer: any = studentAnswer;
    
    if (currentExercise.category === 'ordering') {
      answer = studentAnswer.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    } else {
      answer = parseInt(studentAnswer);
    }

    const isCorrect = checkAnswer(currentExercise, answer);
    const timeSpent = Math.floor((Date.now() - (startTime || 0)) / 1000);
    
    setTotalQuestions(totalQuestions + 1);
    
    if (isCorrect) {
      let points = currentExercise.points;
      
      if (timeSpent <= currentExercise.timeLimit / 2) {
        points = Math.floor(points * 1.5);
        setFeedback(`Bra jobbat! Snabbt på ${timeSpent}s! (+${points} poäng med bonus)`);
      } else if (timeSpent <= currentExercise.timeLimit) {
        setFeedback(`Rätt svar! Du löste det på ${timeSpent} sekunder (+${points} poäng)`);
      } else {
        points = Math.floor(points * 0.8);
        setFeedback(`Rätt svar, men försök vara snabbare (+${points} poäng)`);
      }
      
      setScore(score + points);
    } else {
      const correctAnswer = Array.isArray(currentExercise.correctAnswer) 
        ? currentExercise.correctAnswer.join(', ')
        : currentExercise.correctAnswer;
      setFeedback(`Fel svar. Det rätta svaret är: ${correctAnswer}. Försök igen!`);
    }
  }

  // Växla tips
  function toggleHints() {
    setShowHints(!showHints);
  }

  const successRate = totalQuestions > 0 ? Math.round((score / (totalQuestions * 20)) * 100) : 0;

  return (
    <div className="app-container">
      <div className="header">
        <h1 className="title">Mattemästaren</h1>
        <p className="subtitle">Träna matte på ett roligt sätt!</p>
      </div>

      <div className="button-container">
        <button onClick={() => newExercise()} className="btn btn-primary">
          Slumpmässig uppgift
        </button>
        <button onClick={() => newExercise('addition', 'easy')} className="btn btn-success">
          Lätt addition
        </button>
        <button onClick={() => newExercise('multiplication', 'medium')} className="btn btn-warning">
          Medel gånger
        </button>
        <button onClick={() => newExercise('mixed', 'medium')} className="btn btn-info">
          Blandad räkning
        </button>
      </div>

      {currentExercise && (
        <div className="exercise-card">
          <div className="exercise-header">
            <h2 className="exercise-title">
              {currentExercise.title}
            </h2>
            
            <div className="exercise-meta">
              <span className={`meta-badge category-${currentExercise.category}`}>
                {currentExercise.category}
              </span>
              <span className={`meta-badge difficulty-${currentExercise.difficulty}`}>
                {currentExercise.difficulty}
              </span>
            </div>
            
            <p className="description-text">{currentExercise.description}</p>
          </div>

          <div className="question-section">
            <p className="question-text">{currentExercise.question}</p>
          </div>

          <div className="answer-section">
            <input
              type="text"
              value={studentAnswer}
              onChange={(e) => setStudentAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkStudentAnswer()}
              placeholder={currentExercise.category === 'ordering' ? 'Skriv tal separerade med komma' : 'Skriv ditt svar här...'}
              className="answer-input"
            />
            <button onClick={checkStudentAnswer} className="btn btn-primary">
              Kontrollera svar
            </button>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <button onClick={toggleHints} className="btn btn-hint">
              {showHints ? 'Dölj tips' : 'Visa tips'}
            </button>
          </div>

          {showHints && (
            <div className="hints-section">
              <h3 className="hints-title">
                Tips som kan hjälpa dig:
              </h3>
              <ul className="hints-list">
                {currentExercise.tips.map((tip: any, index: number) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Tidsgräns</div>
              <div className="info-value">{currentExercise.timeLimit}s</div>
            </div>
            <div className="info-item">
              <div className="info-label">Poäng</div>
              <div className="info-value">{currentExercise.points}</div>
            </div>
          </div>
        </div>
      )}

      {feedback && (
        <div className={`feedback ${feedback.includes('Fel svar') ? 'feedback-error' : 'feedback-success'}`}>
          {feedback}
        </div>
      )}

      {totalQuestions > 0 && (
        <div className="info-section">
          <h3 className="info-title">
            Din statistik
          </h3>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Totala poäng</div>
              <div className="info-value">{score}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Uppgifter gjorda</div>
              <div className="info-value">{totalQuestions}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Framgång</div>
              <div className="info-value">{successRate}%</div>
            </div>
            <div className="info-item">
              <div className="info-label">Genomsnitt per uppgift</div>
              <div className="info-value">{Math.round(score / totalQuestions)} poäng</div>
            </div>
          </div>
        </div>
      )}

      {!currentExercise && (
        <div className="exercise-card">
          <div style={{ textAlign: 'center' }}>
            <h2>Välkommen till Mattemästaren!</h2>
            <p style={{ fontSize: '1.2rem', color: '#666', margin: '20px 0' }}>
              Välj en knapp ovan för att börja träna matematik. 
              Systemet har 10 olika typer av uppgifter med olika svårighetsgrader.
            </p>
            <p style={{ color: '#888' }}>
              Klicka på "Slumpmässig uppgift" för att börja, eller välj en specifik typ.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MathGame;
