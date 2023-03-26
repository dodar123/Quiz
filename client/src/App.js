import React, { useState } from 'react';
import Quiz from './components/Quiz/Quiz';
// import Quiz1 from './components/Quiz1';
// import Quiz2 from './components/Quiz2';
// import Quiz3 from './components/Quiz3';
// import Quiz4 from './components/Quiz4';
// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
        
import AddQuestion from './components/AddQuestion/AddQuestion';
import './App.css';
//import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

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
  //const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Quiz-Anwendung</h1>
      </header>
      <div className="container mt-5">
{/*
      <Router>
      <Routes>

        <Route path="/quiz1" element={<Quiz1/>} />
        <Route path="/quiz2" element={<Quiz2/>} />
        <Route path="/quiz3" element={<Quiz3/>} />
        <Route path="/quiz4" element={<Quiz4/>} />
       
      </Routes>
      </Router>
  */}

        <button
          className="btn btn-primary mr-3"
          onClick={() => setShowAddQuestionModal(true)}
        >
          Frage hinzufügen
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
          Alle Löschen
        </button>
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

{startQuiz && <Quiz topic={selectedTopic} />}

      </div>
    </div>
  );
}

export default App;