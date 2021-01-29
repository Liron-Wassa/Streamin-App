import { Container, Col, Row, Button } from 'react-bootstrap';
import React from 'react';

const Videos: React.FC = () => {
    return (
        <Container as='section' className='p-3 my-5'>
            <div className='d-flex justify-content-center mb-2'>
                <Button variant="light" size='sm'>+ הוסף וידיאו</Button>
            </div>
            
            <Row>
                <Col className='d-flex justify-content-center flex-wrap'>
                    <div className='video-card'>
                        <h4 className='text-right'>וידאו אפקט</h4>
                
                        <div className='video-box'>
                            <video controls>
                                <source src='https://player.vimeo.com/external/291648067.sd.mp4?s=7f9ee1f8ec1e5376027e4a6d1d05d5738b2fbb29&profile_id=164&oauth2_token_id=57447761' type="video/mp4" />
                            </video>
                        </div>

                        <p className='text-right'>
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

                        <p className='text-right'>
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

                        <p className='text-right'>
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

                        <p className='text-right'>
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

                        <p className='text-right'>
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

                        <p className='text-right'>
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