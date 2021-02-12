import { Form, Button, Container, Spinner, Alert } from 'react-bootstrap';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/Auth';
import { Redirect } from 'react-router-dom';

const Login: React.FC = () => {

    const [passwordIsShown, setPasswordIsShown] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const { userLoginHandler, userToken, isLoading, error } = useContext(AuthContext);

    const isUserAuthenticated: boolean = !!userToken;

    if(isUserAuthenticated) {        
        return <Redirect to='/' />;
    };

    return (
        <Container as='section' className='Login'>
            <h2 className='text-center mb-4'>כניסה</h2>

            {isLoading &&
                <div className='d-flex justify-content-center my-4'>
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
            
            <Form
                onSubmit={(event) => {event.preventDefault(); userLoginHandler(email, password)}}
            >
                <Form.Group controlId="formBasicEmail">
                    <div className='d-flex justify-content-end'>
                        <Form.Label>אימייל</Form.Label>
                    </div>
                    <Form.Control
                        type="email"
                        placeholder="הזן אימייל"
                        className='text-right'
                        required
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <Form.Text className="text-muted text-right">
                        .לעולם לא נשתף את הדוא"ל שלך עם אף אחד אחר
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <div className='d-flex justify-content-end'>
                        <Form.Label className='text-right'>סיסמה</Form.Label>
                    </div>

                    <div className='PasswordInput'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            onMouseDown={() => setPasswordIsShown(true)}
                            onMouseUp={() => setPasswordIsShown(false)}
                            onTouchStart={() => setPasswordIsShown(true)}
                            onTouchEnd={() => setPasswordIsShown(false)}
                            fill='#ccc'
                        >
                            <path
                                d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z"
                            />
                        </svg>
                        <Form.Control
                            type={passwordIsShown  ? "text" : "password"}
                            placeholder="הזן סיסמה"
                            className='text-right'
                            required
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                </Form.Group>

                <div className='d-flex justify-content-end'>
                    <Button variant="light" type="submit">
                        הכנס
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default Login;