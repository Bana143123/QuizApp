// JavaScriptQuiz.js
import React, { useState, useEffect } from 'react';

const JavaScriptQuiz = () => {
    const questions = [
        { question: "What is the output of `console.log(typeof null)`?", options: ["object", "null", "undefined", "number"], answer: "object" },
        { question: "Which method is used to add an element to the end of an array?", options: ["push", "pop", "shift", "unshift"], answer: "push" },
        { question: "What is the correct syntax for referring to an external script called 'script.js'?", options: ["<script href='script.js'>", "<script name='script.js'>", "<script src='script.js'>", "<script file='script.js'>"], answer: "<script src='script.js'>" },
        { question: "Which company developed JavaScript?", options: ["Netscape", "Google", "Microsoft", "Apple"], answer: "Netscape" },
        { question: "Which symbol is used for comments in JavaScript?", options: ["//", "/* */", "#", "<!-- -->"], answer: "//" },
        { question: "What is the output of `2 + '2'` in JavaScript?", options: ["22", "4", "NaN", "Error"], answer: "22" },
        { question: "How do you declare a JavaScript variable?", options: ["var carName;", "variable carName;", "v carName;", "declare carName;"], answer: "var carName;" },
        { question: "Which event occurs when the user clicks on an HTML element?", options: ["onchange", "onmouseclick", "onclick", "onmouseover"], answer: "onclick" },
        { question: "Which operator is used to assign a value to a variable?", options: ["*", "-", "=", "x"], answer: "=" },
        { question: "What will `Boolean('false')` return?", options: ["true", "false", "null", "undefined"], answer: "true" },
        { question: "Which method converts JSON data to a JavaScript object?", options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.toObject()"], answer: "JSON.parse()" },
        { question: "Which keyword is used to create a class in JavaScript?", options: ["class", "function", "constructor", "method"], answer: "class" },
        { question: "How do you create a function in JavaScript?", options: ["function myFunction()", "function:myFunction()", "function = myFunction()", "myFunction = function()"], answer: "function myFunction()" },
        { question: "Which statement is used to stop a loop?", options: ["break", "stop", "exit", "return"], answer: "break" },
        { question: "Which method is used to round a number to the nearest integer?", options: ["Math.round()", "Math.ceil()", "Math.floor()", "Math.abs()"], answer: "Math.round()" },
        { question: "Which keyword is used to check whether a property is in an object?", options: ["in", "has", "exists", "property"], answer: "in" },
        { question: "What is the correct way to write an IF statement in JavaScript?", options: ["if (i == 5)", "if i = 5 then", "if i == 5 then", "if (i = 5)"], answer: "if (i == 5)" },
        { question: "What is the correct way to write a JavaScript array?", options: ["var colors = ['red', 'green', 'blue']", "var colors = 'red', 'green', 'blue'", "var colors = (1:'red', 2:'green', 3:'blue')", "var colors = {'red', 'green', 'blue'}"], answer: "var colors = ['red', 'green', 'blue']" },
        { question: "Which method returns the length of a string?", options: [".length", ".size()", ".index()", ".count()"], answer: ".length" },
        { question: "How do you add a comment in JavaScript?", options: ["// This is a comment", "<!-- This is a comment -->", "# This is a comment", "' This is a comment"], answer: "// This is a comment" }
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

export default JavaScriptQuiz;
