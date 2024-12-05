"use client";
import React, { useState, useEffect } from "react";
import Instruction from "./Screens/Instruction";
import CheckPermission from "./Screens/CheckPermission";
import QuestionScreen from "./Screens/QuestionScreen";
import TestCompletion from "./Screens/TestComletion";
import { FaExclamationTriangle } from "react-icons/fa";

const Home = () => {
  const [Screen, setScreen] = useState(1);
  const [message, setmessage] = useState("");
  const [modal, setmodal] = useState(false);
  const [isdesktop, setisdesktop] = useState(true);
 
  useEffect(() => {
    const checkScreenSize = () => {setisdesktop(window.innerWidth > 768);};
    checkScreenSize(); 
  }, []);

  const handleStartTest = () => {
    const testCompleted = localStorage.getItem("testCompleted");

    if (testCompleted === "true") {
      if (isdesktop ===true) {
        setmessage("You have already completed this test. Retaking is not allowed at this time. If you believe this is a mistake, please contact the administrator for assistance.");
        setmodal(true);
      }
    } else {
      setScreen(3);
    }
  };

  const handleFinishTest = () => {
    setScreen(4);
    localStorage.setItem("testCompleted", "true");
  };

  const handleModalClose = () => { setmodal(false);};

  if (isdesktop === false) {
    return (
      <div style={styles.mobileMessageContainer}>
        <h2 style={styles.mobileMessage}>This app is only available on desktop devices.Switch to Desktop mode</h2>
      </div>
    );
  }

  return (
    <div>
      {modal && (
        <div style={styles.modal}>
        <div style={styles.modaldetails}>
        <div style={styles.warningiconcontainer}>
        <FaExclamationTriangle style={{fontSize: "80px",color: "orange",}} />
        </div>
        <h2 style={styles.modalheader}>Test Already Attempted</h2>
        <p style={styles.message}>{message}</p>
        <button style={styles.closebutton} onClick={handleModalClose}>Understood</button>
        </div>
        </div>
      )}
      {Screen === 1 && <Instruction onNext={() => setScreen(2)} />}
      {Screen === 2 && <CheckPermission onNext={handleStartTest} />}
      {Screen === 3 && <QuestionScreen onFinish={handleFinishTest} />}
      {Screen === 4 && <TestCompletion />}
    </div>
  );
};

export default Home;

const styles: { [key: string]: React.CSSProperties } = {
  modal: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    width: "100%",
    height: "100%"
  },
  modaldetails: {
    backgroundColor: "#0D1119",
    width: "450px",
    height: "400px",
    textAlign: "center",
    padding: 20,
    borderRadius: 6
  },
  warningiconcontainer: {
    marginBottom: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modalheader: {
    fontSize: 30,
    marginBottom: 10,
    color: "#CDD1DB"
  },
  message: {
    fontSize: 20,
    marginBottom: 20,
    color: "#CDD1DB"
  },
  closebutton: {
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    width: "100%",
    padding:10,
    borderRadius: 6,
    cursor: "pointer"
  },
  mobileMessageContainer: {
    textAlign: "center",
    padding: 20,
    backgroundColor: "#0D1119",
    color: "#CDD1DB"
  },
  mobileMessage: {
    fontSize: 24,
    color: "white"
  },
};
