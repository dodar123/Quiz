const express = require('express');
const Redis = require('ioredis');
const cors = require('cors');
const app = express();
app.use(cors());
const fs = require('fs');
const path = require('path');
const redis = new Redis({
  host: 'backend_redis_1', // Name des Docker-Containers, in dem Redis läuft
  port: 6379, // Port, auf dem Redis läuft (Standard-Port)
});
app.use(express.json());
const generateKey = () => {
  const timestamp = new Date().getTime();
  const randomValue = Math.random().toString(36).substr(2, 5);
  return `quizQuestion-${timestamp}-${randomValue}`;
};
const loadDbQuestions = async () => {
  const dbQuestionsFile = path.join(__dirname, 'db_questions.json');
  const dbQuestions = JSON.parse(fs.readFileSync(dbQuestionsFile, 'utf-8'));

  for (const question of dbQuestions) {
    const key = `Datenbank-${generateKey()}`;
    await redis.set(key, JSON.stringify(question));
  }

  console.log('Datenbankfragen wurden geladen');
};

const loadFBQuestions = async () => {
  const dbQuestionsFile = path.join(__dirname, 'fb_questions.json');
  const dbQuestions = JSON.parse(fs.readFileSync(dbQuestionsFile, 'utf-8'));

  for (const question of dbQuestions) {
    const key = `Fussball-${generateKey()}`;
    await redis.set(key, JSON.stringify(question));
  }

  console.log('Datenbankfragen wurden geladen');
};
const loadGGQuestions = async () => {
  const dbQuestionsFile = path.join(__dirname, 'gg_questions.json');
  const dbQuestions = JSON.parse(fs.readFileSync(dbQuestionsFile, 'utf-8'));

  for (const question of dbQuestions) {
    const key = `Geographie-${generateKey()}`;
    await redis.set(key, JSON.stringify(question));
  }

  console.log('Datenbankfragen wurden geladen');
};

const loadAGQuestions = async () => {
  const dbQuestionsFile = path.join(__dirname, 'ag_questions.json');
  const dbQuestions = JSON.parse(fs.readFileSync(dbQuestionsFile, 'utf-8'));

  for (const question of dbQuestions) {
    const key = `Allgemein-${generateKey()}`;
    await redis.set(key, JSON.stringify(question));
  }

  console.log('Datenbankfragen wurden geladen');
};













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

  app.get('/api/quiz/:topic', async (req, res) => {
    const topic = req.params.topic;
    const keys = await redis.keys(`${topic}-quizQuestion-*`);
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
  
  app.delete('/deleteAll', (req, res) => {
    redis.keys('quizQuestion-*', (err, keys) => {
      if (err) {
        console.error('Fehler beim Abrufen der Schlüssel:', err);
        res.status(500).send({ error: 'Fehler beim Abrufen der Schlüssel' });
        return;
      }
  
      if (keys.length === 0) {
        res.status(200).send({ message: 'Keine Schlüssel gefunden' });
        return;
      }
  
      redis.del(keys, (err, response) => {
        if (err) {
          console.error('Fehler beim Löschen der Schlüssel:', err);
          res.status(500).send({ error: 'Fehler beim Löschen der Schlüssel' });
        } else {
          res.status(200).send({ message: `${response} Schlüssel gelöscht` });
        }
      });
    });
  });
  
  app.post('/keys', async (req, res) => {
    try {
      const { key, question, options, correctAnswer } = req.body;
      const questionData = JSON.stringify({ question, options, correctAnswer });
      
      await redis.set(key, questionData);
      res.json({ message: 'Frage hinzugefügt', key });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ein Fehler ist aufgetreten' });
    }
  });
  
  (async () => {
    await loadDbQuestions();
    await loadFBQuestions();
    await loadGGQuestions();
    await loadAGQuestions();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })();
  