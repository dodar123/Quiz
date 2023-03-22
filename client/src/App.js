import React, { useState } from 'react';
import './App.css';
import Quiz from './components/Quiz/Quiz';
import AddQuestion from './components/AddQuestion/AddQuestion';

const generateKey = () => {
  const timestamp = new Date().getTime();
  const randomValue = Math.random().toString(36).substr(2, 5);
  return `quizQuestion-${timestamp}-${randomValue}`;
};


const addQuestion = (questionData) => {
  const key = generateKey();
  fetch('http://localhost:3000/keys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ key, ...questionData }),
  })
    .then((response) => response.json())
    .then((data) => console.log('Frage hinzugefügt:', data))
    .catch((error) => console.error('Fehler:', error));
};


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Quiz-Anwendung</h1>
      </header>
      <AddQuestion onAdd={addQuestion} />
      <Quiz />
    </div>
  );
}


export default App;
