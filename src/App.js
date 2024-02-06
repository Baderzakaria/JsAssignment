// App.js
import React, { useState } from 'react';
import UploadForm from './components/UploadForm';

const App = () => {
  const [error, setError] = useState(null);

  const handleUpload = async (file) => {
    try {
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
    </div>
  );
};

export default App;
