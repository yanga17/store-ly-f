'use client'

import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type UserData = {
    userID: string | null;
    token: string | null;
    accessLevel: string | null;
};

export const UserSessionContext = createContext<{
    user: UserData;
    login: (data: UserData) => void;
    logout: () => void;
} | undefined>(undefined);

export const SessionProvider: React.FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserData>(() => {

        if (typeof window !== 'undefined') {
            const storedData = sessionStorage.getItem(`wmmSession`);

            return storedData ? JSON.parse(storedData) : { userID: null, serverIndex: 1, token: null, accessLevel: null }
        }
    });

    const router = useRouter();

    useEffect(() => {
        if (user?.token === null || user?.userID === null) {
            router.push('/login')
        }
    }, [user]);

    const login = async (data: UserData) => {
        setUser(data);

        toast(`Welcome to WMM`,
            {
                icon: '👋',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            }
        );

        router.push("/");
    };

    useEffect(() => { sessionStorage.setItem(`wmmSession`, JSON.stringify(user)) }, [user]);

    const logout = () => {
        sessionStorage.removeItem(`wmmSession`);

        router.push("/login");

        toast(`Signed Out!`,
            {
                icon: '👋',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            }
        );
    };

    return <UserSessionContext.Provider value={{ user, login, logout }}>{children}</UserSessionContext.Provider>;
};

export const useSession = () => {
    const context = useContext(UserSessionContext);

    if (context === undefined) {
        throw new Error('useSession must be used within a UserSessionProvider');
    }

    return context;
};
