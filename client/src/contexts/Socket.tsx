import { io, Socket } from 'socket.io-client';
import React, { createContext } from 'react';

export const SocketContext: React.Context<any> = createContext(null);

interface ISocketContextProvider {
    children: React.ReactNode
};

const ENDPOINT = '/';

const socket: Socket = io(ENDPOINT);

const SocketContextProvider: React.FC<ISocketContextProvider> = ({ children }) => {

    return (
        <SocketContext.Provider value={{
            socket
        }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContextProvider;