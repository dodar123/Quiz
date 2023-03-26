// Importiere das Redis-Modul
const redis = require("../redis");

// Funktion zum Generieren eines eindeutigen Schlüssels für eine Quizfrage
const generateKey = () => {
  const timestamp = new Date().getTime();
  const randomValue = Math.random().toString(36).substr(2, 5);
  return `quizQuestion-${timestamp}-${randomValue}`;
};

// Route zum Abrufen aller Quizfragen
exports.getQuiz = async (req, res) => {
  // Finde alle Schlüssel, die mit "quizQuestion" beginnen
  const keys = await redis.keys("quizQuestion*");
  const questions = [];

  // Durchlaufe alle gefundenen Schlüssel
  for (const key of keys) {
    // Hole den Wert des Schlüssels aus Redis
    const value = await redis.get(key);
    // Parse den Wert als JSON
    const questionData = JSON.parse(value);
    // Füge die Frage dem Array hinzu
    questions.push(questionData);
  }

  // Sende die Fragen als JSON-Antwort
  res.json(questions);
};

// Route zum Abrufen von Quizfragen nach Thema
exports.getQuizByTopic = async (req, res) => {
  // Extrahiere das Thema aus den Anfrageparametern
  const topic = req.params.topic;
  // Finde alle Schlüssel, die mit dem Thema und "quizQuestion" beginnen
  const keys = await redis.keys(`${topic}-quizQuestion-*`);
  const questions = [];

  // Durchlaufe alle gefundenen Schlüssel
  for (const key of keys) {
    // Hole den Wert des Schlüssels aus Redis
    const value = await redis.get(key);
    // Parse den Wert als JSON
    const questionData = JSON.parse(value);
    // Füge die Frage dem Array hinzu
    questions.push(questionData);
  }

  // Sende die Fragen als JSON-Antwort
  res.json(questions);
};

// Route zum Abrufen des Werts eines bestimmten Schlüssels
exports.getKey = async (req, res) => {
  const key = req.params.key;
  const value = await redis.get(key);

  // Wenn der Wert null ist, bedeutet das, dass der Schlüssel nicht gefunden wurde
  if (value === null) {
    return res.status(404).json({ error: "Key not found" });
  }

  let parsedValue;
  try {
    parsedValue = JSON.parse(value);
  } catch (error) {
    parsedValue = value;
  }

  // Sende den Wert des Schlüssels als JSON-Antwort
  res.json({ key, value: parsedValue });
};

// Route zum Löschen aller Schlüssel
exports.deleteAllKeys = (req, res) => {
  // Finde alle Schlüssel, die mit "quizQuestion-" beginnen
  redis.keys("quizQuestion-*", (err, keys) => {
    if (err) {
      console.error("Fehler beim Abrufen der Schlüssel:", err);
      res.status(500).send({ error: "Fehler beim Abrufen der Schlüssel" });
      return;
    }

    // Wenn keine Schlüssel gefunden wurden
    if (keys.length === 0) {
      res.status(200).send({ message: "Keine Schlüssel gefunden" });
      return;
    }

    // Lösche alle gefundenen Schlüssel
    redis.del(keys, (err, response) => {
      // Wenn ein Fehler beim Löschen der Schlüssel auftritt
      if (err) {
        console.error("Fehler beim Löschen der Schlüssel:", err);
        res.status(500).send({ error: "Fehler beim Löschen der Schlüssel" });
      } else {
        // Sendet eine erfolgreiche Antwort mit der Anzahl der gelöschten Schlüssel
        res.status(200).send({ message: `${response} Schlüssel gelöscht` });
      }
    });
  });
};

// Route zum Hinzufügen einer neuen Quizfrage
exports.postKey = async (req, res) => {
  try {
    // Extrahiere die benötigten Daten aus dem Anfragekörper
    const { key, question, options, correctAnswer } = req.body;
    // Erstelle ein JSON-Objekt aus den extrahierten Daten
    const questionData = JSON.stringify({ question, options, correctAnswer });

    // Füge den Schlüssel und die Frage in Redis hinzu
    await redis.set(key, questionData);
    // Sende eine erfolgreiche Antwort mit der Nachricht und dem Schlüssel
    res.json({ message: "Frage hinzugefügt", key });
  } catch (error) {
    // Wenn ein Fehler auftritt, sende eine Fehlerantwort
    console.error(error);
    res.status(500).json({ message: "Ein Fehler ist aufgetreten" });
  }
};