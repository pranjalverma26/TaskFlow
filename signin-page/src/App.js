import { Routes, Route } from "react-router-dom";
import DashboardLayout from './DashboardLayout';
import Dashboard from './Dashboard';
import PendingProjects from './PendingProjects';
import CompletedProjects from './CompletedProjects';
import AddTask from './AddTask';
import SignIn from './SignIn';
import SignUp from './SignUp';

const App = () => {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected layout & dashboard pages */}
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="pending" element={<PendingProjects />} />
        <Route path="completed" element={<CompletedProjects />} />
        <Route path="add-task" element={<AddTask />} />
      </Route>
    </Routes>
  );
};

export default App;
