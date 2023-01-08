import React, { useRef, useEffect, useState } from 'react'
import {useNavigate ,Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

// import Background from '../A.png'
import './Homepage.css'

const Homepage = () => {

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [numOfNodes, setNumOfNodes] = useState(0);
    const [type,setType]=useState(null);

    let whitespace ="  ";
    const navigate = useNavigate();

    useEffect(()=>{
        window.localStorage.setItem('files',selectedFile);
    },[selectedFile]) 
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };
    const resetFile=()=>{
      setSelectedFile();
      setIsFilePicked(false);
    }
    const handleSubmission = () => {

        if( !type 
          ||((type=='BlockFlow'||type=='Connection-Table')&&(numOfNodes==0 || selectedFile.type!='application/json' || selectedFile.name!='output.json') ) 
          ||((type=='ChainFlow')&&( selectedFile.type!='text/plain' || selectedFile.name!='blockList.txt' )    )
          || !isFilePicked ){
             
            alert("Please fill every field with proper values.\nRead the instructions for more information");
            return ;
        }

        console.log(numOfNodes);

       
      if(type=='BlockFlow')
        navigate('/blockflow', { /*replace: true ,*/state: {data: selectedFile,num:numOfNodes}})
      else if(type=='ChainFlow')
        navigate('/chainflow', { /*replace: true ,*/state: {data: selectedFile}})
      else if(type=='Connection-Table')
        navigate('/table', { /*replace: true ,*/state: {data: selectedFile,num:numOfNodes}})
           
    }
    return (
        
      
        <div  className="pageContainer">
         {/* <div>HOMEPAGE</div> */}
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <div>
        <input type="file" className="fUpclass" id="files"
         name="file"  onChange={changeHandler} />
        
        <div className='parentContainer'>
         
        {
            isFilePicked ? (
              <div className='fileUploadedContainer'>
                <p id='filePara'>Filename: {selectedFile.name} {whitespace} </p>
                <p id='filePara'>| Filetype: {selectedFile.type}</p>
                <p id='filePara'>| Size : {(selectedFile.size/1024).toFixed(2)} KB</p>
                 {/* { selectedFile.name=='blockList.txt'? setType("ChainFlow"): setType("BlockFlow")} */}

              </div>
            ) : (
              <div>
                {/* Select a file to show details */}

              </div>
            )
          }
          <label htmlFor="files"   className='modal-label'  >
                {isFilePicked ?selectedFile.name: "Select file"}</label>
          {/* <Button className='btnblock'>A</Button> */}
          
          {
          isFilePicked? <i className="far fa-window-close btnblock" onClick={ resetFile }></i>
          : <div></div>
          
          }
          <div>

         
          <Form.Control  type="text" className="numOfNodesInput" placeholder="Num of Nodes"
            onChange={(e)=>{ 
                
                 if(!isNaN(parseInt(e.target.value))){
                    setNumOfNodes(parseInt(e.target.value))
                 }
                
                 console.log(numOfNodes);

            }}
          />
          <Dropdown className="">
          <Dropdown.Toggle  className='dropdownClass' variant="outline-dark" id="dropdown-basic">
          { type ? type:"Select Type"}
           
          </Dropdown.Toggle>
          <Dropdown.Menu className="">
            <Dropdown.Item onClick={() => { setType("BlockFlow") }}>BlockFlow</Dropdown.Item>
            <Dropdown.Item onClick={() => { setType("ChainFlow")}}>ChainFlow</Dropdown.Item>
            <Dropdown.Item onClick={() => { setType("Connection-Table")}}>Connection-Table</Dropdown.Item>

          </Dropdown.Menu>
         </Dropdown>
            {/* <DropdownButton className='homepage-dropdown dropdown ' 
            title={ type ? type:"Select Type"}  variant='light'
            onSelect= {(e)=>{  console.log(e); setType(e);  }}  >

            <Dropdown.Item eventKey="⠀⠀⠀⠀⠀⠀⠀BlockFlow⠀⠀⠀⠀⠀">BlockFlow</Dropdown.Item>
            <Dropdown.Item eventKey="⠀⠀⠀⠀⠀⠀⠀ChainFlow⠀⠀⠀⠀⠀">ChainFlow</Dropdown.Item>
            <Dropdown.Item eventKey="⠀⠀⠀Connection-Table⠀⠀⠀">Connection-Table</Dropdown.Item>
          
          </DropdownButton> */}

            <Button  className="submitbtn btn" variant="dark" onClick={handleSubmission}>Submit</Button>
    
            {/* <Link to="/blockflow" state={{ data: selectedFile,num:300 }} 
            className="link">   blockflow</Link> */}
          </div>

          </div>
          </div>

           {/* //////Footer ////////////////////////////////// */}
          <div className='footerHomepage'>
              <p id='NBfooter'><b>1. Number Of Nodes</b> is necessary for Visualisation of BlockFlow and Connection-Table</p>
              <p id='NBfooter'><b>2.</b> for <b>BlockFlow</b> and <b>Connection-Table</b> upload "<b>Output.json</b>" generated from <a href="https://github.com/dsg-titech/simblock">Simblock</a> </p>
              <p id='NBfooter'><b>3.</b> for <b>ChainFlow</b> upload "<b>blockList.txt</b>"generated from <a href="https://github.com/dsg-titech/simblock">Simblock</a></p>
              <p id='NBfooter'><b>4.</b> Simblock generates "output.json" & "blockList" in - <i>simblock/simulator/src/dist/output</i> folder</p>
          </div>

        </div>)
}

export default Homepage