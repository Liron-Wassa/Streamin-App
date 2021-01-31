import { Modal, Button, Col, Row, Container, Form } from "react-bootstrap";
import React, { useState } from "react";

interface IAddVideoModal {
  isModalShow: boolean;
  setIsModalShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddVideoModal: React.FC<IAddVideoModal> = ({ isModalShow, setIsModalShow }) => {

  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [src, setSrc] = useState<string>('');

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    console.log(event);
  };

  const loadVideo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
        
    fileReader.readAsDataURL(event.target.files![0]);

    fileReader.onload = () => {
      setSrc(String(fileReader.result));
    };   
  };  

  return (
    <Modal
      show={isModalShow}
      onHide={() => setIsModalShow(false)}
      aria-labelledby="contained-modal-title-vcenter"
      className='AddVideoModal'
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          הוסף וידיאו
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="show-grid">
        <Container>
          <Form onSubmit={submitHandler}>
            <Row>
              <Col md={7}>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <div className='d-flex justify-content-end'>
                    <Form.Label>קטגוריה</Form.Label>
                  </div>

                  <Form.Control
                    as="select"
                    custom
                    dir='rtl'
                    onChange={(event) => setCategory(event.target.value)}
                    required
                    value={category}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
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
                    onChange={loadVideo}
                    accept='video/mov, video/mp4, video/wmv'
                  />
                </Form.Group>

                  <div className='video-box'>
                    <p>תצוגה מקדימה</p>

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
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default AddVideoModal;