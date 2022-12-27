import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './Navbar.css'

function ColorSchemesExample() {

  let pageName,currentUrl;
  currentUrl= RegExp(/chainflow/g).exec(window.location.href);
  //console.log(currentUrl!=null);
  if( (currentUrl!=null) && currentUrl.at(0)=='chainflow'){ pageName="Chainflow"; }
  currentUrl= RegExp(/blockflow/g).exec(window.location.href);
  if((currentUrl!=null) && currentUrl.at(0)=='blockflow'){pageName="Blockflow";}

  return (
    <>
      <Navbar  bg="dark" variant="dark">
        <Navbar.Brand className='navBar' href="#home">Simplot...</Navbar.Brand>
        <Container  >
          <Nav className="me">
            <Nav.Link href="/blockflow">BlockFlow</Nav.Link>
            <Nav.Link href="/chainflow">ChainFlow</Nav.Link>
            <Nav.Link href="/table">Connection-Table</Nav.Link>
          </Nav>
        </Container>
             <p className='navBarPageName'>{pageName}</p>
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