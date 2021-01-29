import { Container, Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import React from 'react'
 
const Navigation: React.FC = () => {
    return (
        <Navbar bg="light" variant="light">
            <Container className='d-flex justify-content-between'>
                <LinkContainer to='/videos/trailers'>
                    <Navbar.Brand>Logo</Navbar.Brand>
                </LinkContainer>

                <Nav>
                    <LinkContainer to='/videos/contents'>
                        <Nav.Link>וידאו שלי</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to='/videos/montages'>
                        <Nav.Link>'מונטאג</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to='/videos/trailers'>
                        <Nav.Link>טריילרים</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Navigation;