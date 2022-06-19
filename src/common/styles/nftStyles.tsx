import styled from 'styled-components';

export const LeftContentWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`;

export const RightContentWrapper = styled(LeftContentWrapper)`
    align-items: flex-end;
`;

export const CollectionsGridLayout = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    width: inherit;
    overflow-x: scroll;
    overflow: initial;
`;
