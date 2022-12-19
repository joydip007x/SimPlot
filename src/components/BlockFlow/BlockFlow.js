import React, { useRef, useEffect,useState } from 'react'
import flowTxt from '../../flow_Block_pattern.txt'

import './BlockFlow.css'


function BlockFlow() {

  const canvas = useRef();
  let ctx = null;
  
  const [blockString,setblockString]=useState([]);

  function reSetBlockString (arr){
    
    setblockString(arr);
    console.log(blockString.length);
    RectCanvas();
  }
  //const pat = RegExp(/(\w|"| |:|,|)*\}\}/g)
  //const pat = RegExp(/\{([a-zA-z0-9]|[^a-zA-z0-9])*(\w|"| |:|,|)*\}\}/g)
  const pat = RegExp(/\}\}/g) // matches '}}' ending of each transmission
  const pat2 = RegExp(/\{"kind":/g) // matches '{kind' begining of each transmission
  const pat3_tt = RegExp(/(\w| |"|:|,|-)*transmission-timestamp":[0-9]*/g) 
  const pat4_rt = RegExp(/reception-timestamp":[0-9]*/g)
  const pat5_beginNid= RegExp(/"begin-node-id":[0-9]*/g)
  const pat6_endNid= RegExp(/"end-node-id":[0-9]*/g)
  const pat7_Blockid= RegExp(/"block-id":[0-9]*/g)

  function parseString(regex, str) {
      let test,res="";
      while( (test = regex.exec(str))!=null){
        let y=test.at(0);
        for( let j=0; j<y.length; j++ ){
           if((( /^\d$/).test(y[j])) ){
              res=res+y[j];
           }
        }
    }
    return  parseInt(res);
  }
  //Use Effect to create formatted object
  useEffect(() => {
    fetch(flowTxt)
      .then(r => r.text())
      .then(text => {

        var index=0,match,index2=0;
        let arr1 = [],arr2=[],temp=[];
        //store ending index to scrap each line
        while ((match = pat.exec(text)) != null) {
          arr2[index]=match.index; index=index + 1;
        }
        //store begining index to scrap each line
        while ((match = pat2.exec(text)) != null) {
          arr1[index2]=match.index; index2=index2 + 1;
        }
        //console.log(arr1[0]+ " : "+arr2[0]+"\n"+index+index2 +text.slice(arr1[0],arr2[0])+"}}" )
        index=0;
        for(var i=0 ; i<arr1.length; i++){

            let s=text.slice(arr1[i],arr2[i])+"}}";
            const flowBlock ={
              transmission_timestamp:parseString(pat3_tt,s),
              reception_timestamp:parseString(pat4_rt,s),
              begin_node_id:parseString(pat5_beginNid,s),
              end_node_id:parseString(pat6_endNid,s),
              block_id:parseString(pat7_Blockid,s)
            }
            temp[index]=flowBlock;
            index=index+1;
            /// console.log(s+"\n"+flowBlock.transmission_timestamp+"\n"+flowBlock.block_id);
        }
        reSetBlockString(temp);
        console.log(blockString.length);
        //reSetBlockString(temp)
        //console.log( blockString.length)

      });

  },[]);

   console.log( blockString.length)

  // init  canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;
    canvasEle.width = window.innerWidth;
    canvasEle.height = window.innerHeight;

    // get context of the canvas
    ctx = canvasEle.getContext("2d");
  }, []);


  function RectCanvas(){

    console.log("canvas "+ blockString.length);
    const r1Info = { x: 20, y: 30, w: 100, h: 50 };
    const r1Style = { borderColor: 'red', borderWidth: 10 };
    writeText({ text: 'Clue Mediator!', x: 20, y: 30, fontSize:5 });
    drawRect(r1Info, r1Style);



    // const r2Info = { x: 100, y: 100, w: 80, h: 150 };
    // drawRect(r2Info);

    // const r3Info = { x: 250, y: 80, w: 80, h: 120 };
    // drawFillRect(r3Info, { backgroundColor: 'green' });

    // const r4Info = { x: 200, y: 220, w: 100, h: 50 };
    // drawFillRect(r4Info);

    // ctx.clearRect(250, 80, 80, 120);
    //drawFillRect2(r3Info, { backgroundColor: 'green' });
  }

  // draw rectangle
  const drawRect = (info, style = {}) => {
    const { x, y, w, h } = info;
    const { borderColor = 'black', borderWidth = 1 } = style;

    ctx.beginPath();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.rect(x, y, w, h);
    ctx.stroke();
  }
  const writeText = (info,sizeofFont ,style = {}) => {
      const { text, x, y } = info;
      const { fontSize = sizeofFont, fontFamily = 'Arial', color = 'black', textAlign = 'left', textBaseline = 'top' } = style;
     
      ctx.beginPath();
      ctx.font = fontSize + 'px ' + fontFamily;
      ctx.textAlign = textAlign;
      ctx.textBaseline = textBaseline;
      ctx.fillStyle = color;
      ctx.fillText(text, x, y);
      ctx.stroke();
    }

  // draw rectangle with background
  const drawFillRect = (info, style = {}) => {
    const { x, y, w, h } = info;
    const { backgroundColor = 'black' } = style;

    ctx.beginPath();
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(x, y, w, h);
  }
  const drawFillRect2 = (info, style = {}) => {
    const { x, y, w, h } = info;
    const { backgroundColor = 'transparent' } = style;

    ctx.beginPath();
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(x, y, w, h);
  }

  return (
    <div className="App">
      <h3>Draw a rectangle on Canvas - <a href="http://www.cluemediator.com" target="_blank" rel="noopener noreferrer">Clue Mediator</a></h3>
      <canvas ref={canvas}></canvas>
    </div>
  );
}

export default BlockFlow;