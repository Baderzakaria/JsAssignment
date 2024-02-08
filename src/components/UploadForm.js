import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { verifyBadgeImage } from './imageUtils'; // Import the verifyBadgeImage function
import BadgeDisplay from './BadgeDisplay'; // Assuming BadgeDisplay.js is in the same directory

const UploadForm = ({ onUpload }) => {
  const [imageUrl, setImageUrl] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/png',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      verifyBadgeImage(file)
        .then(() => {
          const imageUrl = URL.createObjectURL(file);
          setImageUrl(imageUrl);
          onUpload(file);
        })
        .catch((err) => {
          console.error('Error verifying image:', err);
          // Handle error or display error message
        });
    },
  });

  return (
    <div>
      <h2>Upload Badge Image</h2>
      <div {...getRootProps()} style={{
        border: '1px dashed', padding: '20px', textAlign: 'center', cursor: 'pointer',
      }}>
        <input {...getInputProps()} />
        {
          isDragActive
            ? <p>Drop the file here ...</p>
            : <p>Drag 'n' drop a PNG image here, or click to select a file</p>
        }
      </div>
    </div>
  );
};

export default UploadForm;
