import { Routes, Route } from "react-router-dom";
import DashboardLayout from './DashboardLayout';
import Dashboard from './components/Dashboard';
import PendingProjects from './components/PendingProjects';
import CompletedProjects from './components/CompletedProjects';
import AddTask from './components/AddTask';
import AddProject from './components/AddProject';
import ProjectsPage from './components/ProjectsPage'; // ✅ New page
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const App = () => {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected dashboard layout */}
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="pending" element={<PendingProjects />} />
        <Route path="completed" element={<CompletedProjects />} />
        <Route path="add-task" element={<AddTask />} />
        <Route path="add-project" element={<AddProject />} />
        <Route path="projects" element={<ProjectsPage />} /> {/* ✅ New route */}
      </Route>
    </Routes>
  );
};

export default App;
