'use client'

import { useState } from 'react';

interface InputValues {
    [key: string]: string;
}

export const useInputHandler = () => {
    const [inputValues, setInputValues] = useState<InputValues>({});

    const handleChange = (name: string, value: string) => {
        setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const clearValues = () => {
        setInputValues({});
    };

    return { inputValues, handleChange, clearValues };
};
