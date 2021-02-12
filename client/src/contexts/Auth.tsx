import React, { useState, createContext } from 'react';
import { userLogin } from '../api/user';

export const AuthContext: React.Context<any> = createContext(null);

interface IAuthContextProvider {
    children: React.ReactNode
};

const AuthContextProvider:React.FC<IAuthContextProvider> = ({ children }) => {

    const [userToken, setUserToken] = useState<string | null>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const userLoginHandler = async (email: string, password: string): Promise<void> => {
        try {
            setIsLoading(true);

            const token = await userLogin(email, password);
            setUserToken(token);

            localStorage.setItem('token', JSON.stringify(token));

        } catch (error) {
            if(error.message === 'Cancel') return;

            setIsLoading(false);
            setError(error.message);
        };
    };

    const userLogout = async (): Promise<void> => {
        localStorage.removeItem('token');
        setUserToken(null);
    };

    const tryAutoLogin = (): void => {        
        const token: string | null = localStorage.getItem('token');

        if(token) {
            setUserToken(JSON.parse(token));
        };
    };

    return (
        <AuthContext.Provider value={{
            userToken,
            error,
            isLoading,
            userLoginHandler,
            userLogout,
            tryAutoLogin
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;