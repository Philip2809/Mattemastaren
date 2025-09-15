// Exempel på hur man skulle integrera uppgiftssystemet i en fullstack-app

import { ExerciseGenerator } from '../utils/exerciseGenerator';
import type { StudentAnswer, ExerciseStats } from '../types/exercise';

/**
 * Exempel på service-klass för att hantera uppgifter i en riktig app
 */
export class ExerciseService {
  private generator: ExerciseGenerator;
  private studentAnswers: StudentAnswer[] = []; // I verkligheten: databas
  private exerciseStats: Map<string, ExerciseStats> = new Map(); // I verkligheten: databas

  constructor() {
    this.generator = new ExerciseGenerator();
  }

  /**
   * Startar en ny uppgift för en elev
   */
  startExercise(studentId: string, category?: string, difficulty?: string) {
    const exercise = this.generator.generateRandomExercise(category, difficulty);
    
    // I en riktig app: spara session i databas
    return {
      ...exercise,
      sessionId: `session_${Date.now()}_${studentId}`,
      startTime: new Date()
    };
  }

  /**
   * Hanterar elevsvar och beräknar statistik
   */
  submitAnswer(
    sessionId: string,
    exerciseId: string, 
    studentId: string, 
    answer: any, 
    timeSpent: number, 
    hintsUsed: number = 0
  ) {
    // Generera samma uppgift för validering (i verkligheten: hämta från session)
    const exercise = this.generator.generateExerciseById(exerciseId);
    const isCorrect = this.generator.validateAnswer(exercise, answer);
    
    // Beräkna poäng (reducera för tips och tid)
    let pointsEarned = isCorrect ? exercise.points : 0;
    pointsEarned = Math.max(0, pointsEarned - (hintsUsed * 2)); // -2 poäng per tips
    if (timeSpent > exercise.timeLimit) {
      pointsEarned = Math.floor(pointsEarned * 0.8); // -20% för overtime
    }

    // Spara elevsvar
    const studentAnswer: StudentAnswer = {
      exerciseId,
      studentId,
      answer,
      isCorrect,
      timeSpent,
      hintsUsed,
      timestamp: new Date(),
      pointsEarned
    };

    this.studentAnswers.push(studentAnswer);
    this.updateExerciseStats(exerciseId, studentAnswer);

    return {
      isCorrect,
      pointsEarned,
      correctAnswer: exercise.correctAnswer,
      feedback: this.generateFeedback(studentAnswer, exercise)
    };
  }

  /**
   * Uppdaterar statistik för uppgifter
   */
  private updateExerciseStats(exerciseId: string, answer: StudentAnswer) {
    let stats = this.exerciseStats.get(exerciseId);
    
    if (!stats) {
      stats = {
        exerciseId,
        totalAttempts: 0,
        correctAttempts: 0,
        averageTime: 0,
        averageHintsUsed: 0,
        successRate: 0
      };
    }

    const previousTotal = stats.totalAttempts;
    stats.totalAttempts++;
    if (answer.isCorrect) stats.correctAttempts++;

    // Beräkna nya genomsnitt
    stats.averageTime = (stats.averageTime * previousTotal + answer.timeSpent) / stats.totalAttempts;
    stats.averageHintsUsed = (stats.averageHintsUsed * previousTotal + answer.hintsUsed) / stats.totalAttempts;
    stats.successRate = stats.correctAttempts / stats.totalAttempts;

    this.exerciseStats.set(exerciseId, stats);
  }

  /**
   * Genererar feedback baserat på prestation
   */
  private generateFeedback(answer: StudentAnswer, exercise: any): string {
    if (answer.isCorrect) {
      if (answer.timeSpent <= exercise.timeLimit * 0.5) {
        return "🚀 Fantastiskt! Supersnabbt!";
      } else if (answer.timeSpent <= exercise.timeLimit) {
        return "🎉 Bra jobbat!";
      } else {
        return "✅ Rätt svar, men försök att vara snabbare nästa gång!";
      }
    } else {
      if (answer.hintsUsed === 0) {
        return "❌ Fel svar. Försök igen och använd tips om du behöver!";
      } else {
        return "❌ Fel svar. Läs tipsen igen och tänk om!";
      }
    }
  }

