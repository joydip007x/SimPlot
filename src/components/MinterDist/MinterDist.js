import React, { useRef, useEffect/*,useState*/ } from 'react'
import useState from 'react-usestateref'

import {useNavigate ,Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';

import Navbar from '../Navbar/Navbar.js'


import './MinterDist.css'


const MinterDist = () => {

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
    console.log("reSetblockList :"+blockList.length);
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
            if(flowBlock.OnChain) index2++;
            temp[index]=flowBlock;
            index=index+1;
           // console.log(s+":"+flowBlock.OnChain+" : "+flowBlock.ChainNo+" "+flowBlock.Minter);
        }
        await sleep(2000);
        setChainHeight(index2);
        console.log("OK--------"+chainHeightRef.current)
        reSetblockList(temp);
        //console.log(blockList.length);
      };
    reader.readAsText(data);
  
  },[]);

  return (
    <div>
        <Navbar pageName='Minter⠀Distribution '  data={location.state?.data}
        root={'mintflow'}
        />
        <div>MinterDist</div>
    </div>
  )
}

export default MinterDist