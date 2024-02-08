// imageUtils.js

// Function to verify the badge image
export const verifyBadgeImage = (file) => new Promise((resolve, reject) => {
  if (file.type !== 'image/png') {
    reject('Invalid image format. Please upload a PNG image.');
    return;
  }

  const image = new Image();
  image.onload = () => {
    if (image.width !== 512) {
      reject('Invalid image size. Please upload a 512x512 image.');
      return;
    } if (image.height !== 512) {
      reject('Invalid image size. Please upload a 512x512 image.');
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, image.width, image.height);

    const centerX = image.width / 2;
    const centerY = image.height / 2;
    const radius = Math.min(centerX, centerY);

    const imageData = context.getImageData(0, 0, image.width, image.height);
    const pixels = imageData.data;

    for (let y = 0; y < image.height; y++) {
      for (let x = 0; x < image.width; x++) {
        const index = (y * image.width + x) * 4;
        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        if (distance > radius && pixels[index + 3] > 0) {
          reject('Non-transparent pixels outside the circle. Please fix the badge image.');
          return;
        }
      }
    }

    resolve(true); // All checks passed
  };

  image.src = URL.createObjectURL(file);
});
