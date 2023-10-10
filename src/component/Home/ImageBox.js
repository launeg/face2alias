import React, { useRef, useEffect } from "react";
const AmazonFont = require('../../fonts/AmazonEmber_Rg.ttf');

const ImageBox = ({ image_base64, boxesCoordinates, width, height, color, aliases}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!image_base64 || !boxesCoordinates || boxesCoordinates.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = `${image_base64}`;

    image.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // make sure is clean 
      ctx.drawImage(image, 0, 0, width, height);

      // Draw boxes on the image based on the coordinates
      for (let i = 0; i < boxesCoordinates.length; i++) {

        // const {boxesCoordinates, aliasesImg} = boxWithName;// adding the alias 

        ctx.strokeStyle = color[i];

        ctx.font = AmazonFont; // set to aws font
        ctx.lineWidth = 2;
        ctx.strokeRect(boxesCoordinates[i].x, boxesCoordinates[i].y, boxesCoordinates[i].width, boxesCoordinates[i].height); // draw the box
      

        if (aliases[i] !== "na") {
          ctx.fillStyle = "#ffffff";
          const textWidth = ctx.measureText(aliases[i]).width;
          ctx.fillRect(boxesCoordinates[i].x + boxesCoordinates[i].width / 2 - textWidth / 2 - 2, boxesCoordinates[i].y - 20, textWidth + 4, 20);

          ctx.fillStyle = color[i]; 
          ctx.fillStyle = "#000000";
          ctx.fillText(aliases[i], boxesCoordinates[i].x + boxesCoordinates[i].width / 2 - textWidth / 2, boxesCoordinates[i].y -5);
      }
      }
    };
  }, [image_base64, boxesCoordinates, width, height, color, aliases]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default ImageBox;
