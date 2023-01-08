import React, { useRef, useEffect/*,useState*/ } from 'react'
import {useLocation} from 'react-router-dom';

import useState from 'react-usestateref'
//FILE
//import flowTxt from '../../patterns/flow_Block_pattern.txt'

import { drawRect,drawFillRect/*,drawFillRect2*/ } from '../DrawRectangle/Rectangle';
import { drawCircle } from '../DrawCircle/Circle';
import { drawLineBetween,drawArrow } from '../DrawLine/Line';
import {writeText,drawLabel,drawLabelBig} from '../DrawText/TextDraw';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import './BlockFlow.css'

// export  const rootBlocFlow = () =>{

// }
function BlockFlow() {

  const canvas = useRef();
  let ctx = null;
  const [blockString,setblockString]=useState([]);
  var  [simSpeed,setsimSpeed,simSpeedRef] = useState(1000);
  let canvasObjAxisInfo=[];

  const location = useLocation();
  const data = location.state?.data;
  const numOfNodes  = location.state?.num;

 
  
  //console.log(" OOOOOOOOOOOOO "+ num);
  function reSetBlockString (arr){
    
    setblockString(arr);
    console.log("reSetBlockString :"+blockString.length);
    RectCanvas(arr);
  }
  //const pat = RegExp(/(\w|"| |:|,|)*\}\}/g)
  //const pat = RegExp(/\{([a-zA-z0-9]|[^a-zA-z0-9])*(\w|"| |:|,|)*\}\}/g)
  const pat_fileUseEnd = RegExp(/"end-node-id":[0-9]*,"block-id":[0-9]*\}\}/g)

  const pat = RegExp(/\}\}/g) // matches '}}' ending of each transmission
  const pat2 = RegExp(/\{"kind":"fl/g) // matches '{kind:Flowblovck' begining of each transmission
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
  
    var reader = new FileReader();
    reader.onload = (event) => {
        let text=event.target.result;
        var index=0,match,index2=0,match2;
        let arr1 = [],arr2=[],temp=[];
        //store ending index to scrap each line
        while ((match = pat_fileUseEnd.exec(text)) != null) {
          let posx=match.index, cnt=0;
            while ((match2 = pat.exec(match.at(0))) != null) {
              if(cnt==0){
                  arr2[index]=match.index+30; index=index + 1;
              }
              cnt++;
            }
        }
        //store begining index to scrap each line
        while ((match = pat2.exec(text)) != null) {
          arr1[index2]=match.index; index2=index2 + 1;
        }
        console.log(arr1[0]+ " : "+arr2[0]+"\n"+index+index2 +text.slice(arr1[0],arr2[0])+"}}" )
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
            // console.log(text.slice(arr1[0],arr2[0])+"}}" )
            // console.log(s+"\n"+flowBlock.transmission_timestamp+"\n"
            // +"\n"+flowBlock.reception_timestamp+"\n"+flowBlock.end_node_id+"\n"+flowBlock.begin_node_id
            // +"\n"+flowBlock.block_id
            // );
        }
        reSetBlockString(temp);
        //console.log(blockString.length);
    
      ///console.log("FOund - "+data);
  //reader.readAsText(data);
  }
  reader.readAsText(data);

},[]);


  // init  canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;
    var rect = canvasEle.getBoundingClientRect();

    canvasEle.width = 2400*2;  ////// relation with scaling * num of nodes in canvas
    canvasEle.height = 1600*2;

    // get context of the canvas
    ctx = canvasEle.getContext("2d");
    ///////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////
     ///  SCALING for dev only 

    ctx.scale(0.5,0.5);
     ///////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////
  }, []);

  const sleep = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
  };


  async function RectCanvas(blockArray){

    blockArray.sort((a,b)=> a.transmission_timestamp>b.transmission_timestamp);
    console.log("RectCanvas "+ blockString.length+ " : x "+blockArray.length);
    // const r1Info = { x: 20, y: 30, w: 100, h: 50 };
    // const r1Style = { borderColor: 'red', borderWidth: 10 };
    //drawRect(ctx,r1Info, r1Style);

    let nx=100/1;
    let p=0,ny=200/1,q=0;
    let yc=20 , xc=2*yc;
    let sx=900 ,sy=100,radius=25*2;

    drawLineBetween(ctx,sx-radius*3,-50,sx-radius*3,canvas.current.height,{strokeClr:'black',lWidth:10});
    writeText(ctx,{ text: 'Current BlockFlow', x:(sx-radius*3)/2, y:sy},68,{color:'#00a8ff'} );

    for(let i=0 ; i<numOfNodes; i=i+1,p=p+2){

      q=parseInt(i/yc);
      p=p%xc;
      drawCircle(ctx,sx+(p*nx),sy+(q*ny),radius,{insideColor:'#2d3436',strokeClr:'#00a8ff'});
      writeText(ctx,{ text: 'Node '+(i+1), x:sx+(p*nx), y:90+(q*ny) },18,{color:'#00a8ff'} );
      //if(i==20){await sleep(3000);}

      const saveAxisInfo= {
           cirX:sx+(p*nx),
           cirY:sy+(q*ny),
           cirRadius:radius,
           textX:sx+(p*nx),
           textY:90+(q*ny),
           cirYSteps:q,
      }
      canvasObjAxisInfo[i] = saveAxisInfo;
    }

    await sleep(simSpeedRef.current);
   

    let colorArray = ['aqua','orange','chartreuse','crimson',
    'darkorange','dodgerblue','indigo', 'midnightblue','saddlebrown'];

    let colorIndex=-1,curBlockID=null;

    for(let i = 0; i <blockArray.length;i++) {

      if(i==50)break;
      if(i==20){

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        //ctx.clearRect(0, 0, 2400*2, 3200);
        ctx.scale(1, 1);
        ctx.restore();

      }
      const canvasData ={
        transmission_t:blockArray[i].transmission_timestamp,
        reception_t:blockArray[i].reception_timestamp,
        begin_node_id:blockArray[i].begin_node_id,
        end_node_id:blockArray[i].end_node_id,
        block_id:blockArray[i].block_id
      }

      if(curBlockID!=canvasData.block_id){

          if(curBlockID!=null)
          drawFillRect(ctx,{ x: (sx/2)-(radius), y: 7.4*sy, w: 90, h: 260 },
              { borderColor: 'white', borderWidth: 1,backgroundColor: 'white' });

          curBlockID = canvasData.block_id;
          drawLabelBig(ctx,'BlockID '+curBlockID,
              {x:(sx/2)-(radius*1.5),y:14*sy},{x:(sx/2)-(radius*1.5),y:4*sy})  

          colorIndex=(colorIndex+1)%9;
          await sleep(simSpeedRef.current*2);
      }

     let obj1=canvasObjAxisInfo[canvasData.begin_node_id-1], 
         obj2=canvasObjAxisInfo[canvasData.end_node_id-1],
         rad=obj1.cirRadius;
      
      if(obj1.cirX>obj2.cirX || 
         (obj1.cirX==obj2.cirX && obj1.cirY>obj2.cirY) ) 
            [obj1, obj2]=[obj2, obj1];
      
      /////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////

      drawCircle(ctx,(sx/2)-(radius*1.5),4*sy,150,{insideColor:'#2d3436',strokeClr:'#00a8ff'}); 
      drawCircle(ctx,(sx/2)-(radius*1.5),14*sy,150,{insideColor:'#2d3436',strokeClr:'#00a8ff'});     
    
      // drawLineBetween(ctx,(sx/2)-(radius*1.5),4*sy+(radius*3),
      // (sx/2)-(radius*1.5),14*sy-(radius*3),{strokeClr:colorArray[colorIndex],lWidth:10})

      drawArrow(ctx,(sx/2)-(radius*1.5),4*sy+(radius*3),
      (sx/2)-(radius*1.5),14*sy-(radius*4),15,colorArray[colorIndex]);


      writeText(ctx,{ text: 'Node '+canvasData.begin_node_id,
               x:(sx/2)-(radius*1.5), y:4*sy-(radius/4)},48,{color:'#00a8ff'} );

      writeText(ctx,{ text: 'Node '+canvasData.end_node_id,
               x:(sx/2)-(radius*1.5), y:14*sy-(radius/4)},48,{color:'#00a8ff'} );  
               
      // writeText(ctx,{ text: 'Node '+canvasData.end_node_id,
      //          x:(sx/2)-(radius*1.5), y:14*sy-(radius/4)},48,{color:'#00a8ff'} );  
               
     
      
      writeText(ctx,{ text: 'Transmission Timestamp\n'+canvasData.transmission_t,
               x:(sx/2)-(radius*1.5), y:17*sy-(radius/4)},48,{color:'#00a8ff'} );  
      
       
     
       /////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////
      
      console.log("i = "+i+" from "+canvasData.begin_node_id+ " to "+canvasData.end_node_id+" t = "+ canvasData.transmission_t);
      let diffY=obj2.cirYSteps - obj1.cirYSteps;                                                      
      //  drawLineBetween(ctx,obj1.cirX+rad,obj1.cirY-25,
      //  obj2.cirX-rad,obj2.cirY+25,{strokeClr:colorArray[colorIndex],lWidth:3});
      
       drawArrow(ctx,obj1.cirX+rad,obj1.cirY-25,
        obj2.cirX-rad,obj2.cirY+25,4,colorArray[colorIndex]);
       
      console.log(" simSpeed "+ simSpeed +" X "+ simSpeedRef.current);
      await sleep(simSpeedRef.current)
      const recClr = { x: (sx/2)-(radius*12.5), y: 17*sy-(radius/4), w: 900, h: 45 };
      const recClrStyle = { borderColor: 'white', borderWidth: 10,backgroundColor: 'white' };
      drawFillRect(ctx,recClr, recClrStyle);
      
    }

    //drawCircle(ctx,100,100,25*1.5,{insideColor:'##00a8ff',strokeClr:'#2d3436'});

     //writeText(ctx,{ text: 'yy'+parseInt(300/yc), x: 50, y: 90 },18,{color:'#00a8ff'} );

    // drawCircle(ctx,100,100,50,{insideColor:'#2d3436',strokeClr:'#00a8ff'});
    // writeText(ctx,{ text: 'Node 1', x: 100, y: 90 },18,{color:'white'} );

    // drawCircle(ctx,100+(2*100),100,50,{insideColor:'#2d3436',strokeClr:'#00a8ff'});
    // writeText(ctx,{ text: 'Node 2', x: 100+(2*100), y: 90 },18,{color:'white'} );

    // const p={x:100,y:100};
    // const q={x:100+(2*100),y:100};
    // //console.log("Draw label : "+p.x+p.y+b.x+b.y);
    // drawLabel(ctx,"Happyyyyyy",p,q,'center',0);

    // drawLineBetween(ctx,100+50,100,100+(2*100)-50,100,{strokeClr:'#00000'});

    // drawCircle(ctx,100+(12*100),100+(1*200),50,{insideColor:'#2d3436',strokeClr:'#00a8ff'});
    // writeText(ctx,{ text: 'Node 15', x: 100+(12*100), y: 90+(200) },18,{color:'white'} );

   

    // drawCircle(ctx,100+(12*100),100+(2*200),50,{insideColor:'#2d3436',strokeClr:'#00a8ff'});
    // writeText(ctx,{ text: 'Node 166', x: 100+(12*100), y: 90+(2*200) },18,{color:'white'} );

    // drawLineBetween(ctx,100+(12*100)+50,100+(2*200)-25,100+(16*100)-50,100+25,{strokeClr:'blue'});
    // drawLineBetween(ctx,100+(6*100),100+25,100+(12*100)-50,100+(1*200),{strokeClr:'#ff88ff'});
    // drawLineBetween(ctx,100+(8*100),100+25,100+(12*100)-50,100+(1*200),{strokeClr:'green'});


    // drawCircle(ctx,100+(4*100),100,50,{insideColor:'#2d3436',strokeClr:'#00a8ff'});
    // writeText(ctx,{ text: 'Node 3', x: 100+(4*100), y: 90 },18,{color:'white'} );

    // drawLineBetween(ctx,100+(2*100)+(1*50),100,100+(4*100)-(50),100,{strokeClr:'#ff0fff'});

    // drawCircle(ctx,100+(6*100),100,50,{insideColor:'#2d3436',strokeClr:'#00a88f'});
    // writeText(ctx,{ text: 'Node 4', x: 100+(6*100), y: 90 },18,{color:'white'} );

    // drawCircle(ctx,100+(8*100),100,50,{insideColor:'#2d3436',strokeClr:'#00a88f'});
    // writeText(ctx,{ text: 'Node 5', x: 73+(73*4.04*2.7), y: 90 },18,{color:'white'} );

    // drawCircle(ctx,100+(10*100),100,50,{insideColor:'#2d3436',strokeClr:'#00a88f'});
    // writeText(ctx,{ text: 'Node 6', x: 73+(73*5.04*2.7), y: 90 },18,{color:'white'} );

   
    // drawCircle(ctx,100+(14*100),100,50,{insideColor:'#2d3436',strokeClr:'#00a8ff'});
    // writeText(ctx,{ text: 'Node 89', x: 73+(73*7.08*2.7), y: 90 },18,{color:'white'} );

    // drawCircle(ctx,100+(16*100),100,50,{insideColor:'#2d3436',strokeClr:'#00a8ff'});
    // writeText(ctx,{ text: 'Node 45', x: 73+(73*8.04*2.7), y: 90 },18,{color:'white'} );

    // const z1={x:100+(16*100),y:100};
    // const z2={x:100+(12*100),y:100+(2*200)};
    // //console.log("Draw label : "+p.x+p.y+b.x+b.y);
    // drawLabel(ctx,"XXYYZZAABB",z1,z2,'center',0);

    // drawCircle(ctx,100+(2*100),100+(6*100),50,{insideColor:'#2d3436',strokeClr:'#00a88f'});
    // writeText(ctx,{ text: 'Node 999', x: 100+(2*100), y: 90+(6*100) },18,{color:'white'} );

    // drawCircle(ctx,100+(12*100),100,50,{insideColor:'#2d3436',strokeClr:'#00a88f'});
    // writeText(ctx,{ text: 'Node 7', x: 100+(12*100), y: 90 },18,{color:'white'} );

    // const a={x:100+(2*100),y:100+(6*100)};
    // const b={x:100+(12*100),y:100};
    // console.log("Draw label : "+a.x+a.y+b.x+b.y);
    // drawLabel(ctx,"Node Connections",b,a,'center',0);

    // drawLineBetween(ctx,100+(2*100)+50,100+(6*100)-25,100+(12*100)-50,100+25,{strokeClr:'#2d3436'});
    // // const r2Info = { x: 100, y: 100, w: 80, h: 150 };
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
      {/* <h3>BlockFlow </h3> */}

      <Container  className='contSimSpeed'>
            <p className='paraSimSpeed'> Simulation Speed : </p>
            <Button className='btn' variant="dark" onClick={()=>setsimSpeed(1000) }>1x </Button>
            <Button className='btn' variant="dark" onClick={()=>setsimSpeed(500) }>2x </Button>
            <Button className='btn' variant="dark" onClick={()=>setsimSpeed(250) }>4x </Button>
            <Button className='btn' variant="dark" onClick={()=>setsimSpeed(100) }>16x </Button>
      {/* { simSpeed} */}
      </Container>
      <canvas ref={canvas}></canvas>
    </div>
  );
}

export default BlockFlow;