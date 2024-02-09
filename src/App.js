import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import BadgeDisplay from './components/BadgeDisplay';
import { verifyBadgeImage } from './components/imageUtils';

const App = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);

  const handleUpload = async (file) => {
    try {
      const result = await verifyBadgeImage(file);
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
      {verificationResult && <p>{verificationResult}</p>}
      {<BadgeDisplay imageUrl={imageUrl} isValid={verificationResult} />}
    </div>
  );
};

export default App;
