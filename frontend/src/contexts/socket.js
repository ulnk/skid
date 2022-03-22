import React, { useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

const SocketContext = React.createContext();

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const newSocket = io('https://skid.rocks', {
            auth: {
                token: auth.token || null
            }
        });
        setSocket(newSocket);

        return () => newSocket.close();
    }, [auth]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}