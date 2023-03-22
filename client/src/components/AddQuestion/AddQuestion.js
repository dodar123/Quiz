import React, { useState } from 'react';
import './AddQuestion.css';

const AddQuestion = ({ onAdd }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd({
      question,
      options,
      correctAnswer,
    });

    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <form className="AddQuestion" onSubmit={handleSubmit}>
      <h2>Frage hinzufügen</h2>
      <label>
        Frage:
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
      </label>
      <div>
        Antwortmöglichkeiten:
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            required
          />
        ))}
      </div>
      <label>
        Richtige Antwort:
        <input
          type="text"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          required
        />
      </label>
      <button type="submit">Frage hinzufügen</button>
    </form>
  );
};

export default AddQuestion;
