"use client";
import React, { useState, useEffect, useRef } from "react";
import { HourlyQuestions } from "../Components/QueastionSheet";
import { FaExclamationCircle } from "react-icons/fa";

interface QuestionProps {
  onFinish: () => void;
}

const QuestionScreen: React.FC<QuestionProps> = ({ onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const savedIndex = localStorage.getItem("currentQuestionIndex");
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });

  const [timeLeft, setTimeLeft] = useState(60);
  const cameraAllowed = true;
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const totalQuestions = HourlyQuestions.length;

  useEffect(() => {
    localStorage.setItem(
      "currentQuestionIndex",
      currentQuestionIndex.toString()
    );

    // Speak the current question
    const currentQuestion = HourlyQuestions[currentQuestionIndex]?.question;
    if (currentQuestion && !isLoading) {
      speakQuestion(currentQuestion);
    }
  }, [isLoading]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      if (currentQuestionIndex === totalQuestions - 1) {
        onFinish();
      } else {
        handleNext();
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
          console.log("Camera access denied: ", err);
        });
    }
  }, [cameraAllowed, isLoading]);

  const speakQuestion = (text: string | undefined) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  };

  const handleNext = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeLeft(60);
      }
    }, 7000);
  };

  const currentQuestion = HourlyQuestions[currentQuestionIndex]?.question;

  if (isLoading) {
    return (
      <div style={styles.Loadingcontainer}>
        <h2 style={styles.Loadingtext}>
          Thats Great! Just give me a moment to take notes ✍️
        </h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.headertext}>
          {currentQuestionIndex + 1}/{totalQuestions}
        </h2>
      </div>

      <div style={styles.questioncontainer}>
        <h3 style={styles.questionText}>{currentQuestion}</h3>
      </div>

      <div style={styles.timer}>
        <p style={styles.timerText}>Time Left: {timeLeft}s</p>
      </div>

      <div style={styles.cameracontainer}>
        {cameraAllowed && (
          <video ref={videoRef} autoPlay style={styles.videoFeed} />
        )}
      </div>

      <div style={styles.buttoncontainer}>
        {currentQuestionIndex < totalQuestions - 1 ? (
          <button onClick={handleNext} style={styles.save}>
            Save & Next
          </button>
        ) : (
          <button onClick={onFinish} style={styles.finish}>
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
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#161D29",
    color: "#FFFFFF",
    height: "100vh",
    justifyContent: "space-around",
  },
  Loadingcontainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#161D29",
    color: "#FFFFFF",
  },
  Loadingtext: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  header: {
    marginBottom: 10,
  },
  headertext: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00BFFF",
  },
  questioncontainer: {
    width: "90%",
    textAlign: "center",
    backgroundColor: "#1E2A38",
    padding: 20,
    borderRadius: 10,
  },
  questionText: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  timer: {
    padding: "10px 20px",
    backgroundColor: "#1E2A38",
    borderRadius: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  timerText: {
    color: "#FFD700",
  },
  cameracontainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap:10,
  },
  videoFeed: {
    width: "400px",
    height: "300px",
    borderRadius: 10,
    border: "2px solid #00BFFF",
    objectFit: "cover",
    objectPosition: "center",
  },
  buttoncontainer: {
    textAlign: "center",
  },
  save: {
    padding: "12px 30px",
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#00BFFF",
    border: "none",
    borderRadius: 10,
    color: "#FFFFFF",
    cursor: "pointer",
  },
  finish: {
    padding: "12px 30px",
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#FF4500",
    border: "none",
    borderRadius: 10,
    color: "#FFFFFF",
    cursor: "pointer",
  },
  instructionBox: {
    fontSize: 14,
    color: "#CCCCCC",
    display: "flex",
    flexDirection: "row",
  },
  icon: {
    marginLeft: 5,
    fontSize: 20,
    marginRight: 5,
  },
};
