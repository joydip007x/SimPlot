
   // draw rectangle with  WHITE background
  export const drawRect = (ctx,info, style = {}) => {
    const { x, y, w, h } = info;
    const { borderColor = 'black', borderWidth = 1 } = style;

    ctx.beginPath();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.rect(x, y, w, h);
    ctx.stroke();
  }
  

  // draw rectangle with background
  export  const drawFillRect = (ctx,info, style = {}) => {
    const { x, y, w, h } = info;
    const { backgroundColor = 'black' } = style;

    ctx.beginPath();
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(x, y, w, h);
  }

  // export const drawFillRect2 = (ctx,info, style = {}) => {
  //   const { x, y, w, h } = info;
  //   const { backgroundColor = 'transparent' } = style;

  //   ctx.beginPath();
  //   ctx.fillStyle = backgroundColor;
  //   ctx.fillRect(x, y, w, h);
  // }
