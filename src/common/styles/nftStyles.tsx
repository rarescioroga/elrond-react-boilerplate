import styled from 'styled-components';

import { colorTheme } from '../../constants/colors';

export const PriceContainer = styled.div`
    display: flex;
    flex: 1;
    width: calc(100% - 20px);
    padding: 12px;
    align-items: center;
    justify-content: space-between;
    background-color: ${colorTheme.LIGHT_GREY};
    border-radius: 10px;
`;

export const LeftContentWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`;

export const RightContentWrapper = styled(LeftContentWrapper)`
    align-items: flex-end;
`;
