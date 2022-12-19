
export const drawLineBetween = (context,startX,startY,endX,endY,{strokeclr='#000000'})=>{

    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX,endY);
    context.strokeStyle =strokeclr ;
    context.stroke();
}