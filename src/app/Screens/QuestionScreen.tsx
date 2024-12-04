"use client";
import React, { useState, useEffect, useRef } from "react";
import { HourlyQuestions } from "../Components/QueastionSheet";
import { FaExclamationCircle } from "react-icons/fa";

const QuestionScreen = ({onFinish}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const savedIndex = localStorage.getItem("currentQuestionIndex");
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });

  const [timeLeft, setTimeLeft] = useState(60);
  const cameraAllowed = true;
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const videoRef = useRef(null);

  const totalQuestions = HourlyQuestions.length;

  useEffect(() => {
    localStorage.setItem("currentQuestionIndex", currentQuestionIndex);

    // Speak the current question
    const currentQuestion = HourlyQuestions[currentQuestionIndex]?.question;
    if (currentQuestion) {
      speakQuestion(currentQuestion);
    }
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // If it's the last question, navigate to the completion screen
      if (currentQuestionIndex === totalQuestions - 1) {
        onFinish();// Navigate to the Test Completion screen
      } else {
        handleNext(); // Go to next question if not the last question
      }
    }
  }, [timeLeft, currentQuestionIndex, totalQuestions]);

  useEffect(() => {
    if (cameraAllowed && !isLoading) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Camera access denied: ", err);
        });
    }
  }, [cameraAllowed, isLoading]);

  const speakQuestion = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1; // Adjust the speech rate if needed (default is 1)
    utterance.pitch = 1; // Adjust pitch (default is 1)
    speechSynthesis.speak(utterance);
  };

  const handleNext = () => {
    // Show loading screen for 5 seconds before moving to the next question
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeLeft(60);
      }
    }, 5000);
  };


  const currentQuestion = HourlyQuestions[currentQuestionIndex]?.question;

  if (isLoading) {
    // Render loading screen
    return (
      <div style={styles.loadingContainer}>
        <h2 style={styles.loadingText}>
          Thats Great! Just give me a moment to take notes ✍️
        </h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.headerText}>
          {currentQuestionIndex + 1}/{totalQuestions}
        </h2>
      </div>

      <div style={styles.questionBox}>
        <h3 style={styles.questionText}>{currentQuestion}</h3>
      </div>

      <div style={styles.timerBox}>
        <p style={styles.timerText}>Time Left: {timeLeft}s</p>
      </div>

      <div style={styles.cameraBox}>
        {cameraAllowed && (
          <video ref={videoRef} autoPlay style={styles.videoFeed} />
        )}
      </div>

      <div style={styles.actionsBox}>
        {currentQuestionIndex < totalQuestions - 1 ? (
          <button onClick={handleNext} style={styles.saveButton}>
            Save & Next
          </button>
        ) : (
          <button onClick={onFinish} style={styles.finishButton}>
            Finish Test
          </button>
        )}
      </div>

      <div style={styles.instructionBox}>
        <FaExclamationCircle style={styles.icon} />
        <p>Press Enter for Saving and Next</p>
      </div>
    </div>
  );
};

export default QuestionScreen;

// Inline styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#161D29",
    color: "#FFFFFF",
    height: "100vh",
    justifyContent: "space-around",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#161D29",
    color: "#FFFFFF",
  },
  loadingText: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
  },
  loader: {
    width: "50px",
    height: "50px",
    border: "6px solid #FFFFFF",
    borderTop: "6px solid #00BFFF",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  header: {
    marginBottom: "10px",
  },
  headerText: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#00BFFF",
  },
  questionBox: {
    width: "90%",
    textAlign: "center",
    backgroundColor: "#1E2A38",
    padding: "20px",
    borderRadius: "10px",
  },
  questionText: {
    fontSize: "20px",
    color: "#FFFFFF",
  },
  timerBox: {
    padding: "10px 20px",
    backgroundColor: "#1E2A38",
    borderRadius: "10px",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
  },
  timerText: {
    color: "#FFD700",
  },
  cameraBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  videoFeed: {
    width: "400px",
    height: "300px",
    borderRadius: "10px",
    border: "2px solid #00BFFF",
    objectFit: "cover",
    objectPosition: "center",
  },
  actionsBox: {
    textAlign: "center",
  },
  saveButton: {
    padding: "12px 30px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#00BFFF",
    border: "none",
    borderRadius: "10px",
    color: "#FFFFFF",
    cursor: "pointer",
  },
  finishButton: {
    padding: "12px 30px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#FF4500",
    border: "none",
    borderRadius: "10px",
    color: "#FFFFFF",
    cursor: "pointer",
  },
  instructionBox: {
    fontSize: "14px",
    color: "#CCCCCC",
    display: "flex",
    flexDirection: "row",
  },
  icon: {
    marginLeft: "5px",
    fontSize: "20px",
    marginRight: "5px",
  },
};

