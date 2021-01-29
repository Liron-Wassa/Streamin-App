import { Container, Image, Table } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import React from 'react';

interface IMyVideos extends RouteComponentProps{}

const MyVideos: React.FC<IMyVideos> = ({ history }) => {    

    const deleteVideoHandler = (): void => {
        if(window.confirm('אתה בטוח ?')) {
            console.log('delete');   
        };
    };

    const editImage = (): void => {
        history.push('/videos/contents/1234/edit');
    };

    return (
        <Container as='section' className='MyVideos my-5'>
            <h2 className='text-center mb-4'>כל הוידיאו</h2>


            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>תאריך</th>
                        <th>ודיאו</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <span>May 10, 2013</span>
                        </td>

                        <td>
                            <div className='d-flex justify-content-end align-items-center flex-wrap'>
                                <i className="far fa-trash-alt m-5" onClick={deleteVideoHandler}></i>
                                <i className="fas fa-edit m-5" onClick={editImage}></i>

                                <Image src='https://cdn.pixabay.com/photo/2021/01/23/13/01/hills-5942468_960_720.jpg' alt='' />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    )
}

export default MyVideos;