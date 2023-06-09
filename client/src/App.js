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
  fetch('http://localhost:3000/api/deleteAll', {
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
  const key = `quizQuestion-${generateKey()}`;
  fetch('http://localhost:3000/api/keys', {
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
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleAddQuestion = (questionData) => {
    addQuestion(questionData);
  };
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Herzlich willkommen zu unserer Quiz-Anwendung!</h1>
      </header>
      
      <div class="ueberschrift"><h2>Hier erstellen Sie Ihr eigenes Quiz:</h2></div>
      <div className="container mt-5">
        <button
          className="btn btn-primary mr-3"
          onClick={() => setShowAddQuestionModal(true)}
        >
          Fragen hinzufügen
        </button>
        <button
          className="btn btn-success mr-3"
          onClick={() => {
            setStartQuiz(true);
            setSelectedTopic('quizQuestion');
             }}
        >
          Quiz starten
        </button>
        <button className="btn btn-danger" onClick={handleDeleteAll}>
          Erstelltes Quiz löschen
        </button>
    <div class="ueberschrift"><h2>Hier beantworten Sie bereits vorhandene Quizfragen:</h2></div>
    <div class="fragen-def">
      <button
      className="btn btn-success mr-3"
      onClick={() => {
       setStartQuiz(true);
       setSelectedTopic('Datenbank');
        }}
      >
       Datenbanken-Quiz starten
      </button>
      <button
      className="btn btn-success mr-3"
        onClick={() => {
       setStartQuiz(true);
        setSelectedTopic('Allgemein');
       }}
      >
       Allgemeinwissen-Quiz starten
      </button>
      <button
       className="btn btn-success mr-3"
       onClick={() => {
         setStartQuiz(true);
        setSelectedTopic('Fussball');
       }}
      >
       Fußball-Quiz starten
      </button>
      <button
        className="btn btn-success mr-3"
       onClick={() => {
         setStartQuiz(true);
         setSelectedTopic('Geographie');
       }}
      >
       Geographie-Quiz starten
      </button>
    </div>
        

        {showAddQuestionModal && (
          <div className="modal-backdrop">
            <div className="modal-dialog">
              <AddQuestion onAdd={handleAddQuestion} />
              <button
                className="btn btn-secondary"
                onClick={() => {setShowAddQuestionModal(false);
                window.location.reload();}}
              >
                Schließen
              </button>
            </div>
          </div>
        )}

{startQuiz && <Quiz topic={selectedTopic} />}

      </div>
    </div>
  );
}

export default App;