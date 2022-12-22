import React, { useRef, useEffect,useState } from 'react'
import flowTxt from '../../patterns/flow_Block_pattern.txt'

import { drawRect,drawFillRect/*,drawFillRect2*/ } from '../DrawRectangle/Rectangle';
import { drawCircle } from '../DrawCircle/Circle';
import { drawLineBetween } from '../DrawLine/Line';
import {writeText,drawLabel} from '../DrawText/TextDraw';


import './BlockFlow.css'


function BlockFlow() {

  const canvas = useRef();
  let ctx = null;
  
  const [blockString,setblockString]=useState([]);

  function reSetBlockString (arr){
    
    setblockString(arr);
    console.log("reSetBlockString :"+blockString.length);
    RectCanvas(arr);
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
        //console.log(blockString.length);
      });

  },[]);

  // init  canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;
    canvasEle.width = window.innerWidth;
    canvasEle.height = window.innerHeight;

    // get context of the canvas
    ctx = canvasEle.getContext("2d");
  }, []);


  function RectCanvas(blockArray){

    console.log("RectCanvas "+ blockString.length+ " : x "+blockArray.length);
    const r1Info = { x: 20, y: 30, w: 100, h: 50 };
    const r1Style = { borderColor: 'red', borderWidth: 10 };
    //drawRect(ctx,r1Info, r1Style);

    drawCircle(ctx,100,100,50,{insideColor:'#2d3436',strokeClr:'#00a8ff'});
    writeText(ctx,{ text: 'Node 1', x: 100, y: 90 },18,{color:'white'} );

    drawCircle(ctx,100+(2*100),100,50,{insideColor:'#2d3436',strokeClr:'#00a8ff'});
    writeText(ctx,{ text: 'Node 2', x: 100+(2*100), y: 90 },18,{color:'white'} );

    drawLineBetween(ctx,100+50,100,100+(2*100)-50,100,{strokeClr:'#00000'});

    drawCircle(ctx,100+(12*100),100+(1*200),50,{insideColor:'#2d3436',strokeClr:'#00a8ff'});
    writeText(ctx,{ text: 'Node 15', x: 100+(12*100), y: 90+(200) },18,{color:'white'} );

    drawCircle(ctx,100+(12*100),100+(2*200),50,{insideColor:'#2d3436',strokeClr:'#00a8ff'});
    writeText(ctx,{ text: 'Node 166', x: 100+(12*100), y: 90+(2*200) },18,{color:'white'} );

    drawLineBetween(ctx,100+(12*100)+50,100+(2*200)-25,100+(16*100)-50,100+25,{strokeClr:'blue'});
    drawLineBetween(ctx,100+(6*100),100+25,100+(12*100)-50,100+(1*200),{strokeClr:'#ff88ff'});
    drawLineBetween(ctx,100+(8*100),100+25,100+(12*100)-50,100+(1*200),{strokeClr:'green'});


    drawCircle(ctx,100+(4*100),100,50,{insideColor:'#2d3436',strokeClr:'#00a8ff'});
    writeText(ctx,{ text: 'Node 3', x: 100+(4*100), y: 90 },18,{color:'white'} );

    drawLineBetween(ctx,100+(2*100)+(1*50),100,100+(4*100)-(50),100,{strokeClr:'#ff0fff'});

    drawCircle(ctx,100+(6*100),100,50,{insideColor:'#2d3436',strokeClr:'#00a88f'});
    writeText(ctx,{ text: 'Node 4', x: 100+(6*100), y: 90 },18,{color:'white'} );

    drawCircle(ctx,100+(8*100),100,50,{insideColor:'#2d3436',strokeClr:'#00a88f'});
    writeText(ctx,{ text: 'Node 5', x: 73+(73*4.04*2.7), y: 90 },18,{color:'white'} );

    drawCircle(ctx,100+(10*100),100,50,{insideColor:'#2d3436',strokeClr:'#00a88f'});
    writeText(ctx,{ text: 'Node 6', x: 73+(73*5.04*2.7), y: 90 },18,{color:'white'} );

   
    drawCircle(ctx,100+(14*100),100,50,{insideColor:'#2d3436',strokeClr:'#00a8ff'});
    writeText(ctx,{ text: 'Node 89', x: 73+(73*7.08*2.7), y: 90 },18,{color:'white'} );

    drawCircle(ctx,100+(16*100),100,50,{insideColor:'#2d3436',strokeClr:'#00a8ff'});
    writeText(ctx,{ text: 'Node 45', x: 73+(73*8.04*2.7), y: 90 },18,{color:'white'} );

    drawCircle(ctx,100+(2*100),100+(6*100),50,{insideColor:'#2d3436',strokeClr:'#00a88f'});
    writeText(ctx,{ text: 'Node 999', x: 100+(2*100), y: 90+(6*100) },18,{color:'white'} );

    drawCircle(ctx,100+(12*100),100,50,{insideColor:'#2d3436',strokeClr:'#00a88f'});
    writeText(ctx,{ text: 'Node 7', x: 100+(12*100), y: 90 },18,{color:'white'} );

    const a={x:100+(2*100),y:100+(6*100)};
    const b={x:100+(12*100),y:100};
    console.log("Draw label : "+a.x+a.y+b.x+b.y);
    drawLabel(ctx,"Node Connections",b,a,'center',0);

    drawLineBetween(ctx,100+(2*100)+50,100+(6*100)-25,100+(12*100)-50,100+25,{strokeClr:'#2d3436'});
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
 
  return (
    <div className="App">
      <h3>BlockFlow </h3>
      <canvas ref={canvas}></canvas>
    </div>
  );
}

export default BlockFlow;