import React from 'react';

const Button = ({children, ...props}) => {
    return (
        <button
            className="
                bg-[#FF7461] text-[#fff]
                text-lg
                py-2 px-6 rounded
                focus:ring-4 focus:outline-none focus:ring-gray-100
                dark:focus:ring-[#FF9D8F] dark:bg-[#FF7461] dark:border-[#FF9D8F] dark:text-white dark:hover:bg-[#FF8473]
                "
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;