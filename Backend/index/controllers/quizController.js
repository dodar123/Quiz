const redis = require("../redis");

const generateKey = () => {
  const timestamp = new Date().getTime();
  const randomValue = Math.random().toString(36).substr(2, 5);
  return `quizQuestion-${timestamp}-${randomValue}`;
};

exports.getQuiz = async (req, res) => {
  const keys = await redis.keys("quizQuestion*");
  const questions = [];

  for (const key of keys) {
    const value = await redis.get(key);
    const questionData = JSON.parse(value);
    questions.push(questionData);
  }

  res.json(questions);
};

exports.getQuizByTopic = async (req, res) => {
  const topic = req.params.topic;
  const keys = await redis.keys(`${topic}-quizQuestion-*`);
  const questions = [];

  for (const key of keys) {
    const value = await redis.get(key);
    const questionData = JSON.parse(value);
    questions.push(questionData);
  }

  res.json(questions);
};

exports.getKey = async (req, res) => {
  const key = req.params.key;
  const value = await redis.get(key);

  if (value === null) {
    return res.status(404).json({ error: "Key not found" });
  }

  let parsedValue;
  try {
    parsedValue = JSON.parse(value);
  } catch (error) {
    parsedValue = value;
  }

  res.json({ key, value: parsedValue });
};

exports.deleteAllKeys = (req, res) => {
  redis.keys("quizQuestion-*", (err, keys) => {
    if (err) {
      console.error("Fehler beim Abrufen der Schlüssel:", err);
      res.status(500).send({ error: "Fehler beim Abrufen der Schlüssel" });
      return;
    }

    if (keys.length === 0) {
      res.status(200).send({ message: "Keine Schlüssel gefunden" });
      return;
    }

    redis.del(keys, (err, response) => {
      if (err) {
        console.error("Fehler beim Löschen der Schlüssel:", err);
        res.status(500).send({ error: "Fehler beim Löschen der Schlüssel" });
      } else {
        res.status(200).send({ message: `${response} Schlüssel gelöscht` });
      }
    });
  });
};

exports.postKey = async (req, res) => {
  try {
    const { key, question, options, correctAnswer } = req.body;
    const questionData = JSON.stringify({ question, options, correctAnswer });

    await redis.set(key, questionData);
    res.json({ message: "Frage hinzugefügt", key });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ein Fehler ist aufgetreten" });
  }
};
