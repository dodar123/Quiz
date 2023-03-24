import React, { useState } from 'react';
import Quiz from './components/Quiz/Quiz';
import AddQuestion from './components/AddQuestion/AddQuestion';
import './App.css';

const generateKey = () => {
  const timestamp = new Date().getTime();
  const randomValue = Math.random().toString(36).substr(2, 5);
  return `quizQuestion-${timestamp}-${randomValue}`;
};
const handleDeleteAll = () => {
  fetch('http://localhost:3000/deleteAll', {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert(data.message);
    })
    .catch((error) => console.error('Fehler:', error));
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
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [startQuiz, setStartQuiz] = useState(false);

  const handleAddQuestion = (questionData) => {
    addQuestion(questionData);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Quiz-Anwendung</h1>
      </header>
      <div className="container mt-5">
        <button
          className="btn btn-primary mr-3"
          onClick={() => setShowAddQuestionModal(true)}
        >
          Frage hinzufügen
        </button>
        <button
          className="btn btn-success mr-3"
          onClick={() => setStartQuiz(true)}
        >
          Quiz starten
        </button>
        <button className="btn btn-danger" onClick={handleDeleteAll}>
          Alle Löschen
        </button>

        {showAddQuestionModal && (
          <div className="modal-backdrop">
            <div className="modal-dialog">
              <AddQuestion onAdd={handleAddQuestion} />
              <button
                className="btn btn-secondary"
                onClick={() => setShowAddQuestionModal(false)}
              >
                Schließen
              </button>
            </div>
          </div>
        )}

        {startQuiz && <Quiz />}
      </div>
    </div>
  );
}

export default App;