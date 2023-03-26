import React, { useState, useEffect } from 'react';
import './Quiz.css';

const Quiz = ({ topic }) => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/api/quiz/${topic}`)
      .then((response) => response.json())
      .then((data) => setQuizData(data));
  }, [topic]);
  
  const handleSubmit = () => {
    if (selectedOption === quizData[currentQuestion].correctAnswer) {
      alert('Richtige Antwort');
    } else {
      alert(`Falsche Antwort, die richtige Antwort ist: ${quizData[currentQuestion].correctAnswer}`);
    }
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedOption(null);
    setShowResult(false);
  };

  if (quizData.length === 0) {
    return <div>Bitte fügen Sie erst ein paar Fragen hinzu, um mit dem Quickstart Quiz zu starten!</div>;
  }

  return (
    <div className="Quiz">
      {!showResult ? (
        <div>
          <h2>{quizData[currentQuestion].question}</h2>
          {quizData[currentQuestion].options.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                name="option"
                value={option}
                id={`option${index}`}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <label htmlFor={`option${index}`}>{option}</label>
            </div>
          ))}
          <button onClick={handleSubmit}>Antwort absenden</button>
        </div>
      ) : (
        <button onClick={handleNextQuestion}>Nächste Frage</button>
      )}
    </div>
  );
};

export default Quiz;
