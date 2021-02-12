import { Button, Container } from 'react-bootstrap';
import React from 'react'
import { RouteComponentProps } from 'react-router-dom';

interface INotFoundPage extends RouteComponentProps {};

const NotFoundPage: React.FC<INotFoundPage> = ({ history }) => {
    return (
        <Container as='section' className='NotFound d-flex justify-content-center align-items-center flex-column'>
            <div className='d-flex justify-content-center align-items-center flex-column'>
                <i className="far fa-frown"></i>
                <h1>404</h1>
            </div>

            <p>
                !הדף שאתה מחפש לא נמצא
            </p>

            <div className='d-flex justify-content-end'>
                <Button variant="light" type="submit" size='sm' onClick={() => history.goBack()}>
                    חזור אחורה
                </Button>
            </div>
        </Container>
    );
};

export default NotFoundPage;