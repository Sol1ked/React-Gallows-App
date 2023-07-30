import React from 'react';

const Word = ({letter, isGuessed}) => {
    return (
        <div
            className={`border-b-4 border-b-[#FF7461] inline-flex items-center justify-center h-[50px] w-[20px] text-3xl text-[#fff] p-1`}
        >
            {isGuessed ? letter.toUpperCase() : ''}
        </div>
    );
};

export default Word;
