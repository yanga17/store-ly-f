'use client'

import { ArrowUp } from 'lucide-react';
import React, { useState } from 'react';

import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { colors } from '@/utils/colors';

export const DateTimePicker = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedDay, setSelectedDay] = useState<Date>();

    const toggleDropdown = () => setIsOpen(!isOpen);

    const footer = selectedDay ? (
        <p>You selected {format(selectedDay, 'PPP')}.</p>
    ) : (
        <p>Please pick a day.</p>
    );

    return (
        <div className='w-full cursor-pointer flex flex-col justify-start gap-2 mt-1'>
            <p className='flex items-center justify-between w-full p-[14px] rounded border' onClick={toggleDropdown}>
                <span className='text-gray-500 text-sm font-medium'> Select A Date</span>
                <ArrowUp size={20} strokeWidth={2} absoluteStrokeWidth color={colors?.black} className={`lg:ease-in-out lg:duration-300 ${isOpen && 'rotate-180'}`} />
            </p>
            {isOpen &&
                <DayPicker
                    className='w-full bg-white'
                    mode="single"
                    selected={selectedDay}
                    onSelect={setSelectedDay}
                    footer={footer}
                />
            }
        </div>
    );
}