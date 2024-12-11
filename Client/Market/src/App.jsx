import { useNavigate } from "react-router";
import "./App.css";
import Navigator from "./userComps/SigningNavigator";
import { useState, useEffect } from "react";
function App() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!sessionStorage.userID) {
  //     navigate("/");
  //   }
  // }, []);
  return (
    <div>
      <Navigator />
    </div>
  );
}

export default App;
