export function stripDataUrlPrefix(dataUrl) {
  return dataUrl.slice(dataUrl.indexOf(",") + 1);
}

export function scaleToHeight(width, height, targetHeight = 400) {
  const ratio = targetHeight / height;
  return { width: width * ratio, height: targetHeight };
}

// Rekognition returns box values as fractions of the image (Left, Top, Width, Height)
export function buildBoxes(aliases, boxes, width, height) {
  const colors = [];
  const labels = [];
  const pixelBoxes = [];
  aliases.forEach((alias, i) => {
    if (alias === "") {
      colors.push("#FF0000");
      labels.push("na");
    } else {
      colors.push("#39FF14");
      labels.push(" " + alias + " ");
    }
    const b = boxes[i];
    pixelBoxes.push({ x: b.Left * width, y: b.Top * height, width: b.Width * width, height: b.Height * height });
  });
  return { boxes: pixelBoxes, colors, aliases: labels };
}
