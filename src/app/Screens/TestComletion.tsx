const TestCompletion = () => {
    return (
      <div style={styles.container}>
        <h1 style={styles.text}>Test Completed Successfully 🎉</h1>
      </div>
    );
  };
  
  export default TestCompletion;
  
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#161D29",
      color: "#FFFFFF",
    },
    text: {
      fontSize: 26,
      fontWeight: "bold",
      textAlign: "center",
      color: "white",
    },
  };
  