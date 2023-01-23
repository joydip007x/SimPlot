import React, { useRef, useEffect, useState } from 'react'
import {useNavigate ,Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';

import Navbar from '../Navbar/Navbar.js'


const ConnectionTable = () => {

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const pat = RegExp(/"end-node-id":[0-9]*,"block-id":[0-9]*\}\}/g) // matches '}}' ending of each transmission
  const pat2 = RegExp(/\{"kind":"fl/g) // matches '{kind:Flowblovck' begining of each transmission
  const pat3 = RegExp(/\}\}/g) // matches '}}' ending of each transmission

  const navigate = useNavigate();
  const location = useLocation();
  var text=null;


  const data = location.state?.data;
  const numOfNodes  = location.state?.num;

  
  console.log("000000000\n"+data+ data.type);
  const changeHandler = (event) => {

    setSelectedFile(event.target.files[0]);

    setIsFilePicked(true);

  };
  const handleSubmission = () => {

          var reader = new FileReader();
          reader.onload = (event) => {

            console.log(event.target.result);
            text=event.target.result;
            // var index=0,match,index2=0,match2;
            // let arr1 = [],arr2=[],temp=[];
            // //store ending index to scrap each line
            // while ((match = pat.exec(text)) != null) {
            //   let posx=match.index, cnt=0;
            //   while ((match2 = pat3.exec(match.at(0))) != null) {
                  
            //       // match=pat3.exec(match.at(0));
            //       if(cnt==0){
            //            arr2[index]=match.index+30; index=index + 1;
            //            //console.log(match2.at(0)+" == "+match.index)
            //       }
            //       cnt++;
            //   }
            // }
            // //store begining index to scrap each line
            // while ((match = pat2.exec(text)) != null) {
            //   arr1[index2]=match.index; index2=index2 + 1;
            // }
            // for(let k=0; k<200;k++){
            //   //console.log(arr1[k]+ " : "+arr2[k]+"\n"+index+index2 +text.slice(arr1[k],arr2[k])+"}}" )
            // }
            // console.log(arr1[0]+ " : "+arr2[0]+"\n"+index+index2 +text.slice(arr1[0],arr2[0])+"}}" )
            // index=0;

            //history.push("/about", );  
            navigate('/blockflow', { state: {data: selectedFile,num:300}})
           // window.location.replace('/blockflow')
          }
          reader.onerror = (event) => {
            alert(event.target.error.name);
          };
          reader.readAsText(selectedFile);
        
  };
  
  return (
    <div>
     <Navbar pageName='ConnectionTable' data={location.state?.data} 
     root={'ctableflow'} NoN={location.state?.num}/>
     <div>ConnectionTable</div>

    <input type="file" name="file" onChange={changeHandler} />

    {
        isFilePicked ? (
          <div>
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            {/* <p>
              lastModifiedDate:{' '}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p> */}
          </div>
        ) : (
          <p>Select a file to show details</p>
        )
      }
      <div>
        <button onClick={handleSubmission}>Submit</button>

        <Link to="/blockflow"  className="link">   blockflow</Link>
      </div>
    </div>)
}

export default ConnectionTable