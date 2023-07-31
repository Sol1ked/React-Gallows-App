import React from 'react';

const Mistakes = ({mistakes, mistakesCount}) => {

    return (
        <div className="min-w-[200px]">
            {mistakes.length > 0 && (
                <div className="flex flex-col gap-4 text-[#fff] text-xl">
                    <p>Ошибок сделано: {mistakesCount}</p>
                    <div className="flex">
                        <p className="mr-2">Ошибки:</p>
                        {mistakes.map((m, index) => (
                            <p key={index} className="mr-1">
                                {m.toUpperCase()}
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Mistakes;