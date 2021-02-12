import { fetchVideo, updateVideo, cancelVideoRequest } from '../api/video';
import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import React, { useState, useEffect, useContext } from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { AuthContext } from '../contexts/Auth';
import { IVideo } from '../interfaces/video';

interface IEditVideo extends RouteComponentProps<{videoId: string}> {};

const EditVideo: React.FC<IEditVideo> = ({ history, match }) => {

    const [isVideoUpdated, setIsVideoUpdated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string | number>('');
    const [category, setCategory] = useState<string>('');
    const [error, setError] = useState<string>('');

    const { userToken } = useContext(AuthContext);

    useEffect(() => {
        const fetchVideoHandler = async (): Promise<void> => {
            try {
                setIsLoading(true);
                setError('');
                
                const video = await fetchVideo(userToken, match.params.videoId);

                const category: string = video.category ? video.category : 'טריילרים';

                setIsLoading(false);
                setCategory(category);
                setDescription(video.description);
                setPrice(video.price);

            } catch (error) {
                if(error.message === 'Cancel') return;

                setIsLoading(false);
                setError(error.message);
            };
        };

        fetchVideoHandler();
        return () => cancelVideoRequest();


    }, [match, userToken]);

    const updateVideoHandler = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            event.preventDefault();
            
            setIsLoading(true);
            setError('');

            const updatedFields: IVideo = { category, description, price, isUncompleted: false };
            await updateVideo(userToken, match.params.videoId, updatedFields);

            setIsLoading(false);
            setIsVideoUpdated(true);

        } catch (error) {
            if(error.message === 'Cancel') return;

            setIsLoading(false);
            setError(error.message);
        };
    };

    if(isVideoUpdated) {
        return <Redirect to='/videos/contents' />;
    };

    return (
        <Container as='section' className='EditVideo'>
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
                <Form onSubmit={updateVideoHandler}>
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
                            <Form.Label>תיאור</Form.Label>
                        </div>

                        <Form.Control
                            as="textarea"
                            rows={3} type="text"
                            placeholder="הזן תיאור"
                            dir='rtl'
                            value={description}
                            onChange={(event => setDescription(event.target.value))}
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