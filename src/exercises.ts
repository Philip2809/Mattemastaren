
const exercises = [
  {
    id: 1,
    title: "Lätt Addition",
    category: "addition", 
    difficulty: "easy",
    description: "Räkna ihop två små tal",
    minNum1: 1,
    maxNum1: 10,
    minNum2: 1, 
    maxNum2: 10,
    operation: "+",
    bonusTime: 30,
    penaltyTime: 60,
    points: 10,
    tips: ["Räkna på fingrarna om du behöver", "Addition betyder att lägga ihop"]
  },
  {
    id: 2,
    title: "Lätt Subtraktion", 
    category: "subtraction",
    difficulty: "easy",
    description: "Dra ifrån ett mindre tal från ett större",
    minNum1: 5,
    maxNum1: 20,
    minNum2: 1,
    maxNum2: 10,
    operation: "-",
    bonusTime: 30,
    penaltyTime: 60,
    points: 10,
    tips: ["Subtraktion betyder att ta bort", "Räkna bakåt från det första talet"]
  },
  {
    id: 3,
    title: "Liten Gångertabell",
    category: "multiplication", 
    difficulty: "easy",
    description: "Gångertabellen 1-5",
    minNum1: 1,
    maxNum1: 5,
    minNum2: 1,
    maxNum2: 5,
    operation: "*",
    bonusTime: 45,
    penaltyTime: 90,
    points: 15,
    tips: ["3 × 4 är samma som 3 + 3 + 3 + 3", "Lär dig tabellerna utantill"]
  },
  {
    id: 4,
    title: "Enkel Division",
    category: "division",
    difficulty: "easy", 
    description: "Dela tal som går jämnt upp",
    numbers: [
      [4, 2], [6, 2], [6, 3], [8, 2], [8, 4], [9, 3], 
      [10, 2], [10, 5], [12, 3], [12, 4], [14, 2], [15, 3], [15, 5], [16, 4], [18, 2], [18, 3], [20, 4], [20, 5]
    ],
    operation: "/",
    bonusTime: 45,
    penaltyTime: 90,
    points: 15,
    tips: ["Division är motsatsen till multiplikation", "Vilket tal gånger divisorn blir lika med det första talet?"]
  },
  {
    id: 5,
    title: "Större Addition",
    category: "addition",
    difficulty: "medium",
    description: "Addition med större tal",
    minNum1: 15,
    maxNum1: 50, 
    minNum2: 15,
    maxNum2: 50,
    operation: "+",
    bonusTime: 60,
    penaltyTime: 120,
    points: 20,
    tips: ["Dela upp i tior och ental", "23 + 17 = (20+10) + (3+7) = 40"]
  },
  {
    id: 6,
    title: "Större Subtraktion", 
    category: "subtraction",
    difficulty: "medium",
    description: "Subtraktion med större tal",
    minNum1: 25,
    maxNum1: 100,
    minNum2: 10,
    maxNum2: 40,
    operation: "-",
    bonusTime: 60,
    penaltyTime: 120,
    points: 20,
    tips: ["Dela upp i tior och ental", "Kom ihåg att 1 tiotal = 10 ental när du lånar"]
  },
  {
    id: 7,
    title: "Stor Gångertabell",
    category: "multiplication",
    difficulty: "medium", 
    description: "Gångertabellen 6-10",
    minNum1: 6,
    maxNum1: 10,
    minNum2: 1,
    maxNum2: 10,
    operation: "*",
    bonusTime: 45,
    penaltyTime: 90,
    points: 25,
    tips: ["Lär dig tabellerna utantill", "9 × 7 = 9 × (10-3) = 90-27 = 63"]
  },
  {
    id: 8,
    title: "Blandad Räkning",
    category: "mixed",
    difficulty: "medium",
    description: "Addition och subtraktion tillsammans",
    minNum1: 10,
    maxNum1: 30,
    minNum2: 5,
    maxNum2: 20,
    minNum3: 3,
    maxNum3: 15,
    operation: "mixed", 
    bonusTime: 75,
    penaltyTime: 150,
    points: 30,
    tips: ["Räkna från vänster till höger", "Först plus, sedan minus"]
  },
  {
    id: 9,
    title: "Vilket tal är störst?",
    category: "comparison",
    difficulty: "easy",
    description: "Jämför tre tal",
    minNum1: 1,
    maxNum1: 50,
    minNum2: 1, 
    maxNum2: 50,
    minNum3: 1,
    maxNum3: 50,
    operation: "max",
    bonusTime: 30,
    penaltyTime: 60,
    points: 15,
    tips: ["Jämför talen ett i taget", "Titta först på antalet siffror, sedan första siffran"]
  },
  {
    id: 10,
    title: "Sortera tal",
    category: "ordering",
    difficulty: "medium",
    description: "Ordna fyra tal från minst till störst", 
    minNum1: 1,
    maxNum1: 50,
    minNum2: 1,
    maxNum2: 50,
    minNum3: 1,
    maxNum3: 50,
    minNum4: 1,
    maxNum4: 50,
    operation: "sort",
    bonusTime: 90,
    penaltyTime: 180,
    points: 35,
    tips: ["Börja med att hitta det minsta talet", "Jämför talen två och två"]
  }
];

