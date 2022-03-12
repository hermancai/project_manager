import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* <Route element={<Navbar />}>
            <Route path="/projects" element={<Projects />} />
          </Route> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
