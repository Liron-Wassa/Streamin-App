import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface IEditVideo extends RouteComponentProps<{videoId: string}> {};

const EditVideo: React.FC<IEditVideo> = ({ history, match }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [category, setCategory] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchVideo = () => {
            setIsLoading(true);
            setError('');
    
            axios.get(`/api/videos/${match.params.videoId}`)
            .then(res => {
                const category: string = res.data.category ? res.data.category : 'טריילרים';

                setIsLoading(false);
                setCategory(category);
                setTitle(res.data.title);
                setPrice(res.data.price);
            })
            .catch(error => {
                setIsLoading(false);
                setError(error.response.data);
            });
        };

        fetchVideo();

    }, [match]);

    const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        
        setIsLoading(true);
        setError('');

        axios.patch(`/api/videos/${match.params.videoId}`, {category, title, price, isUncompleted: false})
        .then(res => {
            setIsLoading(false);
            history.goBack();
        })
        .catch(error => {
            setIsLoading(false);
            setError(error.response.data);
        });
    };

    return (
        <Container as='section' className='EditVideo my-5'>
            <h2 className='text-center mb-4'>ערוך תוכן</h2>

            {isLoading &&
                <div className='d-flex justify-content-center my-4'>
                    <Spinner
                        animation="border"
                        variant="secondary"
                    />
                </div>
            }

            {error &&
                <Alert variant='danger'>
                    {error}
                </Alert>
            }

            {!isLoading &&
                <Button variant="light" type="submit" size='sm' onClick={() => history.goBack()}>
                    חזרה
                </Button>
            }

            {!isLoading &&
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="exampleForm.SelectCustom">
                    <div className='d-flex justify-content-end'>
                        <Form.Label>קטגוריה</Form.Label>
                    </div>

                    <Form.Control
                        as="select"
                        custom dir='rtl'
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                    >
                        <option>טריילרים</option>
                        <option>מונטאז'ים</option>
                        <option>פרסומות</option>
                    </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlInput1">
                        <div className='d-flex justify-content-end'>
                            <Form.Label>כותרת</Form.Label>
                        </div>

                        <Form.Control
                            as="textarea"
                            rows={3} type="text"
                            placeholder="הזן כותרת"
                            dir='rtl'
                            value={title}
                            onChange={(event => setTitle(event.target.value))}
                        />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlInput1">
                        <div className='d-flex justify-content-end'>
                            <Form.Label>מחיר</Form.Label>
                        </div>
                        
                        <Form.Control
                            type="number"
                            placeholder="הזן מחיר"
                            dir='rtl'
                            value={price ? price : ''}
                            onChange={(event) => setPrice(event.target.value)}
                        />
                    </Form.Group>

                    <div className='d-flex justify-content-end'>
                        <Button variant="light" type="submit">
                            שמור
                        </Button>
                    </div>
                </Form>
            }
        </Container>
    );
};

export default EditVideo;