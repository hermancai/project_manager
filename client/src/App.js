import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import Modal from "./components/Modal";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<Navbar />}>
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:id" element={<Project />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
      <Modal />
    </>
  );
}

export default App;
