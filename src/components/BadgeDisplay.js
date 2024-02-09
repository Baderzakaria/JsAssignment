import React from 'react';

const BadgeDisplay = ({ imageUrl, isValid }) => (
    <div>
      <h2>Badge Preview</h2>
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Badge" style={{ maxWidth: '100%', maxHeight: '200px' }} />
        </div>
      )}
    </div>
);

export default BadgeDisplay;
