import React, { useState, useEffect } from 'react';

function App() {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDogImage() {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        setImageUrl(data.message);
      } catch (error) {
        console.error('Error fetching dog image:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDogImage();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (imageUrl) {
    return <img src={imageUrl} alt="A Random Dog" />;
  }

  return <p>Failed to load image.</p>;
}

export default App;