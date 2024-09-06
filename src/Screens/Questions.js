import React from 'react';

export default function Questions(props) {
    const { id, quest, opt, currentQuestion, index, onPrevious, onNext, totalQuestions, onSubmit, onAnswerChange, selectedAnswer } = props;

    const isActive = currentQuestion === index;
    
    const showNextButton = currentQuestion < totalQuestions - 1;

    const handleOptionChange = (event) => {
        onAnswerChange(id, event.target.value);
    };

    return (
        <div id={id} className={`question-container ${isActive ? 'active' : 'inactive'}`}>
            <h3>{quest}</h3>
            <ul>
                {opt.map((option, idx) => (
                    <li key={idx}>
                        <input
                            type="radio"
                            id={`option_${id}_${idx}`}
                            name={`question_${id}`}
                            value={option}
                            checked={selectedAnswer === option}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor={`option_${id}_${idx}`}>{option}</label>
                    </li>
                ))}
            </ul>
            <div className="navigation-buttons">
                <button
                    type='button'
                    className='prev-button'
                    onClick={onPrevious}
                    disabled={currentQuestion === 0}
                >
                    Previous
                </button>
                {showNextButton ? (
                    <button
                        type='button'
                        className='next-button'
                        onClick={onNext}
                        disabled={currentQuestion >= totalQuestions - 1}
                    >
                        Next
                    </button>
                ) : (
                    <button
                        type='button'
                        className='submit-button'
                        onClick={onSubmit}
                    >
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
}
