import React from 'react';

const Help = ({children, ...props}) => {
    console.log(children)
    return (
        <div {...props} className="absolute bottom-0 left-[40%] py-2 px-6 text-[#fff]  bg-[#3D4552] rounded">
            {children}
        </div>
    );
};

export default Help;