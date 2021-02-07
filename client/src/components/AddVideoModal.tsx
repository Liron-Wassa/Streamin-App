import { Modal, Button, Col, Row, Container, Form, Spinner, Alert } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import { ICategories } from '../interfaces/video';
import { SocketContext } from "../contexts/Socket";
import axios from 'axios';
interface IAddVideoModal {
  isModalShow: boolean;
  setIsModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  currentCategory?: string;
  categories?: ICategories;
};

const AddVideoModal: React.FC<IAddVideoModal> = ({ isModalShow, setIsModalShow, currentCategory, categories }) => {
  
  const [isLoadingVideoSrc, setIsLoadingVideoSrc] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('');
  const [videoId, setVideoId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [src, setSrc] = useState<string>('');

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if(categories && currentCategory) {
      setCategory(categories[currentCategory]);
    };
  }, [categories, currentCategory]);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const updateVideo = async (): Promise<void> => {
      setError('');
      setIsLoading(true);
  
      await axios.patch(`/api/videos/${videoId}`, {category, title, price, isUncompleted: false})
      .then(res => {
        setIsLoading(false);
        resetVideoDetails();
        setIsModalShow(false);      
      })
      .catch(error => {
        resetVideoDetails();
        setIsLoading(false);
        setError(error.response.data);
      });
    };

    await updateVideo();
    
    socket.emit('fetchVideos', category);
  };

  const resetVideoDetails = (): void => {
    setTitle('');
    setPrice('');
    setSrc('');
  };

  const createVideo = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = event.target.files![0];   

    const formData: FormData = new FormData();

    formData.append('video', file);

    const configHeaders = {
      headers: { 'Content-Type': 'multipart/form-data' }
    };

    setError('');
    setIsLoadingVideoSrc(true);

    axios.post('/api/videos', formData, configHeaders)
    .then(res => {
      setIsLoadingVideoSrc(false);
      setSrc(res.data.videoPath);
      setVideoId(res.data.videoId);
    })
    .catch(error => {
      setIsLoadingVideoSrc(false);
      setError(error.response.data);
    });
  };

  return (
    <Modal
      show={isModalShow}
      onHide={() => {setIsModalShow(false); resetVideoDetails()}}
      aria-labelledby="contained-modal-title-vcenter"
      className='AddVideoModal'
    >
      
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          הוסף וידיאו
        </Modal.Title>
      </Modal.Header>

      {isLoading &&
        <Spinner
          animation="border"
          variant="secondary"
          className='mx-auto mt-4'
        />
      }

      {error &&
        <Alert variant='danger'>
          {error}
        </Alert>
      }

      <Modal.Body className="show-grid">
        <Container>
          <Form onSubmit={submitHandler}>
            {src ?
              <>
                <Row>
                  <Col md={7}>
                    <Form.Group controlId="exampleForm.SelectCustom">
                      <div className='d-flex justify-content-end'>
                        <Form.Label>קטגוריה</Form.Label>
                      </div>

                      {categories && currentCategory ?
                        <Form.Control
                          as="select"
                          custom
                          dir='rtl'
                          required
                          value={category}
                          disabled={categories && currentCategory ? true : false}
                        >
                          <option>טריילרים</option>
                          <option>מונטאז'ים</option>
                          <option>פרסומות</option>
                        </Form.Control>
                        :
                        <Form.Control
                          as="select"
                          custom
                          dir='rtl'
                          required
                          value={category}
                          onChange={(event) => setCategory(event.target.value)}
                        >
                          <option>טריילרים</option>
                          <option>מונטאז'ים</option>
                          <option>פרסומות</option>
                        </Form.Control>
                      }
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
                        required
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
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
                        required
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <div className='video-box'>
                      {src ?
                        <video controls>
                          <source src={src} type="video/mp4" />
                        </video>
                      : null}
                    </div>
                  </Col>
                </Row>
                
                <Modal.Footer>
                  <Button variant="light" type="submit">
                    הוסף
                  </Button>
                </Modal.Footer>
              </>
            :
              <div className='d-flex justify-content-center align-items-center' style={{minHeight: '500px'}}>
                {isLoadingVideoSrc ?
                  <Spinner
                    animation="border"
                    variant="secondary"
                    className='mx-auto mt-4'
                  />
                :
                  <Form.Group
                    controlId="videoFile"
                    className="mb-2"
                  >
                    <div className='d-flex justify-content-end'>
                      <label htmlFor='videoFile' className="btn btn-light btn-sm m-0">בחר וידיאו</label>
                    </div>

                    <Form.Control
                      type="file"
                      required
                      onChange={createVideo}
                      accept='video/mov, video/mp4, video/wmv'
                    />
                  </Form.Group>
                }
              </div>
            }
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default AddVideoModal;