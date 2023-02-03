import React, { useRef, useEffect/*,useState*/ } from 'react'
import useState from 'react-usestateref'

import {useNavigate ,Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';

import Navbar from '../Navbar/Navbar.js'
import { Chart } from "chart.js";


import './MinterDist.css'


const MinterDist = () => {

  const canvas = useRef();
  let ctx = null,ctxwidth=null,ctxheight=null;

  var [blockList,setblockList,blockListRef]=useState([]);
  var  [chainHeight,setChainHeight,chainHeightRef] = useState(-1);
  const navigate = useNavigate();
  const location = useLocation();

  const data = location.state?.data;
  const pat = RegExp(/(OnChain|Orphan) : [0-9]*/g) // matches 'OnCHain' Starting of each line processing
  const pat2 = RegExp(/Min([a-z]|:| )*[0-9]*/g) // matches 'Minter :' 
  const pat3_line = RegExp(/[\w\W}*[0-9][\n]/g) //Matches '\n' NEWLINE
  const pat4_orphan = RegExp(/Orphan/g)  //Check if Orphan

  const pat5 = RegExp(/chainflow/g)  //Check if Orphan

  function reSetblockList (arr){
      
    setblockList(arr);
    //console.log("reSetblockList :"+blockList.length);
    // RectCanvas(arr);
  }
  const sleep = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
  };

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
    reader.onload =async (event) => {

        let text=event.target.result;
        //console.log(text)
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
        index=0; index2=0;
        for(var i=0 ; i<arr1.length; i++){

            let s=text.slice(arr1[i],arr2[i]);
            //console.log(" STRING S = "+s);
            //console.log("OKOK "+parseString(pat4_orphan,s,1));
            const flowBlock ={
              ChainNo:parseString(pat,s),
              Minter:parseString(pat2,s),
              OnChain:parseString(pat4_orphan,s,1)? false:true,
            }
            if(flowBlock.OnChain) {
              index2++;
              temp[index]=flowBlock.Minter;
              index=index+1;
            }
           // console.log(s+":"+flowBlock.OnChain+" : "+flowBlock.ChainNo+" "+flowBlock.Minter);
        }
        await sleep(2000);
        setChainHeight(index2);
        console.log("OK--------"+chainHeightRef.current+ " \n "+temp)
        reSetblockList(temp);
        //console.log(blockList.length);
      };
    reader.readAsText(data);
  
  },[]);
  useEffect( () => {
    // dynamically assign the width and height to canvas

   async function createCanvas(){
      while( chainHeightRef.current==-1){

          await sleep(1000);
      }
    //   console.log("OK||"+chainHeightRef.current)
    //   const canvasEle = canvas.current;
    //   canvasEle.width = window.innerWidth;
    //   canvasEle.height = window.innerHeight /*100+(120*chainHeightRef.current)*/;
      
    //   ctxwidth= canvasEle.width;
    //   ctxheight= canvasEle.height ;
      // get context of the canvas
      ctx = document.getElementById("myChart4").getContext('2d');///canvasEle.getContext("2d");
      
      DataOfCanvas(blockListRef.current,ctx);
   }
   createCanvas();

    
  }, []);
  function DataOfCanvas(blockArray,ctx){
    
    let maxNode=-1,labelsMinter=[],dataMinter=[];
    let bgColor=[],bgBorderColor=[];
    const backgroundColor= [
      'rgba(153, 102, 255, 0.7)',
      'rgba(54, 162, 235, 0.7)',
      'rgba(255, 206, 86, 0.7)',
      'rgba(75, 192, 192, 0.7)',
      'rgba(255, 99, 132, 0.6)',
      'rgba(255, 159, 64, 0.8)'
    ]
    const borderColor= [
      'rgba(153, 102, 255, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(255,99,132,1)',
      'rgba(255, 159, 64, 1)'
    ];
    const MinterFreq = blockArray.reduce((acc, curr) => {
      acc[curr] = (acc[curr] ?? 0) + 1;
      maxNode=Math.max(maxNode,curr)
      return acc;
    }, {});

    console.log('Freq : '+MinterFreq+ ": XX "+borderColor[0]);
    for(let i=0; i<=maxNode;i++){
       if(MinterFreq[i]){
            console.log(i + ' = '+MinterFreq[i]);
            labelsMinter.push('Minter '+i);
            dataMinter.push(MinterFreq[i]);
            if(MinterFreq[i]<=4)
                {bgColor.push(backgroundColor[MinterFreq[i]-1]);bgBorderColor.push(borderColor[MinterFreq[i]-1]);}
            else{bgColor.push(backgroundColor[5]);bgBorderColor.push(borderColor[5]);}
           
       }
    }

    ///var ctx = document.getElementById("myChart4").getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labelsMinter,
        datasets: [{
          label: '# of Blocks Mined',
          backgroundColor: bgColor,
          borderColor:bgBorderColor,
          data: dataMinter,
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          },
          x: {
            beginAtZero: true
          },
          xAxes: [{ 
            gridLines: { lineWidth: 2 },
            zeroLineWidth:5,
            ticks: {
              fontSize: 15,
             
            }
         }],
         yAxes: [{ 
            gridLines: { lineWidth: 3 },
            ticks: {
              beginAtZero:true,
              fontSize: 15,
              fontStyle: "bold",
            }
         }]
        }
      }
    });
  }
  return (
    <div>
        <Navbar pageName='Minter⠀Distribution '  data={location.state?.data}
        root={'mintflow'}
        />
        {/* <div>MinterDist</div> */}
        <div class="wrapper">
        <canvas id="myChart4"></canvas>
        </div>
    </div>
  )
}

export default MinterDist