import React from 'react';

type Props = {
    color?: string;
};

const UserIcon: React.FC<Props> = ({ color }) => {
    return (
        <svg
            width="17px"
            height="24px"
            viewBox="0 0 21 28"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <title>CAB55267-BF1A-4B7C-8BAB-3E1411441990</title>
            <g
                id="Web-App"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <g
                    id="Owned-Item-Details---Listed"
                    transform="translate(-1280.000000, -50.000000)"
                    stroke={color ?? '#DF6348'}
                    strokeWidth="2.60689655"
                >
                    <g id="Vector" transform="translate(1282.000000, 52.000000)">
                        <path
                            d="M13.9093953,6.39941749 C14.1475048,9.66645732 11.7365718,12.5194046 8.50000629,12.8005495 C5.26344068,12.5194046 2.85250739,9.66645732 3.09061713,6.39941749 C2.85348379,3.13302179 5.26415219,0.281151986 8.50000629,0 C11.7358606,0.281151986 14.1465282,3.13302179 13.9093953,6.39941749 L13.9093953,6.39941749 Z"
                            id="Vector-7"
                        ></path>
                        <path
                            d="M2.5262119,14.4000165 C-3.44247637,16.392013 2.23381224,24 8.5,24 C14.7661881,24 20.4424779,16.392013 14.4737881,14.4000165"
                            id="Vector-8"
                        ></path>
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default UserIcon;
