import { useState } from 'react';
import { useToggleState } from '..';

export type Tab = {
    label: string;
    content: JSX.Element;
};

type TabsProps = {
    tabs: Tab[];
};

export const Tabs: React.FunctionComponent<TabsProps> = ({ tabs }) => {
    const { isLarge } = useToggleState();
    const [activeTab, setActiveTab] = useState(0);
    const handleTabClick = (index: number) => setActiveTab(index);

    return (
        <div className={`w-full`}>
            <div className={`flex items-center justify-start gap-4 ease-in-out duration-300 ${!isLarge && 'ml-12'}`}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => handleTabClick(index)}
                        className={`w-44 p-2 cursor-pointer rounded uppercase font-medium text-sm tracking-wide ease-in-out duration-500 ${index === activeTab ? 'bg-purple text-white' : 'bg-white text-black'
                            }`}>
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="mt-4">{tabs[activeTab].content}</div>
        </div>
    );
};