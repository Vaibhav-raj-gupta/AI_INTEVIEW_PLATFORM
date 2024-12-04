// File: Instruction.js
"use client"
// File: Instruction.js
import React, { useEffect, useRef, useState } from "react";
import { FaHome, FaClock } from "react-icons/fa";

const Instruction = ({ onNext }) => {
  const [cameraAllowed, setCameraAllowed] = useState(false);
  const videoRef = useRef(null);

  // Function to request camera access
  const requestCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (stream) {
        setCameraAllowed(true);
      }
    } catch (err) {
      console.error("Camera permission denied", err);
    }
  };


  useEffect(() =>{
    requestCameraAccess();
  },[]);

  useEffect(() => {
    if (cameraAllowed) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Camera access denied: ", err);
        });
    }
  }, [cameraAllowed]);

  const instructions = [
    "Ensure stable internet and choose a clean, quiet location.",
    "Permission for access of camera, microphone, entire screen sharing is required.",
    "Be in professional attire and avoid distractions.",
    "Give a detailed response, providing as much information as you can.",
     "Answer the question with examples and projects you've worked on."
  ];

  return (
    <div style={styles.container}>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <div>
        {/* <FaCamera style={styles.icon} /> */}
        <text style={styles.companyHeading}>ZekoAi</text>
        </div>
        <div style={styles.authButton}>Login/SignUp</div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Phase 1 */}
        <div style={styles.phaseOne}>
          <h2 style={styles.heading}>Trainee Interview</h2>
          <div style={styles.videoContainer}>
          {cameraAllowed && <video ref={videoRef} autoPlay muted playsInline style={styles.videoView} />}
          </div>
        </div>

        {/* Phase 2 */}
        <div style={styles.phaseTwo}>
          <div style={styles.phaseTwoHeader}>
            <div style={styles.zekoContainer}>
              <FaHome style={styles.icon} /> Zeko
            </div>
            <div style={styles.timerContainer}>
              <FaClock style={styles.icon} /> 26 Minutes
            </div>
          </div>
          <h3 style={styles.subHeading}>Instructions</h3>
          <ul style={styles.instructionsList}>
            {instructions.map((instruction, index) => (
                <li key={index} style={styles.listItem}>
                    {instruction}
                </li>
            ))}
          </ul>
          <div style={styles.infoBox}>
            <p>Prepare yourself before starting the interview.Make sure you have a stable internet connection.Once you start, you cannot pause the interview.</p>
          </div>
          <button style={styles.startButton} onClick={onNext}>Start Now</button>
        </div>
      </div>
    </div>
  );
};

// CSS in JS
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: 0,
    margin: 0,
    backgroundColor: "#161D29",
    minHeight: "100vh",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: "10px 20px",
    borderBottom: "1px solid #ddd",
  },
  icon: {
    fontSize: "24px",
    color: "#007BFF",
  },
  companyHeading:{
    fontSize: "24px",
    color: "#007BFF",
    fontWeight:'bold'
  },
  authButton: {
    padding: "5px 15px",
    borderRadius: "20px",
    border: "1px solid #007BFF",
    color: "#007BFF",
    cursor: "pointer",
  },
  mainContent: {
    display: "flex",
    gap: "40px",
    padding: "40px",
  },
  phaseOne: {
    flex: 1,
    TextAlign:'center'
  },
  heading: {
    fontSize: "24px",
    color: "white",
    marginBottom: "20px",
    TextAlign : "left",
  },
  videoContainer: {
    width: "100%",
    height: "440px",
    border: "1px solid #ddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    overflow: "hidden", // Ensures content doesn't overflow the container
  },
  videoView: {
    width: "100%",
    height: "100%",
    objectFit: "cover", // Ensures the video fully covers the container area
    objectPosition: "center", // Keeps the video centered
  },
  cameraButton: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  phaseTwo: {
    TextAlign : "center",
    flex: 1,
  },
  phaseTwoHeader: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "20px",
  },
  zekoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "5px 15px",
    border: "1px solid #007BFF",
    borderRadius: "10px",
  },
  timerContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "5px 15px",
    border: "1px solid #007BFF",
    borderRadius: "10px",
    marginLeft: "10px",
  },
  subHeading: {
    fontSize: "22px",
    marginBottom: "10px",
    TextAlign : "left",
    margin: "0 80px 20px",
  },
  instructionsList: {
    listStyleType: "decimal",
    TextAlign : "left",
    margin: "0 100px 30px",  // Matching the subHeading margin
    maxWidth: "500px",
  },
  listItem: {
    marginBottom: "10px",  // Add margin between list items
  },
  infoBox: {
    backgroundColor: "#1E293B",
    color: "white",
    padding: "20px",
    width: "80%",
    margin: "20px auto",
    borderRadius: "5px",
    lineHeight: "1.5",
    TextAlign : "left",
  },
  startButton: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '80%',
    marginTop: '20px',
    margin: "20px 70px",
  }
}

export default Instruction;
