import { Container, Col, Row, Button } from 'react-bootstrap';
import AddVideoModal from '../components/AddVideoModal';
import React, { useState } from 'react';

const Videos: React.FC = () => {

    const [isModalShow, setIsModalShow] = useState<boolean>(false);

    return (
        <Container as='section' className='Videos p-3 my-5'>
            <div className='d-flex justify-content-center mb-2'>
                <Button variant="light" size='sm' onClick={() => setIsModalShow(true)}>+ הוסף וידיאו</Button>
            </div>
            
            <AddVideoModal
                isModalShow={isModalShow}
                setIsModalShow={setIsModalShow}
            />

            <Row>
                <Col className='d-flex justify-content-center flex-wrap'>
                    <div className='video-card'>
                        <h4 className='text-right'>וידאו אפקט</h4>
                
                        <div className='video-box'>
                            <video controls>
                                <source src='https://player.vimeo.com/external/291648067.sd.mp4?s=7f9ee1f8ec1e5376027e4a6d1d05d5738b2fbb29&profile_id=164&oauth2_token_id=57447761' type="video/mp4" />
                            </video>
                        </div>

                        <p className='text-right m-0'>
                            <span>&#8362;255</span>
                            <strong className='ml-2'>:מחיר</strong>
                        </p>
                    </div>
                    <div className='video-card'>
                        <h4 className='text-right'>וידאו אפקט</h4>
                
                        <div className='video-box'>
                            <video controls>
                                <source src='https://player.vimeo.com/external/291648067.sd.mp4?s=7f9ee1f8ec1e5376027e4a6d1d05d5738b2fbb29&profile_id=164&oauth2_token_id=57447761' type="video/mp4" />
                            </video>
                        </div>

                        <p className='text-right m-0'>
                            <span>&#8362;255</span>
                            <strong className='ml-2'>:מחיר</strong>
                        </p>
                    </div>
                    <div className='video-card'>
                        <h4 className='text-right'>וידאו אפקט</h4>
                
                        <div className='video-box'>
                            <video controls>
                                <source src='https://player.vimeo.com/external/291648067.sd.mp4?s=7f9ee1f8ec1e5376027e4a6d1d05d5738b2fbb29&profile_id=164&oauth2_token_id=57447761' type="video/mp4" />
                            </video>
                        </div>

                        <p className='text-right m-0'>
                            <span>&#8362;255</span>
                            <strong className='ml-2'>:מחיר</strong>
                        </p>
                    </div>
                    <div className='video-card'>
                        <h4 className='text-right'>וידאו אפקט</h4>
                
                        <div className='video-box'>
                            <video controls>
                                <source src='https://player.vimeo.com/external/291648067.sd.mp4?s=7f9ee1f8ec1e5376027e4a6d1d05d5738b2fbb29&profile_id=164&oauth2_token_id=57447761' type="video/mp4" />
                            </video>
                        </div>

                        <p className='text-right m-0'>
                            <span>&#8362;255</span>
                            <strong className='ml-2'>:מחיר</strong>
                        </p>
                    </div>
                    <div className='video-card'>
                        <h4 className='text-right'>וידאו אפקט</h4>
                
                        <div className='video-box'>
                            <video controls>
                                <source src='https://player.vimeo.com/external/291648067.sd.mp4?s=7f9ee1f8ec1e5376027e4a6d1d05d5738b2fbb29&profile_id=164&oauth2_token_id=57447761' type="video/mp4" />
                            </video>
                        </div>

                        <p className='text-right m-0'>
                            <span>&#8362;255</span>
                            <strong className='ml-2'>:מחיר</strong>
                        </p>
                    </div>
                    <div className='video-card'>
                        <h4 className='text-right'>וידאו אפקט</h4>
                
                        <div className='video-box'>
                            <video controls>
                                <source src='https://player.vimeo.com/external/291648067.sd.mp4?s=7f9ee1f8ec1e5376027e4a6d1d05d5738b2fbb29&profile_id=164&oauth2_token_id=57447761' type="video/mp4" />
                            </video>
                        </div>

                        <p className='text-right m-0'>
                            <span>&#8362;255</span>
                            <strong className='ml-2'>:מחיר</strong>
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Videos;