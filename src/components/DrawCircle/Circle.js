

export const drawCircle = (context,centerX,centerY,radius,{insideColor='green'
                       ,lineWidth=5,strokeClr='#003300'})=>{

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = insideColor;
    context.fill();
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeClr;
    context.stroke();

}