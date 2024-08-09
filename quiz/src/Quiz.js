import React, { useState, useEffect } from 'react';

const Quiz = () => {
    const questions = [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            answer: "Paris"
        },
        {
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            answer: "4"
        },
        {
            question: "What is the capital of Spain?",
            options: ["Madrid", "Paris", "Lisbon", "Rome"],
            answer: "Madrid"
        }
    ];

    const [hasStarted, setHasStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [timeLeft, setTimeLeft] = useState(30); // 30 seconds for each question

    useEffect(() => {
        if (hasStarted) {
            if (timeLeft === 0) {
                handleNextQuestion();
            }

            const timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime > 0 ? prevTime - 1 : 0);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [timeLeft, hasStarted]);

    const handleStartQuiz = () => {
        setHasStarted(true);
        setTimeLeft(30);
    };

    const handleAnswerOptionClick = (option) => {
        if (option === questions[currentQuestion].answer) {
            setScore(score + 1);
            setFeedback("Your answer was correct!");
        } else {
            setFeedback(`Your answer was incorrect. The correct answer is ${questions[currentQuestion].answer}.`);
        }
        handleNextQuestion();
    };

    const handleNextQuestion = () => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
            setTimeLeft(30);
            setFeedback("");
        } else {
            setShowScore(true);
        }
    };

    return (
        <div className="quiz-container">
            {hasStarted ? (
                showScore ? (
                    <div className="score-section">
                        You scored {score} out of {questions.length}
                    </div>
                ) : (
                    <>
                        <div className="question-section">
                            <div className="question-count">
                                <span>Question {currentQuestion + 1}</span>/{questions.length}
                            </div>
                            <div className="question-text">{questions[currentQuestion].question}</div>
                        </div>
                        <div className="timer-section">
                            Time Left: {timeLeft} seconds
                        </div>
                        <div className="answer-section">
                            {questions[currentQuestion].options.map((option, index) => (
                                <button key={index} onClick={() => handleAnswerOptionClick(option)}>{option}</button>
                            ))}
                        </div>
                        <div className="feedback-section">
                            {feedback && <p>{feedback}</p>}
                        </div>
                    </>
                )
            ) : (
                <button onClick={handleStartQuiz}>Start Quiz</button>
            )}
        </div>
    );
};

export default Quiz;
