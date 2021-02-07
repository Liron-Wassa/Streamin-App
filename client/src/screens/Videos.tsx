import { Container, Col, Row, Button, Alert, Spinner } from 'react-bootstrap';
import React, { useState, useEffect, useMemo, useContext } from 'react';
import { ICategories, IVideo } from '../interfaces/video';
import AddVideoModal from '../components/AddVideoModal';
import { RouteComponentProps } from 'react-router-dom';
import { SocketContext } from "../contexts/Socket";
import axios from 'axios';

interface IVideos extends RouteComponentProps {}

const Videos: React.FC<IVideos> = ({ history }) => {
    
    const queryParams: string = history.location.search;

    if(!queryParams) {
        history.push('/videos?category=trailers');
    };

    const currentCategory: string = queryParams.split('=')[1];

    const [isModalShow, setIsModalShow] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [videos, setVideos] = useState<IVideo[]>([]);
    const [error, setError] = useState<string>('');

    const { socket } = useContext(SocketContext);

    const categories: ICategories = useMemo(() => ({
        trailers: "טריילרים",
        montages: "מונטאז'ים",
        advertisement: "פרסומות"
    }), []);

    useEffect(() => {
        const fetchVideos = (): void => {
            setError('');
            setVideos([]);
            setIsLoading(true);
    
            axios.get(`/api/videos?category=${categories[currentCategory]}`)
            .then(res => {            
                setVideos(res.data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.response.data);
                setIsLoading(false);
            });
        };

        fetchVideos();

        socket.on('updatedVideos', (videos: IVideo[]) => {            
            setVideos(videos);
        });

    }, [categories, currentCategory, socket]);
    
    return (
        <Container as='section' className='Videos p-3 my-5'>
            <div className='d-flex justify-content-center mb-2'>
                <Button variant="light" size='sm' onClick={() => setIsModalShow(true)}>+ הוסף וידיאו</Button>
            </div>
            
            <AddVideoModal
                isModalShow={isModalShow}
                setIsModalShow={setIsModalShow}
                categories={categories}
                currentCategory={currentCategory}
            />

            {isLoading &&
                <div className='d-flex justify-content-center mt-4'>
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

            {videos.length === 0 && !error && !isLoading && <h2 className='text-center'>!רשימה ריקה</h2>}

            <Row>
                <Col className='d-flex justify-content-center flex-wrap'>
                    {videos.map(video => {
                        return (
                            <div className='video-card' key={video._id}>
                                <h4 className='text-right'>{video.title}</h4>
                            
                                <div className='video-box'>
                                    <video controls>
                                        <source src={`/${video.src}`} type="video/mp4" />
                                    </video>
                                </div>

                                <p className='text-right m-0'>
                                    <span>&#8362;{video.price}</span>
                                    <strong className='ml-2'>:מחיר</strong>
                                </p>
                                
                                <em className='text-right'>{video.updatedAt.substr(0, 10).split('-').reverse().join('/')}</em>
                            </div>
                        );
                    })}
                </Col>
            </Row>
        </Container>
    )
}

export default Videos;