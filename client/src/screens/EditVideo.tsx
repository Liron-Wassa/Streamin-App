import { Container, Form, Button } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import React from 'react';

interface IEditVideo extends RouteComponentProps {}

const EditVideo: React.FC<IEditVideo> = ({ history }) => {    

    const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        console.log('submit');
    };

    return (
        <Container as='section' className='EditVideo my-5'>
            <h2 className='text-center mb-4'>ערוך תוכן</h2>
            <Button variant="light" type="submit" size='sm' onClick={() => history.goBack()}>
                חזרה
            </Button>

            <Form onSubmit={submitHandler}>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <div className='d-flex justify-content-end'>
                    <Form.Label>קטגוריה</Form.Label>
                  </div>

                  <Form.Control as="select" custom dir='rtl'>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput1">
                    <div className='d-flex justify-content-end'>
                        <Form.Label>כותרת</Form.Label>
                    </div>

                    <Form.Control as="textarea" rows={3} type="text" placeholder="הזן כותרת" dir='rtl' />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput1">
                    <div className='d-flex justify-content-end'>
                        <Form.Label>מחיר</Form.Label>
                    </div>
                    
                    <Form.Control type="number" placeholder="הזן מחיר" dir='rtl' />
                </Form.Group>

                <div className='d-flex justify-content-end'>
                    <Button variant="light" type="submit">
                        שמור
                    </Button>
                </div>
            </Form>

        </Container>
    )
}

export default EditVideo;