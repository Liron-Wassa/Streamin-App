import { Container, Table, Alert, Spinner } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import React, { useState, useEffect } from 'react';
import { IVideo } from '../interfaces/video';
import axios from 'axios';

interface IMyVideos extends RouteComponentProps{}

const MyVideos: React.FC<IMyVideos> = ({ history }) => {

    const [isVideoDelete, setIsVideoDelete] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [videos, setVideos] = useState<IVideo[]>([]);
    const [error, setError] = useState<string>('');
    
    useEffect(() => {
        const fetchAllVideos = () => {
            setError('');
            setIsLoading(true);
            setIsVideoDelete(false);
    
            axios.get('/api/videos')
            .then(res => {
                setIsLoading(false);
                setVideos(res.data);
            })
            .catch(error => {
                setIsLoading(false);
                setError(error.response.data);
            });
        };

        fetchAllVideos();
    }, [isVideoDelete]);

    const deleteVideoHandler = (videoId: string): void => {
        if(window.confirm('אתה בטוח ?')) {
            setError('');
            setIsLoading(true);

            axios.delete(`/api/videos/${videoId}`)
            .then(res => {
                setIsLoading(false);
                setIsVideoDelete(true);
            })
            .catch(error => {
                setIsLoading(false);
                setError(error.response.data)
            });
        };
    };

    const editImage = (videoId: string): void => {
        history.push(`/videos/contents/${videoId}/edit`);
    };

    return (
        <Container as='section' className='MyVideos my-5'>
            <h2 className='text-center mb-4'>כל הוידיאו</h2>

                {isLoading &&
                    <div className='d-flex justify-content-center my-4'>
                        <Spinner
                            animation="border"
                            variant="secondary"
                        />
                    </div>
                }

                {!isLoading && !error &&
                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th className='text-right'>תאריך</th>
                                <th className='text-right'>מחיר</th>
                                <th className='text-right'>כותרת</th>
                                <th className='text-right'>קטגוריה</th>
                                <th className='text-right'>ודיאו</th>
                                <th className='text-right'></th>
                            </tr>
                        </thead>
                    
                        {videos.map(video => (
                            <tbody key={video._id}>
                                <tr>
                                    <td className='text-right'>
                                        {video.isUncompleted ?
                                            <span>לא מוגדר</span>
                                        :
                                            <span>{video.updatedAt.substr(0, 10).split('-').reverse().join('/')}</span>
                                        }
                                    </td>

                                    <td className='text-right'>
                                        {video.isUncompleted ?
                                            <span>לא מוגדר</span>
                                        :
                                            <span>&#8362;{video.price}</span>
                                        }
                                    </td>

                                    <td className='text-right'>
                                        {video.isUncompleted ?
                                            <span>לא מוגדר</span>
                                        :
                                            <span>{video.title}</span>
                                        }
                                    </td>

                                    <td className='text-right'>
                                        {video.isUncompleted ?
                                            <span>לא מוגדר</span>
                                        :
                                            <span>{video.category}</span>
                                        }
                                    </td>

                                    <td style={{width: '250px'}}>
                                        <div className={video.isUncompleted ? 'video-box uncompleted' : 'video-box'}>
                                            <video controls>
                                                <source src={`/${video.src}`} type="video/mp4" />
                                            </video>
                                        </div>
                                    </td>

                                    <td className='text-right'>
                                        <div className="d-flex justify-content-between">
                                            <i className="fas fa-edit" onClick={() => editImage(video._id)}></i>
                                            <i className="far fa-trash-alt" onClick={() => deleteVideoHandler(video._id)}></i>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                }

                {error &&
                    <Alert variant='danger'>
                        {error}
                    </Alert>
                }

                {videos.length === 0 && !error && !isLoading && <h2 className='text-center'>!רשימה ריקה</h2>}
        </Container>
    )
}

export default MyVideos;