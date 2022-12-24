
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