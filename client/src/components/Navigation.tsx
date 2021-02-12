import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AuthContext } from '../contexts/Auth';
import React, { useContext } from 'react';

const Navigation: React.FC<RouteComponentProps> = ({history}) => {

    const { userToken } = useContext(AuthContext);

    const isUserAuthenticated: boolean = !!userToken;
    
    const query: string = history.location.search.split('=')[1];
    const path: string = history.location.pathname;
    
    return (     
        <Navbar bg="light" expand="lg">
            <Container>
                <LinkContainer to='/videos?category=trailers'>
                    <Navbar.Brand className='logo'>PARADISE</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {isUserAuthenticated &&
                            <LinkContainer to='/videos/contents'>
                                <Nav.Link active={path === '/videos/contents'} className='text-right'>וידאו שלי</Nav.Link>
                            </LinkContainer>
                        }

                        <LinkContainer to='/videos?category=advertisement'>
                            <Nav.Link active={query === 'advertisement'} className='text-right'>פרסומות</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to='/videos?category=montages'>
                            <Nav.Link active={query === 'montages'} className='text-right'>מונטאז'ים</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to='/videos?category=trailers'>
                            <Nav.Link active={query === 'trailers'} className='text-right'>טריילרים</Nav.Link>
                        </LinkContainer>

                        {isUserAuthenticated &&
                            <LinkContainer to='/logout'>
                                <Nav.Link className='text-right'>יציאה</Nav.Link>
                            </LinkContainer>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default withRouter(Navigation);