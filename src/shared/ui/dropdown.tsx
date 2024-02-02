'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import { colors } from '@/utils/colors';
import { useInputHandler } from '@/hooks';
import { ArrowUp, SearchIcon, CircleUserRound, Moon, Sun, Utensils } from 'lucide-react';

interface Option {
    id: string;
    name: string;
    photoURL: string
}

interface DropdownProps {
    options: Option[];
    onSelect: (option: Option) => void;
}

export const Dropdown: React.FunctionComponent<DropdownProps> = ({ options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const { handleChange, inputValues } = useInputHandler();

    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    const handleSelect = (option: Option) => {
        setSelectedOption(option);
        onSelect(option);
        setIsOpen(false);
    };

    const searchResult = options.filter(option => option?.name?.toLowerCase()?.includes(inputValues?.searchTerm?.toLowerCase()))

    const dropDownOptions = (inputValues?.searchTerm && searchResult) ? searchResult : options

    return (
        <div className="w-full flex flex-col justify-start gap-1 relative ease-in-out duration-500 z-9">
            <button
                className="text-sm font-medium text-gray-500 w-full text-left rounded cursor-pointer outline-none bg-white border p-[14px] flex items-center justify-between z-8"
                type="button"
                onClick={toggleDropdown}
                aria-haspopup="listbox"
                aria-expanded="true"
                aria-labelledby="listbox-label">
                {selectedOption ? selectedOption.name : 'Select an option'}
                <ArrowUp size={20} strokeWidth={2} absoluteStrokeWidth color={colors[0]?.black} className={`lg:ease-in-out lg:duration-300 ${isOpen && 'rotate-180'}`} />
            </button>
            {isOpen && (
                <div className="bg-white rounded shadow-lg w-full top-14 z-9 flex flex-col gap-2 h-56 overflow-y-scroll p-2" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                    <form className='flex items-center justify-between relative w-full'>
                        <input
                            className='p-2 border border-green w-full rounded placeholder:italic placeholder:text-sm placeholder:font-normal cursor-pointer outline-none text-sm text-gray-500'
                            type='text'
                            placeholder='type your search here...'
                            name="searchTerm"
                            value={inputValues.searchTerm || ''}
                            onChange={(e) => handleChange('searchTerm', e.target.value)}
                        />
                        <button className='bg-green absolute right-2 py-1 px-4 rounded cursor-pointer'>
                            <SearchIcon size={20} strokeWidth={2} absoluteStrokeWidth color={colors[0]?.white} className={`lg:ease-in-out lg:duration-300`} />
                        </button>
                    </form>
                    <div className="flex flex-col justify-start gap-2" role="none">
                        {dropDownOptions.map(option => (
                            <div
                                className="py-2 px-1 hover:bg-grey  ease-in-out duration-300 cursor-pointer flex items-center justify-start gap-1"
                                key={option.id}
                                onClick={() => handleSelect(option)}>
                                {option.photoURL === 'userIcon' ? <CircleUserRound size={30} strokeWidth={2} absoluteStrokeWidth color={colors[0]?.blackLight} className={`lg:ease-in-out lg:duration-300`} />
                                    : option.photoURL === 'day' ? <Sun size={30} strokeWidth={2} absoluteStrokeWidth color={colors[0]?.blackLight} className={`lg:ease-in-out lg:duration-300`} />
                                        : option.photoURL === 'night' ? <Moon size={30} strokeWidth={2} absoluteStrokeWidth color={colors[0]?.blackLight} className={`lg:ease-in-out lg:duration-300`} />
                                            : option.photoURL === 'clear' ? ''
                                                : option.photoURL === 'productIcon' ? <Utensils size={30} strokeWidth={2} absoluteStrokeWidth color={colors[0]?.blackLight} className={`lg:ease-in-out lg:duration-300`} />
                                                    : <figure className='flex items-center justify-center overflow-hidden bg-white border rounded h-16 w-16'>
                                                        <Image
                                                            src={`${option?.photoURL}`}
                                                            alt={`${option?.name}`}
                                                            height={50}
                                                            width={50}
                                                            className='object-contain'
                                                        />
                                                    </figure>
                                }
                                <p className='text-sm text-gray-500 font-medium'>{option.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}