// Enkel funktion för att slumpa tal mellan min och max
function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function createRandomExercise(category = null, difficulty = null) {

  let availableExercises = exercises;
  
  if (category) {
    availableExercises = availableExercises.filter(ex => ex.category === category);
  }
  
  if (difficulty) {
    availableExercises = availableExercises.filter(ex => ex.difficulty === difficulty);
  }
  
  const exercise = availableExercises[Math.floor(Math.random() * availableExercises.length)];
  
  let num1, num2, num3, num4;
  let question, correctAnswer;
  
  if (exercise.operation === "/") {
    const randomPair = exercise.numbers![Math.floor(Math.random() * exercise.numbers!.length)];
    num1 = randomPair[0];
    num2 = randomPair[1];
    question = `Vad är ${num1} ÷ ${num2}?`;
    correctAnswer = num1 / num2;
  } 
  else if (exercise.operation === "mixed") {
    num1 = randomBetween(exercise.minNum1!, exercise.maxNum1!);
    num2 = randomBetween(exercise.minNum2!, exercise.maxNum2!);
    num3 = randomBetween(exercise.minNum3!, exercise.maxNum3!);
    question = `Vad är ${num1} + ${num2} - ${num3}?`;
    correctAnswer = num1 + num2 - num3;
  }
  else if (exercise.operation === "max") {
    num1 = randomBetween(exercise.minNum1!, exercise.maxNum1!);
    num2 = randomBetween(exercise.minNum2!, exercise.maxNum2!);
    num3 = randomBetween(exercise.minNum3!, exercise.maxNum3!);
    question = `Vilket tal är störst: ${num1}, ${num2} eller ${num3}?`;
    correctAnswer = Math.max(num1, num2, num3);
  }
  else if (exercise.operation === "sort") {
    num1 = randomBetween(exercise.minNum1!, exercise.maxNum1!);
    num2 = randomBetween(exercise.minNum2!, exercise.maxNum2!);
    num3 = randomBetween(exercise.minNum3!, exercise.maxNum3!);
    num4 = randomBetween(exercise.minNum4!, exercise.maxNum4!);
    question = `Ordna dessa tal från minst till störst: ${num1}, ${num2}, ${num3}, ${num4}`;
    correctAnswer = [num1, num2, num3, num4].sort((a, b) => a - b);
  }
  else {
    num1 = randomBetween(exercise.minNum1!, exercise.maxNum1!);
    num2 = randomBetween(exercise.minNum2!, exercise.maxNum2!);
    
    if (exercise.operation === "+") {
      question = `Vad är ${num1} + ${num2}?`;
      correctAnswer = num1 + num2;
    } else if (exercise.operation === "-") {
      question = `Vad är ${num1} - ${num2}?`;
      correctAnswer = num1 - num2;
    } else if (exercise.operation === "*") {
      question = `Vad är ${num1} × ${num2}?`;
      correctAnswer = num1 * num2;
    }
  }
  
  return {
    id: exercise.id,
    title: exercise.title,
    category: exercise.category,
    difficulty: exercise.difficulty,
    description: exercise.description,
    question: question,
    correctAnswer: correctAnswer,
    bonusTime: exercise.bonusTime,
    penaltyTime: exercise.penaltyTime,
    points: exercise.points,
    tips: exercise.tips,
    numbers: { num1, num2, num3, num4 } 
  };
}

function checkAnswer(exercise: any, studentAnswer: any) {
  if (exercise.category === "ordering") {

    if (!Array.isArray(studentAnswer)) return false;
    return JSON.stringify(studentAnswer) === JSON.stringify(exercise.correctAnswer);
  } else {

    return parseInt(studentAnswer) === exercise.correctAnswer;
  }
}


const categories = {
    "addition": { name: "Addition", icon: "➕", color: "#4CAF50" },
    "subtraction": { name: "Subtraktion", icon: "➖", color: "#FF9800" },
    "multiplication": { name: "Multiplikation", icon: "✖️", color: "#2196F3" },
    "division": { name: "Division", icon: "➗", color: "#9C27B0" },
    "mixed": { name: "Blandad räkning", icon: "", color: "#607D8B" },
    "comparison": { name: "Jämförelse", icon: "", color: "#795548" },
    "ordering": { name: "Ordning", icon: "", color: "#E91E63" }
};

const difficulties = {
    "easy": { name: "Lätt", color: "#4CAF50" },
    "medium": { name: "Medel", color: "#FF9800" },
    "hard": { name: "Svår", color: "#F44336" }
};

export { exercises, createRandomExercise, checkAnswer, categories, difficulties };
