import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Projects from "./components/Projects";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen w-full">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<Navbar />}>
            <Route path="/" element={<Projects />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
