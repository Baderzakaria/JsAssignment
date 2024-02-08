// App.js
import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import BadgeDisplay from './components/BadgeDisplay';
import { verifyBadgeImage } from './components/imageUtils';

const App = () => {
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isValid, setIsValid] = useState(false); // Define isValid state

  const handleUpload = async (file) => {
    try {
      // Perform verification logic here to determine if the image is valid
      // For example, you can call your verification function and set isValid accordingly
      const isValidImage = await verifyBadgeImage(file);

      if (isValidImage) {
        setImageUrl(URL.createObjectURL(file));
        setError(null);
        setIsValid(true); // Set isValid to true if verification passes
      } else {
        setError('Badge image does not meet the requirements.');
        setIsValid(false); // Set isValid to false if verification fails
      }
    } catch (err) {
      setError(err.message || 'Error uploading image.');
      setIsValid(false); // Set isValid to false if an error occurs
    }
  };

  return (
    <div>
      <h1>Badge Checker</h1>
      <UploadForm onUpload={handleUpload} />
      {error && <p>{error}</p>}
      {imageUrl && <BadgeDisplay imageUrl={imageUrl} isValid={isValid} />} {/* Pass isValid to BadgeDisplay */}
    </div>
  );
};

export default App;
