import styled from 'styled-components';

export const MAIN_COLUMN_WIDTH = 1142;

export const ScreenWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    width: 100vw;
`;

export const CollectionOrNftDetailContainer = styled(ScreenWrapper)`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    max-width: ${MAIN_COLUMN_WIDTH}px;
    width: calc(100% + 25px);
    margin-top: 70px;
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
