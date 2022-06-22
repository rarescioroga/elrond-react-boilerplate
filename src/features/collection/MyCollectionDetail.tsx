import React, { useState } from 'react';
import styled from 'styled-components';

import { ScreenWrapper, BaseFlexRow } from '../../common/styles';
import { getCollectionImageSrc } from '../../utils';
import { useParams } from 'react-router-dom';
import useCollections from './hooks/useCollections';

const Container = styled(ScreenWrapper)`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    max-width: 1227px;
    width: 100%;
    margin-top: 70px;
`;

const LeftContent = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-right: 25px;
`;

const RightContent = styled(LeftContent)`
    flex: 2.43;
    margin-right: 20px;
`;

const MyCollectionDetail: React.FC = () => {
    const { collectionId } = useParams();
    const { getCollectionById, allCollections } = useCollections();
    const [collection, setCollection] = useState<any>(null);
    return (
        <ScreenWrapper>
            <Container>
                <BaseFlexRow>{/*<Image src={getCollectionImageSrc(collection)} />*/}</BaseFlexRow>
            </Container>
        </ScreenWrapper>
    );
};

export default MyCollectionDetail;
