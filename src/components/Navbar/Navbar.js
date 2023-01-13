
import React, {  useEffect/*,useState*/ } from 'react'
import {useNavigate ,Link} from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './Navbar.css'

function ColorSchemesExample(props) {

  const navigate = useNavigate();
  let pageName,currentUrl;
  currentUrl= RegExp(/chainflow/g).exec(window.location.href);
  //console.log(currentUrl!=null);
  if( (currentUrl!=null) && currentUrl.at(0)=='chainflow'){ pageName="Chainflow"; }
  currentUrl= RegExp(/blockflow/g).exec(window.location.href);
  if((currentUrl!=null) && currentUrl.at(0)=='blockflow'){pageName="Blockflow";}
  
  pageName=window.location.href.split('/')[3];

  useEffect(() => {
    console.log("NAVBAR "+props.data.length);
   
  }, [props.data])
  
 
  
  return (
    <>
      <Navbar className='navbarCls'bg="dark" variant="dark">
        <Navbar.Brand className='navBar' href="/homepage">Simplot...</Navbar.Brand>
        <Container  >
          <Nav className="me">

            { (props.root=='blockflow' ||props.root=='ctableflow') &&

            <> 
            <Nav.Link  onClick={()=>{
              navigate('/blockflow', { replace: true ,state: {data: props.data,num:props.NoN}})}} 
              >BlockFlow</Nav.Link> 
            <Nav.Link  onClick={()=>{
              navigate('/table', { replace: true ,state: {data: props.data,num:props.NoN}})}} 
              >Connection-Table</Nav.Link>
            </>
            
            }
          
            { (props.root=='chainflow') && 
                 <>
                <Nav.Link href="/chainflow">ChainFlow</Nav.Link>
                <Nav.Link href="/mintDist">Minter Distribution</Nav.Link>
                </>
            }
          </Nav>
        </Container>
        
             <p className='navBarPageName '  >
              {/* {props.pageName} */}
              <div class="content">
              <h2> {props.pageName}</h2>
              <h2> {props.pageName}</h2>
             </div>
            </p>
      </Navbar>
      <br />
      {/* <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <br />
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar> */}
    </>
  );
}

export default ColorSchemesExample;