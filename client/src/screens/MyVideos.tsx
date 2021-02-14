import { fetchAllVideos, cancelVideoRequest, deleteVideo } from '../api/video';
import { Container, Table, Alert, Spinner } from 'react-bootstrap';
import React, { useState, useEffect, useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import { AuthContext } from '../contexts/Auth';
import { IVideo } from '../interfaces/video';

interface IMyVideos extends RouteComponentProps{}

const MyVideos: React.FC<IMyVideos> = ({ history }) => {

    const [isVideoDelete, setIsVideoDelete] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [videos, setVideos] = useState<IVideo[]>([]);
    const [error, setError] = useState<string>('');

    const { userToken } = useContext(AuthContext);
    
    useEffect(() => {
        const fetchAllVideosHandler = async (): Promise<void> => {
            try {  
                setError('');
                setIsLoading(true);
                setIsVideoDelete(false);
    
                const videos = await fetchAllVideos(userToken);
                
                setIsLoading(false);
                setVideos(videos);
                
            } catch (error) {
                if(error.message === 'Cancel') return;
                
                setIsLoading(false);
                setError(error.message);
            };
        };

        fetchAllVideosHandler();

        return () => cancelVideoRequest();
        
    }, [isVideoDelete, userToken]);
    
    const deleteVideoHandler = async (videoId: string): Promise<void> => {
        try { 
            if(window.confirm('אתה בטוח ?')) {
                setError('');
                setVideos([]);
                setIsLoading(true);
    
                await deleteVideo(userToken, videoId);

                setIsLoading(false);
                setIsVideoDelete(true);
            };
        } catch (error) {            
            if(error.message === 'Cancel') return;
            
            setIsLoading(false);
            setError(error.message)
        };
    };

    const editImage = (videoId: string): void => {
        history.push(`/videos/contents/${videoId}/edit`);
    };

    return (
        <Container as='section' className='MyVideos'>
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
                    
                        <tbody>
                            {videos.map(video => (
                                <tr key={video._id}>
                                    <td data-header=':תאריך' className='text-right'>
                                        {video.isUncompleted ?
                                            <span>לא מוגדר</span>
                                        :
                                            <span>{video.updatedAt!.substr(0, 10).split('-').reverse().join('/')}</span>
                                        }
                                    </td>

                                    <td data-header=':מחיר' className='text-right'>
                                        {video.isUncompleted ?
                                            <span>לא מוגדר</span>
                                        :
                                            <span>&#8362;{video.price}</span>
                                        }
                                    </td>

                                    <td data-header=':תיאור' className='text-right descriptionTd'>
                                        {video.isUncompleted ?
                                            <span>לא מוגדר</span>
                                        :
                                            <span className='description text-break'>{video.description}</span>
                                        }
                                    </td>

                                    <td data-header=':קטגוריה' className='text-right'>
                                        {video.isUncompleted ?
                                            <span>לא מוגדר</span>
                                        :
                                            <span>{video.category}</span>
                                        }
                                    </td>

                                    <td data-header=':וידיאו' className='videoTd'>
                                        <div className={video.isUncompleted ? 'video-box uncompleted' : 'video-box'}>
                                            <video controls>
                                                <source src={`${video.src}`} type="video/mp4" />
                                            </video>
                                        </div>
                                    </td>

                                    <td className='text-right buttonsTd'>
                                        <div className="d-flex justify-content-between">
                                            <i className="fas fa-edit" onClick={() => editImage(video._id!)}></i>
                                            <i className="far fa-trash-alt" onClick={() => deleteVideoHandler(video._id!)}></i>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
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