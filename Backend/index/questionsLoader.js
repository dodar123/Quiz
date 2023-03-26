const fs = require('fs');
const path = require('path');
const redis = require('./redis');

const generateKey = () => {
  const timestamp = new Date().getTime();
  const randomValue = Math.random().toString(36).substr(2, 5);
  return `quizQuestion-${timestamp}-${randomValue}`;
};

const loadQuestionsFromFile = async (filename, prefix) => {
  const questionsFile = path.join(__dirname, filename);
  const questions = JSON.parse(fs.readFileSync(questionsFile, 'utf-8'));

  for (const question of questions) {
    const key = `${prefix}-${generateKey()}`;
    await redis.set(key, JSON.stringify(question));
  }

  console.log(`${prefix} Fragen wurden geladen`);
};

const loadQuestions = async () => {
  await loadQuestionsFromFile('../bsp-Fragen/db_questions.json', 'Datenbank');
  await loadQuestionsFromFile('../bsp-Fragen/fb_questions.json', 'Fussball');
  await loadQuestionsFromFile('../bsp-Fragen/gg_questions.json', 'Geographie');
  await loadQuestionsFromFile('../bsp-Fragen/ag_questions.json', 'Allgemein');
};

module.exports = { loadQuestions };
