import { Modal, Button, Col, Row, Container, Form, Spinner, Alert } from "react-bootstrap";
import { createVideo, cancelVideoRequest, updateVideo } from "../api/video";
import React, { useState, useEffect, useContext } from "react";
import { ICategories, IVideo } from '../interfaces/video';
import { SocketContext } from "../contexts/Socket";
import { AuthContext } from "../contexts/Auth";
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
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [src, setSrc] = useState<string>('');

  const { socket } = useContext(SocketContext);
  const { userToken } = useContext(AuthContext);

  useEffect(() => {
    if(categories && currentCategory) {
      setCategory(categories[currentCategory]);
    };

    return () => cancelVideoRequest();

  }, [categories, currentCategory]);

  const updateVideoHandler = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      event.preventDefault();

      setError('');
      setIsLoading(true);

      const updatedFields: IVideo = { category, description, price, isUncompleted: false };
      await updateVideo(userToken, videoId, updatedFields);

      setIsLoading(false);
      resetVideoDetails();
      setIsModalShow(false);

      socket.emit('getUpdatedVideos', category);
      
    } catch (error) {
      if(error.message) return;

      resetVideoDetails();
      setIsLoading(false);
      setError(error.message);
    };
  };

  const resetVideoDetails = (): void => {
    setIsLoadingVideoSrc(false);
    setDescription('');
    setPrice('');
    setSrc('');
  };

  const createVideoHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError('');
      setIsLoadingVideoSrc(true);

      const formData = generateVideoForm(event);

      const { videoId, videoSrc } = await createVideo(userToken, formData);      

      setIsLoadingVideoSrc(false);
      setSrc(videoSrc);
      setVideoId(videoId);
      
    } catch (error) {
      console.log(error);
      
      if(error.message === 'Cancel') return;

      setIsLoadingVideoSrc(false);
      setError(error.message);
    };
  };

  const generateVideoForm = (event: React.ChangeEvent<HTMLInputElement>): FormData => {
    const file: File = event.target.files![0];   
  
    const formData: FormData = new FormData();
    formData.append('video', file);

    return formData;
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
          <Form onSubmit={updateVideoHandler}>
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
                        <Form.Label>תיאור</Form.Label>
                      </div>

                      <Form.Control
                        as="textarea"
                        rows={3} type="text"
                        placeholder="הזן תיאור"
                        dir='rtl'
                        required
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
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
              <div className='d-flex justify-content-center align-items-center flex-column' style={{minHeight: '500px'}}>
                {isLoadingVideoSrc ?
                  <>
                    <p className='text-center' style={{color: '#6c757d', letterSpacing: '1px'}}>...אנא המתן בסבלנות בזמן עיבוד הסרטון</p>

                    <Spinner
                      animation="border"
                      variant="secondary"
                      className='mx-auto mt-4'
                    />
                  </>
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
                      onChange={createVideoHandler}
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