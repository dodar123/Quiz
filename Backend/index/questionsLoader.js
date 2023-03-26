// Importieren der benötigten Pakete
const fs = require('fs');  // Ein Modul, das Funktionen zum Lesen von Dateien bereitstellt
const path = require('path');  // Ein Modul, das Dateipfade manipuliert
const redis = require('./redis');  // Ein Modul, das die Verbindung zur Redis-Datenbank bereitstellt

// Eine Funktion, die einen eindeutigen Schlüssel für jede Frage generiert
const generateKey = () => {
  const timestamp = new Date().getTime();  // Zeitstempel in Millisekunden
  const randomValue = Math.random().toString(36).substr(2, 5);  // Zufällige Zeichenkette mit 5 Zeichen
  return `quizQuestion-${timestamp}-${randomValue}`;  // Kombination aus Präfix, Zeitstempel und Zufallszeichenkette
};

// Eine Funktion, die Fragen aus einer Datei lädt und in Redis speichert
const loadQuestionsFromFile = async (filename, prefix) => {
  const questionsFile = path.join(__dirname, filename);  // Pfad zur Fragen-Datei
  const questions = JSON.parse(fs.readFileSync(questionsFile, 'utf-8'));  // Lesen der Datei und Parsen der JSON-Daten

  // Iteration über jede Frage und Speicherung in Redis
  for (const question of questions) {
    const key = `${prefix}-${generateKey()}`;  // Erstellen des Schlüssels für die Frage
    await redis.set(key, JSON.stringify(question));  // Speichern der Frage in Redis als JSON
  }

  console.log(`${prefix} Fragen wurden geladen`);  // Ausgabe einer Meldung, wenn alle Fragen geladen wurden
};

// Eine Funktion, die Fragen aus verschiedenen Dateien lädt und in Redis speichert
const loadQuestions = async () => {
  await loadQuestionsFromFile('../bsp-Fragen/db_questions.json', 'Datenbank');  // Laden und Speichern von Fragen aus einer Datei
  await loadQuestionsFromFile('../bsp-Fragen/fb_questions.json', 'Fussball');
  await loadQuestionsFromFile('../bsp-Fragen/gg_questions.json', 'Geographie');
  await loadQuestionsFromFile('../bsp-Fragen/ag_questions.json', 'Allgemein');
};

// Exportieren der Funktion 'loadQuestions'
module.exports = { loadQuestions };
