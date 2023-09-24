import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/main/Main";
import CharacterInfo from "./components/characterCard/CharacterInfo";
import Button from "react-bootstrap/Button";

function App() {
  const [colorTheme, setColorTheme] = useState("light");
  const changeTheme = () => {
    let isActive = colorTheme === "light" ? "dark" : "light";
    setColorTheme(isActive);
  };
  return (
    <div className={colorTheme + " main"}>
      <Button variant="primary" onClick={changeTheme}>
        Change
      </Button>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:id" element={<CharacterInfo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
