import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import BadgeDisplay from './components/BadgeDisplay';
import { verifyAverageColor, verifyBadgeImage } from './components/imageUtils';

const App = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [Average, setAverage] = useState(null);

  const handleUpload = async (file) => {
    try {
      const result = await verifyBadgeImage(file);
      const average = await verifyAverageColor(file);
      setAverage(average);
      setImageUrl(URL.createObjectURL(file));
      setVerificationResult(result);
    } catch (err) {
      console.error('Error verifying image:', err);
      setVerificationResult('Error processing image. Please try again.');
      setImageUrl(null);
    }
  };

  return (
    <div>
      <h1>Badge Checker</h1>
      <UploadForm onUpload={handleUpload} />
      {<BadgeDisplay imageUrl={imageUrl} />}
      {verificationResult && <p>{verificationResult}</p>}
      {Average && <p>Average : {Average}</p>}
    </div>
  );
};

export default App;
