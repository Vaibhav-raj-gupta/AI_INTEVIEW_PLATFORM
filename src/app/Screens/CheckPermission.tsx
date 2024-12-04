"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaHome, FaClock, FaCamera, FaDesktop, FaVolumeUp, FaMicrophone, FaExclamationTriangle } from "react-icons/fa";

const CheckPermission = (onNext: React.MouseEventHandler<HTMLButtonElement> | undefined) => {
  const [cameraAllowed, setCameraAllowed] = useState(false);
  const [microphoneAllowed, setMicrophoneAllowed] = useState(false);
  const [screenShareAllowed, setScreenShareAllowed] = useState(false);
  const [speakerAllowed, setSpeakerAllowed] = useState(false);
  const [soundcheck, setsoundcheck] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [permissionToRequest, setPermissionToRequest] = useState("camera");
  const videoRef = useRef(null);

  // Function to request camera access
  const requestCameraPermission = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoStream) {
        setCameraAllowed(true);
        setPermissionToRequest("microphone");
      }
    } catch (err) {
      console.error("Camera permission denied", err);
      setCameraAllowed(false);
      setModalMessage("Camera permission is required to continue.");
      setShowModal(true);
    }
  };

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

  // Function to request microphone access
  const requestMicrophonePermission = async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (audioStream) {
        setMicrophoneAllowed(true);
        setPermissionToRequest("speaker");
      }
    } catch (err) {
      console.error("Microphone permission denied", err);
      setMicrophoneAllowed(false);
      setModalMessage("Microphone permission is required to continue.");
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
        setModalMessage("Speaker permission is required to continue.");
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
      setModalMessage("Screen share permission is required to continue.");
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

  const closeModal = () =>{
    if(permissionToRequest === "screenShare"){
        requestScreenSharePermission();
    }
     setShowModal(false);
  }; 

  // Function to handle checkbox click and show the relevant message
  const handleCheckboxClick = (permissionType) => {
    if (permissionType === "camera" && !cameraAllowed) {
      setModalMessage("Camera permission is required to continue.");
      setShowModal(true);
    } else if (permissionType === "microphone" && !microphoneAllowed) {
      setModalMessage("Microphone permission is required to continue.");
      setShowModal(true);
    } else if (permissionType === "speaker" && !speakerAllowed) {
      setModalMessage("Speaker permission is required to continue.");
      setShowModal(true);
    } else if (permissionType === "screenShare" && !screenShareAllowed) {
      setModalMessage("Screen share permission is required to continue.");
      setShowModal(true);
    }
  };

  const isAllPermissionsGranted = cameraAllowed && microphoneAllowed && speakerAllowed && screenShareAllowed;

  return (
    <div style={styles.container}>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <div>
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
          <h3 style={styles.subHeading}>Ready To Join?</h3>
          <h3 style={styles.discriptionText}>
            Please make sure your device is properly configured.
          </h3>
          <div>
            <div style={styles.checkBoxContainer}>
              <div style={styles.checkBox}>
                <div style={styles.checkBoxLeft}>
                  <FaCamera style={styles.icon} />
                  <label style={styles.checkboxLabel}>Check Camera</label>
                </div>
                <input
                  type="checkbox"
                  style={styles.checkbox}
                  checked={cameraAllowed}
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
                  checked={microphoneAllowed}
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
             <div style={styles.soundcheckContainer}>
                <span style={styles.soundText}>Are you able to listen to the sound?</span>
                <button style={styles.soundcheckButton} onClick={handleSoundCheck}>Yes</button>
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
                <button style={styles.startButton} onClick={onNext}>Start Now</button> :
                <button style={styles.disableButton} disabled>Start Now</button>
            }
          
        </div>
      </div>

      {/* Modal for warning */}
      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            {/* Warning Icon */}
            <div style={styles.warningIconContainer}>
              <FaExclamationTriangle style={styles.warningIcon} />
            </div>

            {/* Header Message */}
            <h2 style={styles.modalHeader}>Permission Required</h2>

            {/* Modal Message */}
            <p style={styles.modalMessage}>{modalMessage}</p>

            {/* Close Button */}
            <button style={styles.modalCloseButton} onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
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
  companyHeading: {
    fontSize: "24px",
    color: "#007BFF",
    fontWeight: "bold",
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
    TextAlign: "center",
  },
  heading: {
    fontSize: "24px",
    color: "white",
    marginBottom: "20px",
    TextAlign: "left",
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
  phaseTwo: {
    TextAlign: "center",
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
    TextAlign: "left",
    margin: "0 80px 0px",
  },
  discriptionText: {
    fontSize: "16px",
    marginBottom: "10px",
    TextAlign: "left",
    margin: "0 80px 20px",
    color: "gray",
  },


  checkBoxContainer: {
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
  startButton: {
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
  disableButton: {
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
  soundcheckContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "5px 20px",
    marginTop:'-25px',
    backgroundColor: "#161D29",
  },
  soundText: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
  },
  soundcheckButton: {
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
  modalContent: {
    backgroundColor: "#0D1119",
    padding: "20px",
    borderRadius: "5px",
    width: "450px",
    height:"300px",
    textAlign: "center",
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

export default CheckPermission;
