const verifyBadgeImage = (file) => new Promise((resolve, reject) => {
  const image = new Image();

  if (file.type !== 'image/png') {
    resolve('Invalid image format. Please upload a PNG image.');
    return;
  }

  image.onload = () => {
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
    if (image.width !== 512 || image.height !== 512) {
      resolve('Invalid image size. Please upload a 512x512 image.');
      return;
    }
    for (let y = 0; y < image.height; y++) {
      for (let x = 0; x < image.width; x++) {
        const index = (y * image.width + x) * 4;
        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        if (distance > radius && pixels[index + 3] > 0) {
          resolve('Non-transparent pixels outside the circle. Please fix the badge image.');
          return;
        }
      }
    }

    resolve(true);
  };

  image.src = URL.createObjectURL(file);
});

const verifyAverageColor = (file) => {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, image.width, image.height);

      const imageData = context.getImageData(0, 0, image.width, image.height);
      const pixels = imageData.data;

      let totalRed = 0;
      let totalGreen = 0;
      let totalBlue = 0;
      let pixelCount = 0;

      for (let i = 0; i < pixels.length; i += 4) {
        const alpha = pixels[i + 3];
        if (alpha > 0) {
          totalRed += pixels[i];
          totalGreen += pixels[i + 1];
          totalBlue += pixels[i + 2];
          pixelCount++;
        }
      }

      const averageRed = Math.round(totalRed / pixelCount);
      const averageGreen = Math.round(totalGreen / pixelCount);
      const averageBlue = Math.round(totalBlue / pixelCount);
      const averageColor = averageRed + averageGreen + averageBlue;

      resolve(averageColor / 3);
    };

    image.src = URL.createObjectURL(file);
  });
};

export { verifyBadgeImage, verifyAverageColor };
