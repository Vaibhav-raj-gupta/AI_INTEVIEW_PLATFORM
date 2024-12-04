"use client";
import React, { useState } from "react";
import Instruction from "./Screens/Instruction";
import CheckPermission from "./Screens/CheckPermission";
import QuestionScreen from "./Screens/QuestionScreen";
import TestCompletion from "./Screens/TestComletion";
import { FaExclamationTriangle } from "react-icons/fa";

const Home = () => {
  const [currentScreen, setCurrentScreen] = useState(1); // 1: Instruction, 2: CheckPermission, 3: QuestionScreen, 4: TestCompletion
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleStartTest = () => {
    const testCompleted = localStorage.getItem("testCompleted");

    if (testCompleted === "true") {
      setModalMessage("You have already completed this test. Retaking is not allowed at this time. If you believe this is a mistake, please contact the administrator for assistance.");
      setShowModal(true);
    } else {
      setCurrentScreen(3); // Navigate to QuestionScreen
    }
  };

  const handleFinishTest = () => {
    setCurrentScreen(4); // Navigate to TestCompletion screen
    localStorage.setItem("testCompleted", "true"); // Mark test as completed
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
            {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            {/* Warning Icon */}
            <div style={styles.warningIconContainer}>
              <FaExclamationTriangle style={styles.warningIcon} />
            </div>

            {/* Header Message */}
            <h2 style={styles.modalHeader}>Test Already Attempted</h2>

            {/* Modal Message */}
            <p style={styles.modalMessage}>{modalMessage}</p>

            {/* Close Button */}
            <button style={styles.modalCloseButton} onClick={handleModalClose}>Understood</button>
          </div>
        </div>
      )}
      {currentScreen === 1 && <Instruction onNext={() => setCurrentScreen(2)} />}
      {currentScreen === 2 && <CheckPermission onNext={handleStartTest} />}
      {currentScreen === 3 && <QuestionScreen onFinish={handleFinishTest} />}
      {currentScreen === 4 && <TestCompletion />}
    </div>
  );
};

export default Home;

const styles = {
  modal: {
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#0D1119",
    padding: "20px",
    borderRadius: "5px",
    width: "450px",
    height:"400px",
    TextAlign: "center",
  },
  warningIconContainer: {
    display: "flex",  // Make the container a flexbox
    justifyContent: "center",  // Center horizontally
    alignItems: "center",  // Center vertically
    marginBottom: "20px", // Space between icon and header
  },
  warningIcon: {
    fontSize: "80px",
    color: "orange", // Orange color for the warning icon
  },
  modalHeader: {
    fontSize: "30px",
    marginBottom: "10px",
    color: "#CDD1DB",
  },
  modalMessage: {
    fontSize: "20px",
    marginBottom: "20px",
    color: "#CDD1DB",
  },
  modalCloseButton: {
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
};
