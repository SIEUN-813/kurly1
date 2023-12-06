import React from 'react';

export default function Title({path, title}) {
    return (
        <div className="title">
            <div className="title-image">
                <a href="!#">
                    <img src={`./images/sub/${title.image}`} alt="" />
                </a>
            </div>
            <h2 className="title-txt">{title.text}</h2>
        </div>
    );
};