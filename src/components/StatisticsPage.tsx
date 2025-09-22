import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { exercises, categories, difficulties } from '../exercises';
import './StatisticsPage.css';
import { exercisesService } from '../fake-backend/exercises';

interface ExerciseResult {
    exerciseId: string;
    correct: boolean;
    timeSpent: number;
    points: number;
    ended: number;
}

interface UserStats {
    [username: string]: ExerciseResult[];
}

interface DifficultyStats {
    easy: { total: number; correct: number };
    medium: { total: number; correct: number };
    hard: { total: number; correct: number };
}

interface CategoryStats {
    [category: string]: { total: number; correct: number; points: number };
}

function StatisticsPage() {
    const navigate = useNavigate();
    const [userStats, setUserStats] = useState<UserStats>({});
    const [currentUser, setCurrentUser] = useState<string>('');
    const [availableUsers, setAvailableUsers] = useState<string[]>([]);
    const currentUserType = localStorage.getItem('userType');

    useEffect(() => {
        exercisesService.getStatsData(localStorage.getItem('token') || '').then(res => {
            setUserStats(res);
            const users = Object.keys(res);
            setAvailableUsers(users);
            setCurrentUser(users[0] || '');
        });
    }, []);

    const calculateDifficultyStats = (results: ExerciseResult[]): DifficultyStats => {
        const stats: DifficultyStats = {
            easy: { total: 0, correct: 0 },
            medium: { total: 0, correct: 0 },
            hard: { total: 0, correct: 0 }
        };

        results.forEach(result => {
            const exercise = exercises.find(ex => ex.id.toString() === result.exerciseId.toString());
            if (exercise) {
                const difficulty = exercise.difficulty as keyof DifficultyStats;
                stats[difficulty].total++;
                if (result.correct) {
                    stats[difficulty].correct++;
                }
            }
        });

        return stats;
    };

    const calculateCategoryStats = (results: ExerciseResult[]): CategoryStats => {
        const stats: CategoryStats = {};

        results.forEach(result => {
            const exercise = exercises.find(ex => ex.id.toString() === result.exerciseId.toString());
            if (exercise) {
                const category = exercise.category;
                if (!stats[category]) {
                    stats[category] = { total: 0, correct: 0, points: 0 };
                }
                stats[category].total++;
                stats[category].points += result.points;
                if (result.correct) {
                    stats[category].correct++;
                }
            }
        });
        return stats;
    };

    const calculateOverallStats = (results: ExerciseResult[]) => {
        const totalExercises = results.length;
        const correctAnswers = results.filter(r => r.correct).length;
        const totalPoints = results.reduce((sum, r) => sum + r.points, 0);
        const averageTime = results.reduce((sum, r) => sum + r.timeSpent, 0) / totalExercises;
        const successRate = totalExercises > 0 ? (correctAnswers / totalExercises) * 100 : 0;

        return {
            totalExercises,
            correctAnswers,
            totalPoints,
            averageTime: Math.round(averageTime),
            successRate: Math.round(successRate * 10) / 10
        };
    };

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
    };

    const getDifficultyColor = (difficulty: string): string => {
        switch (difficulty) {
            case 'easy': return '#4CAF50';
            case 'medium': return '#FF9800';
            case 'hard': return '#F44336';
            default: return '#607D8B';
        }
    };

    const getCategoryIcon = (category: string): string => {
        const categoryData = categories[category as keyof typeof categories];
        return categoryData?.icon || '📊';
    };

    if (!currentUser || !userStats[currentUser]) {
        return (
            <div className="statistics-page">
                <div className="statistics-container">
                    <h1>Din statistik</h1>
                    <p>Inga statistikdata tillgängliga. Börja lösa uppgifter för att se din progress!</p>
                    <button onClick={() => navigate('/exercises')} className="start-button">
                        Börja med uppgifter
                    </button>
                </div>
            </div>
        );
    }

    const userResults = userStats[currentUser];
    const difficultyStats = calculateDifficultyStats(userResults);
    const categoryStats = calculateCategoryStats(userResults);
    const overallStats = calculateOverallStats(userResults);

    return (
        <div className="statistics-page">
            <div className="statistics-container">
                <div className="statistics-header">
                    <h1>{currentUserType === 'student' && 'Din statistik, '}{currentUser}</h1>
                    <p>{currentUserType === 'student' ? 
                        'Här ser du din progress i Mattemästaren' : 
                        currentUserType === 'teacher' ? 
                        'Här ser du din elevs progress i Mattemästaren' :
                        'Här ser du ditt barns progress i Mattemästaren'}</p>
                    
                    {(currentUserType === 'teacher' || currentUserType === 'parent') && availableUsers.length > 1 && (
                        <div className="user-selector">
                            <label htmlFor="user-select">Välj elev:</label>
                            <select 
                                id="user-select"
                                value={currentUser} 
                                onChange={(e) => setCurrentUser(e.target.value)}
                                className="user-select"
                            >
                                {availableUsers.map(user => (
                                    <option key={user} value={user}>{user}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* Översikt */}
                <div className="stats-section">
                    <h2>Översikt</h2>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-content">
                                <div className="stat-number">{overallStats.totalExercises}</div>
                                <div className="stat-label">Totala uppgifter</div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-content">
                                <div className="stat-number">{overallStats.correctAnswers}</div>
                                <div className="stat-label">Rätta svar</div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-content">
                                <div className="stat-number">{overallStats.totalPoints}</div>
                                <div className="stat-label">Totala poäng</div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-content">
                                <div className="stat-number">{overallStats.successRate}%</div>
                                <div className="stat-label">Framgång</div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-content">
                                <div className="stat-number">{formatTime(overallStats.averageTime)}</div>
                                <div className="stat-label">Snitt per uppgift</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Svårighetsgrad */}
                <div className="stats-section">
                    <h2>Prestanda per svårighetsgrad</h2>
                    <div className="difficulty-stats">
                        {Object.entries(difficultyStats).map(([difficulty, stats]) => {
                            const successRate = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;
                            return (
                                <div key={difficulty} className="difficulty-card">
                                    <div
                                        className="difficulty-header"
                                        style={{ backgroundColor: getDifficultyColor(difficulty) }}
                                    >
                                        <h3>{difficulties[difficulty as keyof typeof difficulties]?.name || difficulty}</h3>
                                    </div>
                                    <div className="difficulty-content">
                                        <p>Du har gjort <strong>{stats.total}</strong> uppgifter med {difficulty} svårighetsgrad</p>
                                        <p>Du har klarat av <strong>{stats.correct}</strong> av dem</p>
                                        <div className="progress-bar">
                                            <div
                                                className="progress-fill"
                                                style={{
                                                    width: `${successRate}%`,
                                                    backgroundColor: getDifficultyColor(difficulty)
                                                }}
                                            ></div>
                                        </div>
                                        <p className="success-rate">{Math.round(successRate)}% framgång</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Kategorier */}
                <div className="stats-section">
                    <h2>Prestanda per kategori</h2>
                    <div className="category-stats">
                        {Object.entries(categoryStats).map(([category, stats]) => {
                            const successRate = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;
                            const categoryData = categories[category as keyof typeof categories];

                            return (
                                <div key={category} className="category-card">
                                    <div className="category-header">
                                        <span className="category-icon">{getCategoryIcon(category)}</span>
                                        <h3>{categoryData?.name || category}</h3>
                                    </div>
                                    <div className="category-content">
                                        <div className="category-stats-row">
                                            <span>Uppgifter:</span>
                                            <span><strong>{stats.correct}</strong> / {stats.total}</span>
                                        </div>
                                        <div className="category-stats-row">
                                            <span>Poäng:</span>
                                            <span><strong>{stats.points}</strong></span>
                                        </div>
                                        <div className="category-stats-row">
                                            <span>Framgång:</span>
                                            <span><strong>{Math.round(successRate)}%</strong></span>
                                        </div>
                                        <div className="progress-bar">
                                            <div
                                                className="progress-fill"
                                                style={{
                                                    width: `${successRate}%`,
                                                    backgroundColor: categoryData?.color || '#607D8B'
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="statistics-actions">
                    <button onClick={() => navigate('/exercises')} className="continue-button">
                        Fortsätt öva
                    </button>
                    {/* <button onClick={() => navigate('/home')} className="home-button">
                        Tillbaka hem
                    </button> */}
                </div>
            </div>
        </div>
    );
}

export default StatisticsPage;
