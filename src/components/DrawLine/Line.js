
export const drawLineBetween = (context,startX,startY,endX,endY,{strokeClr,lWidth})=>{

    context.beginPath();
    context.strokeStyle =strokeClr ;
    //context.fillStyle =strokeclr;
    context.moveTo(startX, startY);
    context.lineTo(endX,endY);
    context.lineWidth = lWidth;
    context.stroke();
    //context.strokeStyle='#000000';
}

export const drawArrow=(ctx, fromx, fromy, tox, toy, arrowWidth, color,secondClr='grey')=>{
    var headlen = 10;
    var angle = Math.atan2(toy-fromy,tox-fromx);
 
    ctx.save();
    ctx.strokeStyle = color;
 
   
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.lineWidth = arrowWidth;
    ctx.stroke();
 
    ctx.strokeStyle = secondClr;
    ctx.beginPath();
    ctx.moveTo(tox, toy);
    
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
               toy-headlen*Math.sin(angle-Math.PI/7));
 
    ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),
               toy-headlen*Math.sin(angle+Math.PI/7));
 
    
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
               toy-headlen*Math.sin(angle-Math.PI/7));
 
    ctx.stroke();
    ctx.restore();
}

