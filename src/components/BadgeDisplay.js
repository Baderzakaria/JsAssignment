// BadgeDisplay.js
// eslint-disable-next-line no-unused-vars
import React from 'react';

const BadgeDisplay = ({ imageUrl }) => (
    <div>
      <h2>Badge Preview</h2>
      <img src={imageUrl} alt="Badge" />
    </div>
);

export default BadgeDisplay;
