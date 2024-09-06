import React, { useState, useEffect } from 'react';
import Questions from '../Screens/Questions';

export default function Home() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({}); // To store selected answers
    const [result, setResult] = useState(''); // To store result message
    const [submitted, setSubmitted] = useState(false); // To track if the quiz is submitted
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
    const quiz_data = [
        {
            id: 'first_quest',
            quest: "1). Which type of JavaScript language is ___",
            opt: ['Object-Oriented', 'Object-Based', 'Assembly-language', 'High-level'],
            correct: "Object-Based"
        },

        {
            id: 'second_quest',
            quest: "2) Which one of the following also known as Conditional Expression:",
            opt: ['Alternative to if-else', 'Switch statement', 'If-then-else statement', 'immediate if'],
            correct: "immediate if"
        },

        {
            id: 'third_quest',
            quest: "3) In JavaScript, what is a block of statement?",
            opt: ['Conditional block', 'block that combines a number of statements into a single compound statement', 'both conditional block and a single statement', 'immediate if'],
            correct: "immediate if"
        },

        {
            id: 'forth_quest',
            quest: "4) When interpreter encounters an empty statements, what it will do:",
            opt: ['Shows a warning', 'Prompts to complete the statement', 'Throws an error', 'Ignores the statements'],
            correct: "Ignores the statements"
        },

        {
            id: 'fifth_quest',
            quest: "5) The function and var are known as:",
            opt: ['Keywords', 'Data types', 'Declaration statements', 'Prototypes'],
            correct: "Declaration statements"
        },

        {
            id: 'sixth_quest',
            quest: "6) Which of the following variables takes precedence over the others if the names are the same?",
            opt: ['Global variable', 'The local element', 'The two of the above', 'None of the above'],
            correct: "The local element"
        },

        {
            id: 'seventh_quest',
            quest: "7) Which one of the following is the correct way for calling the JavaScript code?",
            opt: ['Preprocessor', 'Triggering Event', 'RMI', 'Function/Method'],
            correct: "Function/Method"
        },

        {
            id: 'eight_quest',
            quest: "8)Which of the following type of a variable is volatile?",
            opt: ['Mutable variable', 'Dynamic variable', 'Volatile variable', 'Immutable variable'],
            correct: "Mutable variable"
        },

        {
            id: 'ninth_quest',
            quest: "9)Which of the following type of a variable is volatile?",
            opt: ['Mutable variable', 'Dynamic variable', 'Volatile variable', 'Immutable variable'],
            correct: "Mutable variable"
        }
    ]

    useEffect(() => {
        if (submitted || timeLeft <= 0) return;

        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(intervalId);
                    handleSubmit(); // Automatically submit when time is up
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId); // Clean up interval on component unmount
    }, [submitted, timeLeft]);

    const handlePrevious = () => {
        setCurrentQuestion(Math.max(currentQuestion - 1, 0));
    };

    const handleNext = () => {
        setCurrentQuestion(Math.min(currentQuestion + 1, quiz_data.length - 1));
    };

    const handleAnswerChange = (questionId, answer) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answer
        }));
    };

    const handleSubmit = () => {
        let score = 0;
        quiz_data.forEach(question => {
            if (answers[question.id] === question.correct) {
                score += 1;
            }
        });
        setResult(`You scored ${score} out of ${quiz_data.length}`);
        setSubmitted(true); // Set the quiz as submitted
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const isAttempted = (questionId) => {
        return answers[questionId] !== undefined;
    };

    return (
        <div className='Main'>
            <div className="timer">
                Time Left: {formatTime(timeLeft)}
            </div>
            {!submitted ? (
                <>
                    <div className="question-list">
                        {quiz_data.map((question, index) => (
                            <div
                                key={question.id}
                                className={`question-flag ${isAttempted(question.id) ? 'attempted' : 'not-attempted'}`}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>
                    {quiz_data.map((question, index) => (
                        <Questions
                            key={question.id}
                            id={question.id}
                            quest={question.quest}
                            opt={question.opt}
                            currentQuestion={currentQuestion}
                            index={index}
                            onPrevious={handlePrevious}
                            onNext={handleNext}
                            onSubmit={handleSubmit}
                            totalQuestions={quiz_data.length}
                            onAnswerChange={handleAnswerChange}
                            selectedAnswer={answers[question.id] || ''}
                        />
                    ))}
                </>
            ) : (
                <div className="result-message"><p className='result-para'>{result}</p></div>
            )}
        </div>
    );
}