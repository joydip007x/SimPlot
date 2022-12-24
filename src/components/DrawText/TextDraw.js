

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

function timeout(delay) {
  return new Promise( res => setTimeout(res, delay) );
}

export const  drawLabel=async ( ctx, text, p1, p2, alignment,padding )=>{
  alignment = 'center';
  padding = 0;

  var dx = p2.x - p1.x;
  var dy = p2.y - p1.y;   
  var p, pad;
  if (alignment=='center'){
    p = p1;
    pad = 1/2;
  } else {
    var left = alignment=='left';
    p = left ? p1 : p2;
    pad = padding / Math.sqrt(dx*dx+dy*dy) * (left ? 1 : -1);
  }

  ctx.save();
  ctx.beginPath();
  ctx.textAlign = alignment;
  ctx.translate(15+(p1.x+p2.x)/2,-30+(p1.y+p2.y)/2);
  //ctx.rotate(Math.atan2(dy,dx));
  
  ctx.rotate(-Math.PI+(Math.atan2(p2.y - p1.y, p2.x - p1.x) )  );
  
  ctx.fillStyle = 'black';
  //await timeout(1000);
  ctx.fillText(text,0,-5);
  ctx.stroke();
  ctx.restore();
}
