import React from 'react';

const Gallows = ({mistakesCount}) => {
    return (
        <img
            className="min-w-[250px]"
            src={`src/assets/images/gallows/gallows${mistakesCount}.svg`}
            alt="image"
        />
    );
};

export default Gallows;