"use client"
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
// import { useRouter } from "next/router";

function HomeScreen() {
  return <h1>Home Screen</h1>;
}

function InstructionScreen() {
  return <h1>Instruction Screen</h1>;
}

export default function NavigationStack() {
  const [screen, setScreen] = useState("home");
  const router = useRouter();

  useEffect(() => {
    // Update the URL based on the current screen
    router.push(`/${screen}`, undefined, { shallow: true });
  }, [screen]);

  return (
    <div>
      {screen === "home" && <HomeScreen />}
      {screen === "instruction" && <InstructionScreen />}
      <button onClick={() => setScreen("home")}>Go to Home</button>
      <button onClick={() => setScreen("instruction")}>Go to Instruction</button>
    </div>
  );
}
