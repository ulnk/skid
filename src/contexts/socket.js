import React, { useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

const URI = process.env.NODE_ENV === 'production' ? 'https://skid.today' : 'http://localhost:5001';

const SocketContext = React.createContext();

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState();
    const auth = useSelector((state) => state.user);

    useEffect(() => {
        if (!auth._id) return;

        const newSocket = io(URI, {
            auth: {
                token: auth.token
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

