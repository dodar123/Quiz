import React, { useState, useEffect } from 'react';
import './Quiz/Quiz.css';

const Quiz1 = ({topic}) => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/api/quiz/${topic}`)
      .then((response) => response.json())
      .then((data) => setQuizData(data));
  }, []);

  const handleSubmit = () => {
    if (selectedOption === quizData[currentQuestion].correctAnswer) {
      alert('Richtige Antwort');
    } else {
      alert(`Falsche Antwort, die richtige Antwort ist: ${quizData[currentQuestion].correctAnswer}`);
    }

    // Überprüfen, ob es keine weiteren Fragen gibt und das Quiz abgeschlossen ist
    if (currentQuestion === quizData.length - 1) {
      setShowResult(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setShowResult(true);
    }
  };

  if (quizData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Quiz1">
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
        <div>
          {currentQuestion === quizData.length ? (
            <div>Das Quiz ist abgeschlossen</div>
          ) : (
            <button onClick={handleNextQuestion}>Nächste Frage</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz1;