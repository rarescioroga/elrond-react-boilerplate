import React from 'react';
import styled from 'styled-components';

type Props = {
    children: React.ReactNode;
    theme: {
        primary: string;
        secondary: string;
    };
    onClick: () => void;
};

interface ButtonProps {
    primaryColor: string;
    secondaryColor: string;
}

const StyledButton = styled.button<ButtonProps>`
    padding: 10px 22px;
    background-color: ${({ primaryColor }) => primaryColor};
    color: ${({ secondaryColor }) => secondaryColor};
    font-family: RedHatMono-Regular;
    font-size: 16px;
    border-radius: 24px;
    white-space: nowrap;
    cursor: pointer;
    border: none;
    outline: none;

    box-shadow: ${({ primaryColor, secondaryColor }) =>
        `0 0 40px 40px ${primaryColor} inset, 0 0 0 0 ${secondaryColor}`};
    transition: all 200ms ease-out;

    &:hover {
        background-color: ${({ secondaryColor }) => secondaryColor};
        color: ${({ primaryColor }) => primaryColor};
        box-shadow: ${({ primaryColor, secondaryColor }) =>
            ` 0 0 1px 0 ${secondaryColor} inset, 0 0 1px 1px ${primaryColor}`};
    }
`;

const MainButton: React.FC<Props> = ({ children, theme, onClick }) => {
    return (
        <StyledButton onClick={onClick} primaryColor={theme.primary} secondaryColor={theme.secondary}>
            {children}
        </StyledButton>
    );
};

export default MainButton;
