import React from 'react';
import { Routes, Route } from 'react-router-dom';

import DashboardLayout from './DashboardLayout';
import Dashboard from './Dashboard';
import PendingProjects from './PendingProjects';
import CompletedProjects from './CompletedProjects';
import AddTask from './AddTask';

import SignIn from './SignIn';    // Make sure file name matches exactly
import SignUp from './SignUp';    // Same here

const App = () => {
  return (
    <Routes>
      {/* Auth Routes (outside dashboard layout) */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Main app layout (with sidebar + navbar) */}
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
