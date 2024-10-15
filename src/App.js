import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Favorites from './pages/Favorites'
import WebtoonDetails from './pages/WebtoonDetails'
import Home from './pages/Home';
import SignUp from './pages/signup';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/webtoon/:id" element={<WebtoonDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
