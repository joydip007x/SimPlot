

export const writeText = (ctx,info,sizeofFont ,style = {}) => {
      const { text, x, y } = info;
      const { fontSize = sizeofFont, 
              fontFamily = 'Arial', 
              color = 'black', 
              textAlign = 'center', 
              textBaseline = 'top' } = style;
     
      ctx.beginPath();
      ctx.font = fontSize + 'px ' + fontFamily;
      ctx.textAlign = textAlign;
      ctx.textBaseline = textBaseline;
      ctx.fillStyle = color;
      ctx.fillText(text, x, y);
      ctx.stroke();
      ctx.strokeStyle='#000000';

    }