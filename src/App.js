// App.js
import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import BadgeDisplay from './components/BadgeDisplay';


const App = () => {
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const handleUpload = async (file) => {
    try {
      setImageUrl(URL.createObjectURL(file));
      setError(null);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div>
      <h1>Badge Checker</h1>
      <UploadForm onUpload={handleUpload} />
      {error && <p>{error}</p>}
      {imageUrl && <BadgeDisplay imageUrl={imageUrl} />}
    </div>
  );
};

export default App;
