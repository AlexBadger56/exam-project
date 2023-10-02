import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/main/Main";
import CharacterInfo from "./components/characterCard/CharacterInfo";

function App() {
  return (
    <div>
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
