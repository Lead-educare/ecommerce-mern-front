import React from 'react';

const LazyLoader = () => {
    return (
        <>
            <div className="LoadingOverlay">
                <div className="Line_Progress">
                    <div className="indeterminate"></div>
                </div>
            </div>
        </>
    );
};

export default LazyLoader;