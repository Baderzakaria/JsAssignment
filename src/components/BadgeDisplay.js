import React from 'react';

const BadgeDisplay = ({ imageUrl, isValid }) => {
  return (
    <div>
      <h2>Badge Preview</h2>
      {isValid ? (
        <img src={imageUrl} alt="Badge" style={{ maxWidth: '100%', maxHeight: '200px' }} />
      ) : (
        <p>Sorry, the badge image does not meet the requirements.</p>
      )}
    </div>
  );
};

export default BadgeDisplay;
