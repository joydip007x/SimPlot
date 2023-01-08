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
    let ctx = null,ctxwidth=null,ctxheight=null;
    
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
        let test,res="",OrphanCheck=false;
      
        while( (test = regex.exec(str))!=null){
          let y=test.at(0);
          if(orphanCheck){
             OrphanCheck=(y==="Orphan");
          }
          else{

            for( let j=0; j<y.length; j++ ){
              if((( /^\d$/).test(y[j])) ){
                  res=res+y[j];
              }
            }
          }
      }
     
      return  (orphanCheck)? OrphanCheck:parseInt(res);
    }
    //create formatted object from parsing string
    useEffect(() => {
      
      var reader = new FileReader();
      reader.onload = (event) => {

          let text=event.target.result;
          console.log(text)
          var index=0,match,index2=0;
          let arr1 = [],arr2=[],temp=[];
          //store ending index to scrap each line
          while ((match = pat3_line.exec(text)) != null) {
            arr2[index]=match.index+1; index=index + 1;
          }
          //store begining index to scrap each line
          while ((match = pat.exec(text)) != null) {
            arr1[index2]=match.index; index2=index2 + 1;
          }
          //console.log(arr1[0]+ " : "+arr2[0]+"\n"+index+index2 +text.slice(arr1[0],arr2[0])+"}}" )
          index=0;
          for(var i=0 ; i<arr1.length; i++){
  
              let s=text.slice(arr1[i],arr2[i]);
              //console.log(" STRING S = "+s);
              //console.log("OKOK "+parseString(pat4_orphan,s,1));
              const flowBlock ={
                ChainNo:parseString(pat,s),
                Minter:parseString(pat2,s),
                OnChain:parseString(pat4_orphan,s,1)? false:true,
              }
              temp[index]=flowBlock;
              index=index+1;
              console.log(s+":"+flowBlock.OnChain+" : "+flowBlock.ChainNo+" "+flowBlock.Minter);
          }
          reSetblockList(temp);
          //console.log(blockList.length);
        };
      reader.readAsText(data);
    
    },[]);
  
    // init  canvas context
    useEffect(() => {
      // dynamically assign the width and height to canvas
      const canvasEle = canvas.current;
      canvasEle.width = window.innerWidth;
      canvasEle.height = 6680;
      
      ctxwidth= canvasEle.width;
      ctxheight= canvasEle.height ;
      // get context of the canvas
      ctx = canvasEle.getContext("2d");
      
    }, []);
  
  
    function RectCanvas(blockArray){
  
      blockArray.sort((a,b)=> a.ChainNo>b.ChainNo);

      console.log("RectCanvas "+ blockList.length+ " : x "+blockArray.length);

      let sx=(ctxwidth-50)/2,sy=30,tmpX=200;
      let recW=150,recH=70, stageCnt=0;

      for(let i=0; i< blockArray.length ; i++ ){

        //console.log(":: "+blockArray[i].OnChain+" : BLock "+blockArray[i].ChainNo)

        if(!blockArray[i].OnChain){
           
           let j=i,sideVal=0,sideDir;
           for( ;j< blockArray.length;j++,sideVal++){
              
              if(blockArray[j].OnChain ){ i=j-1; break;}
              //if( j-i>5 )continue;
              (sideVal%2)? sideDir=1 : sideDir=-1;
              const rInfo = { x: sx+(sideDir*200*Math.max(1,Math.floor((j-i)/2))), y: sy+((stageCnt-1)*120), w: recW, h: recH };
              const rStyle = { backgroundColor:'#afb3b0',borderColor: 'black', borderWidth: 5 };
              drawFillRect(ctx,rInfo, rStyle);
              writeText(ctx,{ text: 'Minter '+blockArray[i].Minter, 
                               x:sx+(recW/2)+(sideDir*200*Math.max(1,Math.floor((j-i)/2))), 
                              y:sy+(recH/3)+((stageCnt-1)*120)+(recH/2.5) },12,{color:'black'} );

              writeText(ctx,{ text: 'Orphaned ', 
              x:sx+(recW/2)+(sideDir*200*Math.max(1,Math.floor((j-i)/2))), 
              y:sy+(recH/2.2)+((stageCnt-1)*120) },18,{color:'black'} );


              drawArrow(ctx, sx+(recW/2),sy+((stageCnt-2)*120)+recH-3,
              sx+(sideDir*200*Math.max(1,Math.floor((j-i)/2)))+(recW/2),
              sy+((stageCnt-1)*120)-(recH/6),2,'#545454','ash');

     
           }
            continue;
        }
        stageCnt++;
        const rInfo = { x: sx, y: sy+((stageCnt-1)*120), w: recW, h: recH };
        const rStyle = { backgroundColor:'#2a2e2a',borderColor: 'black', borderWidth: 5 };
        drawFillRect(ctx,rInfo, rStyle);
        writeText(ctx,{ text: 'Minter '+blockArray[i].Minter, x:sx+(recW/2), 
                        y:sy+(recH/3)+((stageCnt-1)*120) },18,{color:'white'} );

        writeText(ctx,{ text: 'Block : '+blockArray[i].ChainNo, x:sx+(recW/2), 
        y:sy+(recH/3)+25+((stageCnt-1)*120) },12,{color:'white'} );                
       if(i+1<blockArray.length)
        drawArrow(ctx, sx+(recW/2),sy+((stageCnt-1)*120)+recH-3,sx+(recW/2),sy+((stageCnt)*120)-(recH/6),5,'black','ash');

      }
      
      // const r1Info = { x: ctxwidth/2, y: 30, w: 150, h: 60 };
      // const r1Style = { backgroundColor:'grey',borderColor: 'black', borderWidth: 5 };
      // drawFillRect(ctx,r1Info, r1Style);
      // writeText(ctx,{ text: 'Node '+(+1), x:(ctxwidth/2)+75, y:30+(1*20) },18,{color:'black'} );

      // const r2Info = { x: ctxwidth/2, y: 30+(1*120), w: 150, h: 60 };
      // const r2Style = { borderColor: 'red', borderWidth: 10 };
      // drawRect(ctx,r2Info, r2Style);
      // writeText(ctx,{ text: 'Node '+(+2), x:(ctxwidth/2)+75, y:30+(1*20)+120 },18,{color:'#00a8ff'} );

      // drawArrow(ctx, (ctxwidth/2)+75,30+57,(ctxwidth/2)+75,30+(1*120)-10,5,'black');

      // const r3Info = { x: (ctxwidth/2)-200, y: 30+(1*120), w: 150, h: 60 };
      // const r3Style = { borderColor: 'red', borderWidth: 10 };
      // drawRect(ctx,r3Info, r3Style);
      // writeText(ctx,{ text: 'Node '+(+3), x:(ctxwidth/2)-200+75, y:30+20+(1*120) },18,{color:'#00a8ff'} );

      // drawArrow(ctx, (ctxwidth/2)+50,30+50,(ctxwidth/2)-200+50+50,30+(1*120)-10,5,'black');

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
