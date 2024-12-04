const TestCompletion = () => {
    return (
      <div style={styles.container}>
        <h1 style={styles.text}>Test Completed Successfully 🎉</h1>
      </div>
    );
  };
  
  export default TestCompletion;
  
  // Inline styles for centering and styling
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#161D29", // Background color for a professional look
      color: "#FFFFFF", // Text color
      fontFamily: "Arial, sans-serif",
    },
    text: {
      fontSize: "26px", // Larger text size
      fontWeight: "bold",
      textAlign: "center",
      color: "white", // Bright color for emphasis
    },
  };
  