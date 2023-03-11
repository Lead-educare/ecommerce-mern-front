import React from 'react';
import {useSelector} from "react-redux";

const FullscreenLoader = () => {

    const Loader = useSelector(state => state.settings.loader);

    return (
        <>
            <div className={`${Loader} LoadingOverlay`}>
                <div className="Line-Progress">
                    <div className="indeterminate"></div>
                </div>
            </div>
        </>
    );
};

export default FullscreenLoader;