  /**
   * Hämtar elevstatistik för lärardashboard
   */
  getStudentProgress(studentId: string) {
    const studentAnswers = this.studentAnswers.filter(a => a.studentId === studentId);
    
    if (studentAnswers.length === 0) return null;

    const totalPoints = studentAnswers.reduce((sum, a) => sum + a.pointsEarned, 0);
    const correctAnswers = studentAnswers.filter(a => a.isCorrect).length;
    const averageTime = studentAnswers.reduce((sum, a) => sum + a.timeSpent, 0) / studentAnswers.length;
    
    // Analysera kategorier
    const categoryStats = new Map();
    studentAnswers.forEach(answer => {
      const exercise = this.generator.generateExerciseById(answer.exerciseId);
      const category = exercise.category;
      
      if (!categoryStats.has(category)) {
        categoryStats.set(category, { total: 0, correct: 0 });
      }
      
      const stats = categoryStats.get(category);
      stats.total++;
      if (answer.isCorrect) stats.correct++;
    });

    return {
      studentId,
      totalAttempts: studentAnswers.length,
      totalPoints,
      successRate: correctAnswers / studentAnswers.length,
      averageTime,
      weakestCategory: this.findWeakestCategory(categoryStats),
      strongestCategory: this.findStrongestCategory(categoryStats),
      recentActivity: studentAnswers.slice(-10), // Senaste 10 försöken
      improvement: this.calculateImprovement(studentAnswers)
    };
  }

  /**
   * Hitta kategori som eleven behöver träna mer på
   */
  private findWeakestCategory(categoryStats: Map<string, any>) {
    let weakest = null;
    let lowestRate = 1;

    for (const [category, stats] of categoryStats) {
      const rate = stats.correct / stats.total;
      if (rate < lowestRate && stats.total >= 3) { // Minst 3 försök för att vara relevant
        lowestRate = rate;
        weakest = category;
      }
    }

    return weakest;
  }

  /**
   * Hitta kategori som eleven är bäst på
   */
  private findStrongestCategory(categoryStats: Map<string, any>) {
    let strongest = null;
    let highestRate = 0;

    for (const [category, stats] of categoryStats) {
      const rate = stats.correct / stats.total;
      if (rate > highestRate && stats.total >= 3) {
        highestRate = rate;
        strongest = category;
      }
    }

    return strongest;
  }

  /**
   * Beräkna förbättring över tid
   */
  private calculateImprovement(answers: StudentAnswer[]) {
    if (answers.length < 10) return 0;

    const first5 = answers.slice(0, 5);
    const last5 = answers.slice(-5);

    const firstRate = first5.filter(a => a.isCorrect).length / first5.length;
    const lastRate = last5.filter(a => a.isCorrect).length / last5.length;

    return lastRate - firstRate; // Positiv = förbättring, negativ = försämring
  }

  /**
   * Hämtar klassstatistik för lärare
   */
  getClassStats(studentIds: string[]) {
    const classAnswers = this.studentAnswers.filter(a => studentIds.includes(a.studentId));
    
    // Aggregera data per elev
    const studentProgress = studentIds.map(id => this.getStudentProgress(id)).filter(p => p !== null);
    
    // Hitta elever som behöver extra hjälp
    const studentsNeedingHelp = studentProgress
      .filter(p => p.successRate < 0.6 || p.improvement < -0.1)
      .sort((a, b) => a.successRate - b.successRate);

    // Hitta svåraste uppgifter
    const exerciseStats = Array.from(this.exerciseStats.values())
      .filter(s => s.totalAttempts >= 5)
      .sort((a, b) => a.successRate - b.successRate);

    return {
      totalStudents: studentIds.length,
      activeStudents: studentProgress.length,
      averageClassSuccessRate: studentProgress.reduce((sum, p) => sum + p.successRate, 0) / studentProgress.length,
      studentsNeedingHelp,
      difficultExercises: exerciseStats.slice(0, 5),
      topPerformers: studentProgress
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .slice(0, 5)
    };
  }
}

// Exempel på användning i en React-komponent
/*
export const TeacherDashboard: React.FC = () => {
  const [classStats, setClassStats] = useState(null);
  const exerciseService = new ExerciseService();

  useEffect(() => {
    // Hämta klasslista från backend/kontext
    const studentIds = ['student1', 'student2', 'student3'];
    const stats = exerciseService.getClassStats(studentIds);
    setClassStats(stats);
  }, []);

  return (
    <div>
      {classStats && (
        <>
          <h2>Klassöversikt</h2>
          <p>Framgångsfrekvens: {(classStats.averageClassSuccessRate * 100).toFixed(1)}%</p>
          
          <h3>Elever som behöver hjälp:</h3>
          {classStats.studentsNeedingHelp.map(student => (
            <div key={student.studentId}>
              {student.studentId}: {(student.successRate * 100).toFixed(1)}% framgång
              Svagaste område: {student.weakestCategory}
            </div>
          ))}
          
          <h3>Svåraste uppgifter:</h3>
          {classStats.difficultExercises.map(exercise => (
            <div key={exercise.exerciseId}>
              {exercise.exerciseId}: {(exercise.successRate * 100).toFixed(1)}% framgång
            </div>
          ))}
        </>
      )}
    </div>
  );
};
*/
