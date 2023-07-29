import React from 'react';

const Modal = ({children, ...props}) => {
    return (
        <div className="
            fixed left-0 right-0 top-0 bottom-0
            w-full h-screen w-screen bg-[#000] bg-opacity-40
            flex items-center justify-center">
            <div {...props}
                 className="min-w-[350px] text-[#fff] text-center text-xl min-h-[240px] flex p-5 items-center justify-center bg-[#3D4552] rounded">
                {children}
            </div>
        </div>
    );
};

export default Modal;