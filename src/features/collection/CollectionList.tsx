import React from 'react';

const CollectionList: React.FC = () => {
    const array = Array.from(Array(10).keys());

    return (
        <div>
            {array.map((item) => (
                <p key={item}>{item}</p>
            ))}
        </div>
    );
};

export default CollectionList;
