"use client"
import React, { useEffect, useRef, useState } from "react";
import { FaHome, FaClock } from "react-icons/fa";
import { HourlyQuestions } from "../Components/QueastionSheet";
interface CheckInstructionProps {
    onNext: () => void;
  }
  
const Instruction : React.FC<CheckInstructionProps> = ({ onNext }) => {
  const [camerapermission, setcamerapermission] = useState(false);
  const videoref = useRef<HTMLVideoElement | null>(null);

  const requestCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (stream) {
        setcamerapermission(true);
      }
    } catch (err) {
      console.log("Camera permission denied", err);
    }
  };


  useEffect(() =>{
    requestCameraAccess();
  },[]);

//   console.log(camerapermission,"tttttttttttttttttt");

useEffect(() => {
    if (camerapermission && videoref.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => { videoref.current!.srcObject = stream; })
        .catch((err) => console.error("Camera access denied: ", err));
    }
  }, [camerapermission]);

  const instructions = [
    "Ensure stable internet and choose a clean, quiet location.",
    "Permission for access of camera, microphone, entire screen sharing is required.",
    "Be in professional attire and avoid distractions.",
    "Give a detailed response, providing as much information as you can.",
     "Answer the question with examples and projects you've worked on."
  ];

  const totalQuestions = HourlyQuestions.length;

  return (
    <div style={styles.container}>
      <div style={styles.TopBar}>
        <div>
        <text style={styles.TopbarHeading}>ZekoAi</text>
        </div>
        <div style={styles.LoginButton}>Login/SignUp</div>
      </div>

      <div style={styles.Maincontentainer}>
        <div style={styles.part1}>
          <h2 style={styles.heading}>Trainee Interview</h2>
          <div style={styles.cameracontainer}>
          {camerapermission && <video ref={videoref} autoPlay muted playsInline style={styles.videoview} />}
          </div>
        </div>

        <div style={styles.part2}>
          <div style={styles.part2Header}>
            <div style={styles.zekocontainer}>
              <FaHome style={styles.icon} /> Zeko
            </div>
            <div style={styles.timer}>
              <FaClock style={styles.icon} /> {totalQuestions} Minutes
            </div>
          </div>
          <h3 style={styles.subheading}>Instructions</h3>
          <ul style={styles.instructionsList}>
            {instructions.map((instruction, index) => (
                <li key={index} style={styles.listItem}>
                    {instruction}
                </li>
            ))}
          </ul>
          <div style={styles.infobox}>
            <p>Prepare yourself before starting the interview.Make sure you have a stable internet connection.Once you start, you cannot pause the interview.</p>
          </div>
          <button style={styles.button} onClick={onNext}>Start Now</button>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "#161D29",
    minHeight: "100vh",
  },
  TopBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: "10px 20px",
    borderBottom: "1px solid #ddd",
  },
  icon: {
    fontSize: 24,
    color: "#007BFF",
  },
  TopbarHeading:{
    fontSize: 24,
    color: "#007BFF",
    fontWeight:'bold'
  },
  LoginButton: {
    padding: "5px 15px",
    borderRadius: 20,
    border: "1px solid #007BFF",
    color: "#007BFF",
    cursor: "pointer",
  },
  Maincontentainer: {
    display: "flex",
    gap: 40,
    padding: 40,
  },
  part1: {
    flex: 1,
    textAlign:'center'
  },
  heading: {
    fontSize: 24,
    color: "white",
    marginBottom: 20,
    textAlign : "left",
  },
  cameracontainer: {
    width: "100%",
    height: 440,
    border: "1px solid #ddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  videoview: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
  },
  part2: {
    textAlign : "center",
    flex: 1,
  },
  part2Header: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  zekocontainer: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "5px 15px",
    border: "1px solid #007BFF",
    borderRadius: 10,
  },
  timer: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "5px 15px",
    border: "1px solid #007BFF",
    borderRadius: 10,
    marginLeft: 10,
  },
  subheading: {
    fontSize: 22,
    marginBottom: 10,
    textAlign : "left",
    margin: "0 80px 20px",
  },
  instructionsList: {
    listStyleType: "decimal",
    textAlign : "left",
    margin: "0 100px 30px",
    maxWidth: 500,
  },
  listItem: {
    marginBottom: "10px",
  },
  infobox: {
    backgroundColor: "#1E293B",
    color: "white",
    padding: 20,
    width: "80%",
    margin: "20px auto",
    borderRadius: 5,
    textAlign : "left",
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    width: '80%',
    marginTop: 20,
    margin: "20px 70px",
  }
}

export default Instruction;
