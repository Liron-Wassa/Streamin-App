import { Container } from 'react-bootstrap';
import Social from './Social';
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer>
            <Container>
                <Social />

                <p>.כל הזכויות שמורות © 2021 אביאל ווסה</p>
            </Container>
        </footer>
    )
}

export default Footer;