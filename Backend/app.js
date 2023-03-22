const express = require('express');
const Redis = require('ioredis');
const cors = require('cors');
const app = express();
app.use(cors());
const redis = new Redis({
  host: 'backend_redis_1', // Name des Docker-Containers, in dem Redis läuft
  port: 6379, // Port, auf dem Redis läuft (Standard-Port)
});

app.use(express.json());

app.get('/api/quiz', async (req, res) => {
    const keys = await redis.keys('quizQuestion*');
    const questions = [];
  
    for (const key of keys) {
      const value = await redis.get(key);
      const questionData = JSON.parse(value);
      questions.push(questionData);
    }
  
    res.json(questions);
  });
  

app.get('/keys/:key', async (req, res) => {
    const key = req.params.key;
    const value = await redis.get(key);
  
    if (value === null) {
      return res.status(404).json({ error: 'Key not found' });
    }
  
    let parsedValue;
    try {
      parsedValue = JSON.parse(value);
    } catch (error) {
      // Wenn der Wert kein gültiger JSON-String ist, verwende den ursprünglichen Wert
      parsedValue = value;
    }
  
    res.json({ key, value: parsedValue });
  });
  

  app.post('/keys', async (req, res) => {
    const { key, value } = req.body;
  
    // Überprüfen, ob der Wert ein Objekt ist, und in einen JSON-String konvertieren, falls erforderlich
    const stringValue = (typeof value === 'object' && value !== null) ? JSON.stringify(value) : value;
  
    await redis.set(key, stringValue);
  
    res.status(201).json({ message: 'Key-value pair created' });
  });
  
  async function seedDatabase() {
    const quizData = [
      {
        key: "quizQuestion1",
        value: {
          question: "Welcher Planet ist der größte in unserem Sonnensystem?",
          options: ["Merkur", "Venus", "Erde", "Mars", "Jupiter", "Saturn", "Uranus", "Neptun"],
          correctAnswer: "Jupiter",
        },
      },
      {
        key: "quizQuestion2",
        value: {
          question: "Wie viele Kontinente gibt es auf der Erde?",
          options: ["3", "5", "7", "9"],
          correctAnswer: "7",
        },
      },
      {
      key: "quizQuestion3",
      value: {
        question: "Was bedeutet das I, der ACID Bedingungen?",
        options: ["Isoliert", "Ineffizient", "Insuffizient", "Irgendwas"],
        correctAnswer: "Isoliert",
      },
    },
    ];
  
    for (const item of quizData) {
      const { key, value } = item;
      const stringValue = JSON.stringify(value);
      await redis.set(key, stringValue);
    }
  
    console.log("Database seeded with quiz questions");
  }
  
  (async () => {
    await seedDatabase();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })();
  