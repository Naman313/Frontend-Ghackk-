import React, { useEffect, useState } from 'react';
import WebtoonCard from '../components/WebtoonCard'; // Assuming you have a WebtoonCard component
import axios from 'axios';

const Favorites = () => {

  const [favorites, setFavorites] = useState([]);
  const [webtoons, setWebtoons] = useState([]);
  useEffect(() => {
    const fetchWebtoons = async () => {
      try {
        const response = await axios.get('/webtoons.json');
        setWebtoons(response.data);
      } catch (error) {
        
      } finally {
        console.log("hurrah")// Stop loading regardless of success or failure
      }
    };

    fetchWebtoons();
  }, []);
  useEffect(() => {
    const fetchFavorites = async () => {
      const user = JSON.parse(localStorage.getItem('user')); // Get user from local storage
      try {
        const response = await fetch(`https://backend-ghackk-1.onrender.com//fav/${user._id}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setFavorites(data.favorites); // This is the array of favorite webtoon IDs
        } else {
          console.error('Failed to load favorites');
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  // Find the webtoons that match the user's favorite webtoon IDs
  const favoriteWebtoons = webtoons.filter(webtoon => favorites.includes(webtoon.id));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Favorite Webtoons</h1>
      <p className="text-gray-600 text-lg text-center mb-4">Here are all your favorite webtoons!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {favoriteWebtoons.length > 0 ? (
          favoriteWebtoons.map((webtoon) => (
            <WebtoonCard key={webtoon.id} webtoon={webtoon} />  // Render WebtoonCard for each favorite webtoon
          ))
        ) : (
          <p className="text-center">No favorites yet!</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
