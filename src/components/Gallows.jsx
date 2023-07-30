import React from 'react';

const Gallows = ({mistakesCount}) => {
    return (
        <img
            className="min-w-[250px]"
            src={`assets/images/gallows${mistakesCount}.svg`}
            alt="image"
        />
    );
};

export default Gallows;
