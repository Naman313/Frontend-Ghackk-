// src/pages/WebtoonDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const WebtoonDetails = () => {
  const { id } = useParams();
  const [webtoon, setWebtoon] = useState(null);

  useEffect(() => {
    // Fetch the webtoon details from the JSON file or API
    axios.get(`/webtoons.json`)
      .then(response => {
        const webtoonData = response.data.find(w => w.id === parseInt(id));  // Parse ID as an integer
        setWebtoon(webtoonData);
      })
      .catch(error => console.error(error));
  }, [id]);

  if (!webtoon) {
    return <div>Loading...</div>;  // Show a loading message while data is being fetched
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center">
        <img
          src={webtoon.thumbnail}
          alt={webtoon.title}
          className="w-full md:w-1/2 object-cover rounded-lg shadow-md"
        />
        <div className="mt-6 md:mt-0 md:ml-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{webtoon.title}</h1>
          <p className="text-gray-600 text-lg">{webtoon.description}</p>
        </div>
      </div>
    </div>
  );
};

export default WebtoonDetails;
