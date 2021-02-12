import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/Auth';
import { Redirect } from 'react-router-dom';

const Logout: React.FC = () => {

    const { userLogout } = useContext(AuthContext);

    useEffect(() => {
        userLogout();
    }, [userLogout]);

    return <Redirect to='/' />;
};

export default Logout;