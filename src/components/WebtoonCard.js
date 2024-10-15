import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WebtoonCard = ({ webtoon }) => {
  const [isFavorite, setIsFavorite] = useState(false); // State to track if the webtoon is a favorite
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/webtoon/${webtoon.id}`); // Navigate to the details page using the webtoon ID
  };

  const handleAddToFavorites = async (webtoonId) => {
    const user = JSON.parse(localStorage.getItem('user')); // Ensure this is the correct user object
  
    try {
      const response = await fetch('http://localhost:5000/fav/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,  // Send the user's ID
          webtoonId: webtoonId // Send the selected webtoon ID
        }),
      });
  
      if (response.ok) {
        // const data = await response.json();
        setIsFavorite(true); // Update the state when added to favorites successfully
        alert('Webtoon added to favorites!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      alert('An error occurred while adding to favorites.');
    }
  };
  
  return (
    <div className="border rounded-lg shadow-md overflow-hidden">
      <img
        src={webtoon.thumbnail} 
        alt={webtoon.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{webtoon.title}</h2>
        <p className="text-gray-600 text-sm mt-2">{webtoon.description}</p>
        
        <button
          onClick={handleViewDetails} // Call the function on button click
          className="inline-block mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          View Details
        </button>
        
        <button
  onClick={() => handleAddToFavorites(webtoon.id)} // Use the 'id' from the provided list
  className={`inline-block mt-2 ${isFavorite ? 'bg-gray-300' : 'bg-yellow-500'} text-white py-2 px-4 rounded hover:bg-yellow-600 transition`}
  disabled={isFavorite}
>
  {isFavorite ? 'Added to Favorites' : 'Add to Favorites'}
</button>
      </div>
    </div>
  );
};

export default WebtoonCard;
