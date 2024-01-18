import React from 'react';

const Loading = () => {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <span className="loading loading-ball loading-xs text-primary"></span>
            <span className="loading loading-ball loading-sm text-secondary" ></span>
            <span className="loading loading-ball loading-md text-warning "></span>
            <span className="loading loading-ball loading-lg text-error"></span>
        </div>
    );
};

export default Loading;