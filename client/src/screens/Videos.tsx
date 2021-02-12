import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Container, Button, Alert, Spinner } from 'react-bootstrap';
import { fetchVideos, cancelVideoRequest } from '../api/video';
import { ICategories, IVideo } from '../interfaces/video';
import AddVideoModal from '../components/AddVideoModal';
import { RouteComponentProps } from 'react-router-dom';
import { SocketContext } from "../contexts/Socket";
import { AuthContext } from '../contexts/Auth';
import { motion } from 'framer-motion';

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
    const { userToken } = useContext(AuthContext);

    const isUserAuthenticated: boolean = !!userToken;

    const categories: ICategories = useMemo(() => ({
        trailers: "טריילרים",
        montages: "מונטאז'ים",
        advertisement: "פרסומות"
    }), []);

    useEffect(() => {
        const fetchVideosHandler = async (): Promise<void> => {
            try {
                setError('');
                setVideos([]);
                setIsLoading(true);
                
                const videos = await fetchVideos(categories[currentCategory]);
                                      
                setVideos(videos);
                setIsLoading(false);

            } catch (error) {
                if(error.message === 'Cancel') return;
                
                setError(error.message);
                setIsLoading(false);
            };
        };

        fetchVideosHandler();

        socket.on('updatedVideos', (videos: IVideo[]) => {            
            setVideos(videos);
        });

        return () => cancelVideoRequest();

    }, [categories, currentCategory, socket]);

    return (
        <Container as='section' className='Videos p-3'>
            
            {isUserAuthenticated &&
                <>
                    <div className='d-flex justify-content-center mb-2'>
                        <Button variant="light" size='sm' onClick={() => setIsModalShow(true)}>+ הוסף וידיאו</Button>
                    </div>
                    
                    <AddVideoModal
                        isModalShow={isModalShow}
                        setIsModalShow={setIsModalShow}
                        categories={categories}
                        currentCategory={currentCategory}
                    />
                </>
            }

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

            <div className='videoContainer'>
                {[...videos].reverse().map(video => {
                    return (
                        <motion.div
                            className='video-card'
                            key={video._id}
                            layout
                        >                            
                            <div className='video-box'>
                                <video controls>
                                    <source src={`/${video.src}`} type="video/mp4" />
                                </video>
                            </div>

                            <div className='video-content'>
                                <p className='text-right text-break description'>{video.description}</p>

                                <div className='d-flex flex-column'>
                                    <span className='text-right'>&#8362;{video.price} מחירון</span>
                                    <span className='text-right'>{video.updatedAt!.substr(0, 10).split('-').reverse().join('/')}</span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </Container>
    )
}

export default Videos;