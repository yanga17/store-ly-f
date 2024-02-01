'use client'

import React, { createContext, useState, useContext, FC, FunctionComponent, ReactNode } from 'react';

interface ToggleContextType {
    isLarge: boolean;
    toggleState: () => void;
}

const ToggleStateContext = createContext<ToggleContextType | undefined>(undefined);

export const useToggleState = (): ToggleContextType => {
    const context = useContext(ToggleStateContext);

    if (!context) {
        throw new Error('useToggleState must be used within a ToggleStateProvider');
    }

    return context;
};

export const ToggleStateProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    const [isLarge, setIsLarge] = useState<boolean>(false);

    const toggleState = (): void => setIsLarge(prevState => !prevState)

    return <ToggleStateContext.Provider value={{ isLarge, toggleState }}>{children}</ToggleStateContext.Provider>
};
