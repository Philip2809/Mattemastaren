import { useState } from 'react';
import ExerciseTimer from './ExerciseTimer';
import { createRandomExercise } from '../exercises';
import './ExerciseDemo.css';

function ExerciseDemo() {
    const [currentExercise, setCurrentExercise] = useState<any>(null);
    const [studentAnswer, setStudentAnswer] = useState('');
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [timeStatus, setTimeStatus] = useState<'bonus' | 'normal' | 'penalty'>('bonus');
    const [elapsedTime, setElapsedTime] = useState(0);
    const [feedback, setFeedback] = useState('');

    const startNewExercise = () => {
        const exercise = createRandomExercise();
        setCurrentExercise(exercise);
        setStudentAnswer('');
        setFeedback('');
        setIsTimerRunning(true);
        setElapsedTime(0);
        setTimeStatus('bonus');
    };

    const handleTimeUpdate = (time: number, status: 'bonus' | 'normal' | 'penalty') => {
        setElapsedTime(time);
        setTimeStatus(status);
    };

    const submitAnswer = () => {
        if (!currentExercise) return;
        
        setIsTimerRunning(false);
        
        const isCorrect = parseInt(studentAnswer) === currentExercise.correctAnswer;
        
        // Beräkna poäng baserat på tid och korrekthet
        let points = 0;
        if (isCorrect) {
            points = currentExercise.points;
            
            // Justera poäng baserat på tidsstatus
            if (timeStatus === 'bonus') {
                points = Math.floor(points * 1.5); // 50% bonus
            } else if (timeStatus === 'penalty') {
                points = Math.floor(points * 0.5); // 50% minskning
            }
        }
        
                        setFeedback(
            isCorrect 
                ? `Rätt svar! Du fick ${points} poäng (${timeStatus === 'bonus' ? 'med bonus!' : timeStatus === 'penalty' ? 'med tidsavdrag' : 'normala poäng'})`
                : `Fel svar. Rätt svar var ${currentExercise.correctAnswer}`
        );
    };

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="exercise-demo">
            <div className="demo-container">
                <h1>Mattemästaren - Demo med Timer</h1>
                <p>Testa det nya bonus- och tidssystemet!</p>
                
                {!currentExercise ? (
                    <div className="start-section">
                        <h2>Välkommen till den förbättrade versionen!</h2>
                        <div className="features">
                            <div className="feature">
                                <span className="feature-icon">🚀</span>
                                <div>
                                    <h3>Bonustid</h3>
                                    <p>Lös uppgiften snabbt för extrapoäng!</p>
                                </div>
                            </div>
                            <div className="feature">
                                <span className="feature-icon">⏰</span>
                                <div>
                                    <h3>Normal tid</h3>
                                    <p>Fortfarande tid att få normala poäng</p>
                                </div>
                            </div>
                            <div className="feature">
                                <span className="feature-icon">⚠️</span>
                                <div>
                                    <h3>Minustid</h3>
                                    <p>Färre poäng, men du kan fortfarande klara uppgiften!</p>
                                </div>
                            </div>
                        </div>
                        <button onClick={startNewExercise} className="start-demo-btn">
                            Starta Demo
                        </button>
                    </div>
                ) : (
                    <div className="exercise-section">
                        {isTimerRunning && (
                            <ExerciseTimer
                                bonusTime={currentExercise.bonusTime}
                                penaltyTime={currentExercise.penaltyTime}
                                onTimeUpdate={handleTimeUpdate}
                                isRunning={isTimerRunning}
                            />
                        )}
                        
                        <div className="exercise-card">
                            <div className="exercise-header">
                                <h2>{currentExercise.title}</h2>
                                <span className="difficulty-badge">
                                    {currentExercise.difficulty}
                                </span>
                            </div>
                            
                            <div className="exercise-content">
                                <div className="question">
                                    <h3>{currentExercise.question}</h3>
                                </div>
                                
                                {isTimerRunning ? (
                                    <div className="answer-section">
                                        <input
                                            type="number"
                                            value={studentAnswer}
                                            onChange={(e) => setStudentAnswer(e.target.value)}
                                            placeholder="Ditt svar..."
                                            className="answer-input"
                                            autoFocus
                                        />
                                        <button 
                                            onClick={submitAnswer}
                                            disabled={!studentAnswer}
                                            className="submit-btn"
                                        >
                                            Svara
                                        </button>
                                    </div>
                                ) : (
                                    <div className="results-section">
                                        <div className="feedback">{feedback}</div>
                                        <div className="time-summary">
                                            <strong>Tid: {formatTime(elapsedTime)}</strong>
                                            <br />
                                            Status: {timeStatus === 'bonus' ? '🚀 Bonustid!' : timeStatus === 'normal' ? '⏰ Normal tid' : '⚠️ Minustid'}
                                        </div>
                                        <button onClick={startNewExercise} className="next-btn">
                                            Nästa uppgift
                                        </button>
                                    </div>
                                )}
                            </div>
                            
                            <div className="exercise-info">
                                <div className="info-item">
                                    <span>Kategori:</span> {currentExercise.category}
                                </div>
                                <div className="info-item">
                                    <span>Baspoäng:</span> {currentExercise.points}
                                </div>
                                <div className="info-item">
                                    <span>Bonustid:</span> {currentExercise.bonusTime}s
                                </div>
                                <div className="info-item">
                                    <span>Minusgräns:</span> {currentExercise.penaltyTime}s
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ExerciseDemo;
