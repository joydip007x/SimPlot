import React, { useRef, useEffect,useState } from 'react'
import {useLocation} from 'react-router-dom';


// import blockTxt from '../../patterns/blockList_pattern.txt'

import { drawRect,drawFillRect/*,drawFillRect2*/ } from '../DrawRectangle/Rectangle';
import { drawCircle } from '../DrawCircle/Circle';
import { drawLineBetween,drawArrow } from '../DrawLine/Line';
import {writeText} from '../DrawText/TextDraw';

import './ChainFlow.css'


export default function ChainFlow() {

    const canvas = useRef();
    let ctx = null,wid=null,hig=null;
    
    const [blockList,setblockList]=useState([]);
  
    const location = useLocation();
    const data = location.state?.data;

    console.log(" found CF " + data);
    function reSetblockList (arr){
      
      setblockList(arr);
      console.log("reSetblockList :"+blockList.length);
      RectCanvas(arr);
    }

   // const pat = RegExp(/OnChain : [0-9]*(\w| |.|:)*/g) //Dumped
    const pat = RegExp(/(OnChain|Orphan) : [0-9]*/g) // matches 'OnCHain' Starting of each line processing
    const pat2 = RegExp(/Minter [0-9]*/g) // matches 'Minter :' 
    const pat3_line = RegExp(/[\w\W}*[0-9][\n]/g) //Matches '\n' NEWLINE
    const pat4_orphan = RegExp(/Orphan/g)  //Check if Orphan

    const pat5 = RegExp(/chainflow/g)  //Check if Orphan

    function parseString(regex, str,orphanCheck=0) {
        let test,res="";
      
        while( (test = regex.exec(str))!=null){
          let y=test.at(0);
          if(orphanCheck){
             return (test.index==0);
          }
          for( let j=0; j<y.length; j++ ){
             if((( /^\d$/).test(y[j])) ){
                res=res+y[j];
             }
          }
      }
      return  parseInt(res);
    }
    //create formatted object from parsing string
    useEffect(() => {
      
      // var reader = new FileReader();
      // reader.onload = (event) => {

      //     let text=event.target.result;
      //     console.log(text)
      //     var index=0,match,index2=0;
      //     let arr1 = [],arr2=[],temp=[];
      //     //store ending index to scrap each line
      //     while ((match = pat3_line.exec(text)) != null) {
      //       arr2[index]=match.index+1; index=index + 1;
      //     }
      //     //store begining index to scrap each line
      //     while ((match = pat.exec(text)) != null) {
      //       arr1[index2]=match.index; index2=index2 + 1;
      //     }
      //     //console.log(arr1[0]+ " : "+arr2[0]+"\n"+index+index2 +text.slice(arr1[0],arr2[0])+"}}" )
      //     index=0;
      //     for(var i=0 ; i<arr1.length; i++){
  
      //         let s=text.slice(arr1[i],arr2[i]);
      //         //console.log(" STRING S = "+s);
      //         //console.log("OKOK "+parseString(pat4_orphan,s,1));
      //         const flowBlock ={
      //           ChainNo:parseString(pat,s),
      //           Minter:parseString(pat2,s),
      //           OnChain:parseString(pat4_orphan,s,1)? false:true,
      //         }
      //         temp[index]=flowBlock;
      //         index=index+1;
      //         console.log(flowBlock.OnChain+" : "+flowBlock.ChainNo+" "+flowBlock.Minter);
      //     }
      //     reSetblockList(temp);
      //     //console.log(blockList.length);
      //   };
      // reader.readAsText(data);
    
    },[]);
  
    // init  canvas context
    useEffect(() => {
      // dynamically assign the width and height to canvas
      const canvasEle = canvas.current;
      canvasEle.width = window.innerWidth;
      canvasEle.height = window.innerHeight;
      
      wid= canvasEle.width;
      hig= canvasEle.height ;
      // get context of the canvas
      ctx = canvasEle.getContext("2d");
      RectCanvas();
    }, []);
  
  
    function RectCanvas(/*blockArray*/){
  
      //console.log("RectCanvas "+ blockList.length+ " : x "+blockArray.length);

      
      const r1Info = { x: wid/2, y: 30, w: 150, h: 60 };
      const r1Style = { backgroundColor:'grey',borderColor: 'black', borderWidth: 5 };
      drawFillRect(ctx,r1Info, r1Style);
      writeText(ctx,{ text: 'Node '+(+1), x:(wid/2)+75, y:30+(1*20) },18,{color:'black'} );

      const r2Info = { x: wid/2, y: 30+(1*120), w: 150, h: 60 };
      const r2Style = { borderColor: 'red', borderWidth: 10 };
      drawRect(ctx,r2Info, r2Style);
      writeText(ctx,{ text: 'Node '+(+2), x:(wid/2)+75, y:30+(1*20)+120 },18,{color:'#00a8ff'} );

      drawArrow(ctx, (wid/2)+75,30+57,(wid/2)+75,30+(1*120)-10,5,'black');

      const r3Info = { x: (wid/2)-200, y: 30+(1*120), w: 150, h: 60 };
      const r3Style = { borderColor: 'red', borderWidth: 10 };
      drawRect(ctx,r3Info, r3Style);
      writeText(ctx,{ text: 'Node '+(+3), x:(wid/2)-200+75, y:30+20+(1*120) },18,{color:'#00a8ff'} );

      drawArrow(ctx, (wid/2)+50,30+50,(wid/2)-200+50+50,30+(1*120)-10,5,'black');

      // const r2Info = { x: 100, y: 100, w: 80, h: 150 };
      // drawRect(r2Info);
  
      //  const r3Info = { x: 250, y: 180, w: 80, h: 120 };
      //  drawFillRect(ctx,r3Info, { backgroundColor: 'green' });
  
      // const r4Info = { x: 200, y: 220, w: 100, h: 50 };
      // drawFillRect(r4Info);
  
      // ctx.clearRect(250, 80, 80, 120);
      //drawFillRect2(r3Info, { backgroundColor: 'green' });
    }
  
    // draw rectangle

    return (
      <div className="App">
        {/* <h3>Chain -- Flow </h3> */}
        <canvas ref={canvas}></canvas>
      </div>
    );
}
