import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import HomePage from "./HomePage";
import Navbar from "./Navbar"; // 👈 import your navbar

function App() {
  return (
    <Router>
      <Navbar /> {/* 👈 this will render on every page */}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />

      </Routes>
    </Router>
  );
}
//hello
export default App;
