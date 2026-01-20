import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Home from './pages/Home.js';
import Search from './pages/Search.js';
import Compare from './pages/Compare.js';
import Admin from './pages/Admin.js';

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
