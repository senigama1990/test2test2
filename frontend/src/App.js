import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import SearchPage from './components/SearchPage.js';
import AuthForm from './components/AuthForm.js';
import AdminPanel from './components/AdminPanel.js';

export default function App() {
  const [role, setRole] = useState(null);
  return (
    <Router>
      <Navbar role={role} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/auth" element={<AuthForm setRole={setRole} />} />
        {role === 'admin' && <Route path="/add" element={<AdminPanel />} />}
      </Routes>
    </Router>
  );
}
