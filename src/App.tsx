import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';  
import AuthenticatePage from './AuthenticationPage'
import {SignUpComponent} from './authorization/SignUpComponent';
import ErrorBoundary from "./errorFeatures/ErrorBoundary";

const App: React.FC = () => {

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/authenticate" element={<AuthenticatePage />} />
          <Route path="/signup" element={<SignUpComponent />} />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/authenticate" />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;




  



