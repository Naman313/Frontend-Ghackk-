import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const WebtoonDetails = () => {
  const { id } = useParams();
  const [webtoon, setWebtoon] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/webtoon/${id}`)
      .then(response => setWebtoon(response.data))
      .catch(error => console.error(error));
  }, [id]);

  return (
    webtoon && (
      <div>
        <img src={webtoon.image} alt={webtoon.title} />
        <h1>{webtoon.title}</h1>
        <p>{webtoon.description}</p>
        {/* Add comment section here */}
      </div>
    )
  );
};

export default WebtoonDetails;
