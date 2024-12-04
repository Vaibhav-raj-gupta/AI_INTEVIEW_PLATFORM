"use client";
import React, { useState, useEffect } from "react";
import Instruction from "./Screens/Instruction";
import CheckPermission from "./Screens/CheckPermission";
import QuestionScreen from "./Screens/QuestionScreen";
import TestCompletion from "./Screens/TestComletion";
import { FaExclamationTriangle } from "react-icons/fa";

const Home = () => {
  const [currentScreen, setCurrentScreen] = useState(1); // 1: Instruction, 2: CheckPermission, 3: QuestionScreen, 4: TestCompletion
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true); // State to track if the device is desktop

  // Effect to check the screen width and adjust the app's behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth > 768); // Set desktop if width is greater than 768px
    };

    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize); // Listen for resize events

    return () => {
      window.removeEventListener("resize", checkScreenSize); // Clean up the event listener
    };
  }, []);

  const handleStartTest = () => {
    const testCompleted = localStorage.getItem("testCompleted");

    if (testCompleted === "true") {
      if (isDesktop) {
        setModalMessage("You have already completed this test. Retaking is not allowed at this time. If you believe this is a mistake, please contact the administrator for assistance.");
        setShowModal(true);
      }
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

  // Render nothing or a message on mobile devices
  if (!isDesktop) {
    return (
      <div style={styles.mobileMessageContainer}>
        <h2 style={styles.mobileMessage}>This app is only available on desktop devices.Switch to Desktop mode</h2>
      </div>
    );
  }

  return (
    <div>
      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.warningIconContainer}>
              <FaExclamationTriangle style={styles.warningIcon} />
            </div>
            <h2 style={styles.modalHeader}>Test Already Attempted</h2>
            <p style={styles.modalMessage}>{modalMessage}</p>
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

const styles: { [key: string]: React.CSSProperties } = {
  modal: {
    position: "fixed",
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
    height: "400px",
    textAlign: "center",
  },
  warningIconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },
  warningIcon: {
    fontSize: "80px",
    color: "orange",
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
  mobileMessageContainer: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#0D1119",
    color: "#CDD1DB",
  },
  mobileMessage: {
    fontSize: "24px",
    color: "white",
  },
};
