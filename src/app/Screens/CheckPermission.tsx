"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaHome, FaClock, FaCamera, FaDesktop, FaVolumeUp, FaMicrophone, FaExclamationTriangle } from "react-icons/fa";
import { HourlyQuestions } from "../Components/QueastionSheet";

interface CheckPermissionProps {
    onNext: () => void;
  }

  const CheckPermission: React.FC<CheckPermissionProps> = ({ onNext }) => {
  const [camera, setcamera] = useState(false);
  const [microphone, setmicrophone] = useState(false);
  const [screenShareAllowed, setScreenShareAllowed] = useState(false);
  const [speakerAllowed, setSpeakerAllowed] = useState(false);
  const [soundcheck, setsoundcheck] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setmessage] = useState("");
  const [permissionToRequest, setPermissionToRequest] = useState("camera");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Function to request camera access
  const requestCameraPermission = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoStream) {
        setcamera(true);
        setPermissionToRequest("microphone");
      }
    } catch (err) {
      console.error("Camera permission denied", err);
      setcamera(false);
      setmessage("Camera permission is required to continue.");
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (camera) {
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
  }, [camera]);

  // Function to request microphone access
  const requestMicrophonePermission = async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (audioStream) {
        setmicrophone(true);
        setPermissionToRequest("speaker");
      }
    } catch (err) {
      console.error("Microphone permission denied", err);
      setmicrophone(false);
      setmessage("Microphone permission is required to continue.");
      setShowModal(true);
    }
  };

  // Function to check if the speaker works (not a permission per se, but we can test the audio playback)
  const checkSpeakerPermission = () => {
    const audio = new Audio();
    audio.src = "/soundcheck.mp3";
    audio.play()
      .then(() => {
        // setSpeakerAllowed(true);
        // setPermissionToRequest("screenShare");
        setsoundcheck(true);
      })
      .catch(() => {
        setSpeakerAllowed(false);
        setmessage("Speaker permission is required to continue.");
        setShowModal(true);
      });
  };

  const handleSoundCheck = () =>{
        setSpeakerAllowed(true);
        setPermissionToRequest("screenShare");
        setsoundcheck(false);
  };

  // Function to request screen sharing access
  const requestScreenSharePermission = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      if (screenStream) {
        setScreenShareAllowed(true);
      }
    } catch (err) {
      console.log("Screen share permission denied", err);
      setScreenShareAllowed(false);
      setmessage("Screen share permission is required to continue.");
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (permissionToRequest === "camera") {
      requestCameraPermission();
    } else if (permissionToRequest === "microphone") {
      requestMicrophonePermission();
    } else if (permissionToRequest === "speaker") {
      checkSpeakerPermission();
    } else if (permissionToRequest === "screenShare") {
      requestScreenSharePermission();
    }
  }, [permissionToRequest]);

  console.log("camera",camera);
  console.log("microphone",microphone);
  console.log("speaker",speakerAllowed);
  console.log("screenshare",screenShareAllowed);

  const closeModal = () =>{
    if(permissionToRequest === "screenShare"){
        requestScreenSharePermission();
    }
     setShowModal(false);
  }; 

  // Function to handle checkbox click and show the relevant message
  const handleCheckboxClick = (permissionType: "camera" | "microphone" | "speaker" | "screenShare") => {
    if (permissionType === "camera" && !camera) {
      setmessage("Camera permission is required to continue.");
      setShowModal(true);
    } else if (permissionType === "microphone" && !microphone) {
      setmessage("Microphone permission is required to continue.");
      setShowModal(true);
    } else if (permissionType === "speaker" && !speakerAllowed) {
      setmessage("Speaker permission is required to continue.");
      setShowModal(true);
    } else if (permissionType === "screenShare" && !screenShareAllowed) {
      setmessage("Screen share permission is required to continue.");
      setShowModal(true);
    }
  };

  const isAllPermissionsGranted = camera && microphone && speakerAllowed && screenShareAllowed;
  const totalQuestions = HourlyQuestions.length;

  return (
    <div style={styles.container}>
      <div style={styles.TopBar}>
        <div>
          <text style={styles.topheading}>ZekoAi</text>
        </div>
        <div style={styles.LoginButton}>Login/SignUp</div>
      </div>

      <div style={styles.maincontainer}>
        <div style={styles.part1}>
          <h2 style={styles.heading}>Trainee Interview</h2>
          <div style={styles.cameracontainer}>
            {camera && <video ref={videoRef} autoPlay muted playsInline style={styles.videoView} />}
          </div>
        </div>

        <div style={styles.part2}>
          <div style={styles.part2Header}>
            <div style={styles.zekoContainer}>
              <FaHome style={styles.icon} /> Zeko
            </div>
            <div style={styles.timer}>
              <FaClock style={styles.icon} /> {totalQuestions} Minutes
            </div>
          </div>
          <h3 style={styles.subheading}>Ready To Join?</h3>
          <h3 style={styles.discriptiontext}>
            Please make sure your device is properly configured.
          </h3>
          <div>
            <div style={styles.checkboxcontainer}>
              <div style={styles.checkBox}>
                <div style={styles.checkBoxLeft}>
                  <FaCamera style={styles.icon} />
                  <label style={styles.checkboxLabel}>Check Camera</label>
                </div>
                <input
                  type="checkbox"
                  style={styles.checkbox}
                  checked={camera}
                  onClick={() => handleCheckboxClick("camera")}
                />
              </div>

              <div style={styles.checkBox}>
                <div style={styles.checkBoxLeft}>
                  <FaMicrophone style={styles.icon} />
                  <label style={styles.checkboxLabel}>Check Microphone</label>
                </div>
                <input
                  type="checkbox"
                  style={styles.checkbox}
                  checked={microphone}
                  onClick={() => handleCheckboxClick("microphone")}
                />
              </div>

              <div style={styles.checkBox}>
                <div style={styles.checkBoxLeft}>
                  <FaVolumeUp style={styles.icon} />
                  <label style={styles.checkboxLabel}>Check Speaker</label>
                </div>
                <input
                  type="checkbox"
                  style={styles.checkbox}
                  checked={speakerAllowed}
                  onClick={() => handleCheckboxClick("speaker")}
                />
              </div>

             {soundcheck && 
             <div style={styles.soundcheckcontainer}>
                <span style={styles.soundtext}>Are you able to listen to the sound?</span>
                <button style={styles.soundbutton} onClick={handleSoundCheck}>Yes</button>
              </div>}

              <div style={styles.checkBox}>
                <div style={styles.checkBoxLeft}>
                  <FaDesktop style={styles.icon} />
                  <label style={styles.checkboxLabel}>Enable Screen Share</label>
                </div>
                <input
                  type="checkbox"
                  style={styles.checkbox}
                  checked={screenShareAllowed}
                  onClick={() => handleCheckboxClick("screenShare")}
                />
              </div>
            </div>
          </div>
          {
            isAllPermissionsGranted ? 
                <button style={styles.button} onClick={onNext}>Start Now</button> :
                <button style={styles.disablebutton} disabled>Start Now</button>
            }
          
        </div>
      </div>

      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalcontainer}>
            <div style={styles.warningIconContainer}>
              <FaExclamationTriangle style={styles.warningIcon} />
            </div>
            <h2 style={styles.modalHeader}>Permission Required</h2>
            <p style={styles.message}>{message}</p>
            <button style={styles.modalCloseButton} onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
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
    fontSize: "24px",
    color: "#007BFF",
  },
  topheading: {
    fontSize: "24px",
    color: "#007BFF",
    fontWeight: "bold",
  },
  LoginButton: {
    padding: "5px 15px",
    borderRadius: "20px",
    border: "1px solid #007BFF",
    color: "#007BFF",
    cursor: "pointer",
  },
  maincontainer: {
    display: "flex",
    gap: "40px",
    padding: "40px",
  },
  part1: {
    flex: 1,
    textAlign: "center",
  },
  heading: {
    fontSize: "24px",
    color: "white",
    marginBottom: "20px",
    textAlign: "left",
  },
  cameracontainer: {
    width: "100%",
    height: "440px",
    border: "1px solid #ddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    overflow: "hidden",
  },
  videoView: {
    width: "100%",
    height: "100%",
    objectFit : "cover",
    objectPosition: "center",
  },
  part2: {
    textAlign: "center",
    flex: 1,
  },
  part2Header: {
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
  timer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "5px 15px",
    border: "1px solid #007BFF",
    borderRadius: "10px",
    marginLeft: "10px",
  },
  subheading: {
    fontSize: "22px",
    textAlign: "left",
    margin: "0 80px 0px",
  },
  discriptiontext: {
    fontSize: "16px",
    marginBottom: "10px",
    textAlign: "left",
    margin: "0 80px 20px",
    color: "gray",
  },


  checkboxcontainer: {
    alignItems: "center",
    margin: "0 80px 20px",
  },
  checkBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #007BFF",
    borderRadius: "10px",
    margin: "25px 0",
    padding: "15px 20px",
  },
  checkBoxLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  checkboxLabel: {
    fontSize: "16px",
    color: "#fff",
  },
  checkbox: {
    width: "20px",
    height: "20px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "78%",
    marginTop: "20px",
    margin: "0 80px 20px",
  },
  disablebutton: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "not-allowed",
    width: "78%",
    marginTop: "20px",
    margin: "0 80px 20px",
  },
  soundcheckcontainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "5px 20px",
    marginTop:'-25px',
    backgroundColor: "#161D29",
  },
  soundtext: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
  },
  soundbutton: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
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
  modalcontainer: {
    backgroundColor: "#0D1119",
    padding: "20px",
    borderRadius: "5px",
    width: "450px",
    height:"300px",
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
  message: {
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

export default CheckPermission;
