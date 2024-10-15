import React from 'react';
import { Link } from 'react-router-dom';
// import {Home} from '../pages/Home'

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/Home" className="text-white text-lg font-semibold">Webtoon Library</Link>
        <div>
          <Link to="/Home" className="text-white mx-4 hover:text-gray-200">Home</Link>
          <Link to="/favorites" className="text-white hover:text-gray-200">Favorites</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
