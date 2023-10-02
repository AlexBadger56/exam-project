import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/main/Main";
import CharacterInfo from "./components/characterCard/CharacterInfo";
import { ThemeProvider } from "./providers/ThemeProvider";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <div>
      <ThemeProvider>
        <Layout>
          <Router>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/:id" element={<CharacterInfo />} />
            </Routes>
          </Router>
        </Layout>
      </ThemeProvider>
    </div>
  );
}

export default App;
