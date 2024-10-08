import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import bg from "../assets/banner-bg.png";

const Questions = () => {
  const [quiz, setQuiz] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const navigate = useNavigate();

  const fetchQuiz = async () => {
    const response = await axios.get(
      "https://opentdb.com/api.php?amount=10&category=9&type=multiple"
    );
    setQuiz(response?.data?.results);
  };

  const shuffleOptions = (question) => {
    const options = [...question.incorrect_answers, question.correct_answer];
    return options.sort(() => Math.random() - 0.5); // Shuffle the options
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (quiz.length > 0) {
      const shuffled = shuffleOptions(quiz[currentQuestionIndex]);
      setShuffledOptions(shuffled);
    }
  }, [currentQuestionIndex, quiz]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quiz[currentQuestionIndex]?.correct_answer) {
      setScore(score + 1);
    }
    setSelectedAnswer(null);
    setTimeLeft(20);

    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      handleNextQuestion();
    }
  }, [timeLeft]);

  const getStatusMessage = () => {
    return score > 5 ? "Congratulations! You Won 🎉" : "Sorry, You Lost 😔";
  };

  return (
    <div
      className="h-screen grid place-items-center"
      style={{
        backgroundImage: `url(${bg})`,
        height: "100vh",
      }}
    >
      {quiz.length > 0 ? (
        <div className="bg-white shadow-2xl p-10 rounded-lg w-[600px] min-h-[500px] duration-300">
          {isQuizFinished ? (
            <div className="text-center">
              <div className="text-3xl font-semibold capitalize mb-4 text-[#2e5cf3]">
                {localStorage.getItem("name")}
              </div>
              <h1 className="text-4xl font-bold text-[#4A4A4A]">
                Quiz Finished!
              </h1>
              <p className="text-lg text-gray-700 my-8">
                Your Score:{" "}
                <span className="font-bold text-[#2e5cf3]">{score}</span> /{" "}
                {quiz.length}
              </p>
              <p className="text-2xl font-semibold text-[#2272FF]">
                {getStatusMessage()}
              </p>
              <button
                className="bg-[#2e5cf3] p-2 text-white font-semibold mt-20 rounded-lg"
                onClick={() => navigate("/")}
              >
                Try Again
              </button>
            </div>
          ) : (
            <div>
              <div className="bg-gray-200 p-2 rounded-lg font-bold my-3 text-center">
                Time Left : <span>{timeLeft}</span> s for this question
              </div>
              <h1 className="text-4xl font-bold text-[#4A4A4A]">
                Question{" "}
                <span className="text-[#2e5cf3]">
                  {currentQuestionIndex + 1}
                </span>{" "}
                of {quiz.length}
              </h1>
              <p className="text-lg text-gray-700 my-8">
                {quiz[currentQuestionIndex].question}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {shuffledOptions.map((option, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center my-3 p-2 rounded border border-gray-200 hover:bg-[#2e5cf3] hover:text-white cursor-pointer ${
                      selectedAnswer === option ? "bg-[#2e5cf3] text-white" : ""
                    }`}
                    onClick={() => handleAnswerSelect(option)}
                  >
                    <input
                      type="radio"
                      name={`answer-${currentQuestionIndex}`}
                      id={`option-${idx}`}
                      className="mr-3"
                      checked={selectedAnswer === option}
                      onChange={() => handleAnswerSelect(option)}
                    />
                    <label htmlFor={`option-${idx}`} className="cursor-pointer">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={handleNextQuestion}
                >
                  {currentQuestionIndex < quiz.length - 1 ? "Next" : "Finish"}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
};

export default Questions;
