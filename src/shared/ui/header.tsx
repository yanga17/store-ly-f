

interface TableHeaderProps {
    headers: string[];
}

export const TableHeaderModule: React.FunctionComponent<TableHeaderProps> = ({ headers }) => {
    const headerWidth = `${(100 / headers.length)?.toFixed(2)}%`;

    return (
        <div className="bg-white flex items-center justify-between divide-x divide-gray-500 p-2">
            {headers.map((header, index) => (
                <div key={index} className={`flex items-center justify-center w-[${headerWidth}] text-center w-full`}>
                    <p className="text-sm text-gray-500 font-medium">{header}</p>
                </div>
            ))}
        </div>
    );
};

