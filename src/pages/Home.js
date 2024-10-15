import React, { useState, useEffect } from 'react';
import WebtoonCard from '../components/WebtoonCard';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Home = () => {
  const [webtoons, setWebtoons] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    const fetchWebtoons = async () => {
      try {
        const response = await axios.get('/webtoons.json');
        setWebtoons(response.data);
      } catch (error) {
        console.error(error);
        setError('Failed to load webtoons. Please try again later.');
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchWebtoons();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Popular Webtoons</h1>
      
      {loading ? (
        <div className="text-center text-gray-600">Loading webtoons...</div> // Loading message
      ) : error ? (
        <div className="text-center text-red-600">{error}</div> // Error message
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {webtoons.map(webtoon => (
            <WebtoonCard key={webtoon.id} webtoon={webtoon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
