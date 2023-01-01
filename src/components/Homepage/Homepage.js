import React, { useRef, useEffect, useState } from 'react'
import {useNavigate ,Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// import Background from '../A.png'
import './Homepage.css'

const Homepage = () => {

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [numOfNodes, setNumOfNodes] = useState(0);

    let whitespace ="  ";
    const navigate = useNavigate();

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };
    
    const handleSubmission = () => {

        if(numOfNodes==0 || !isFilePicked){
             
            alert("Please fill every field with proper values.");
            return ;
        }
        console.log(numOfNodes);
        navigate('/blockflow', { /*replace: true ,*/state: {data: selectedFile,num:300}})
    }
    return (
        <div>
         {/* <div>HOMEPAGE</div> */}

        <div className="pageContainer">
        <input type="file" className="fUpclass" id="files"
         name="file"  onChange={changeHandler} />

         <div className='parentContainer'>
         
        {
            isFilePicked ? (
              <div className='fileUploadedContainer'>
                <p id='filePara'>Filename: {selectedFile.name} {whitespace} </p>
                <p id='filePara'>| Filetype: {selectedFile.type}</p>
                <p id='filePara'>| Size in bytes: {selectedFile.size}</p>
               
              </div>
            ) : (
              <div>
                {/* Select a file to show details */}

              </div>
            )
          }
          <label htmlFor="files"   className='modal-label'  >
                {isFilePicked ?selectedFile.name: "Select file"}</label>
          <div>

         
          <Form.Control type="text" className="numOfNodesInput" placeholder="Num of Nodes"
            onChange={(e)=>{ 
                
                 if(!isNaN(parseInt(e.target.value))){
                    setNumOfNodes(parseInt(e.target.value))
                 }
                 console.log(numOfNodes);

            }}
          />
         

            <Button  className="submitbtn btn" variant="dark" onClick={handleSubmission}>Submit</Button>
    
            {/* <Link to="/blockflow" state={{ data: selectedFile,num:300 }} 
            className="link">   blockflow</Link> */}
          </div>

          </div>
          </div>
        </div>)
}

export default Homepage