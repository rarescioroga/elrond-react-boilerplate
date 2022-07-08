import styled from 'styled-components';

export const ScreenWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    width: 100vw;
`;

export const HeaderWrapper = styled.div`
    position: fixed;
    top: 0;
    align-items: center;
    justify-content: center;
    max-width: 1500px;
    width: calc(100% - 64px);
    background-color: white;
    z-index: 2;
`;

export const ComponentsWrapper = styled.div`
    margin-top: 103px;
`;

export const BaseFlexRow = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;
