import { useEffect, useState } from 'react';
import * as I from '../../interface';
import Campaigns from '../campaigns';
import * as S from './style';
import { buildCreativeLine } from '@dynamic/helpers/banner';
import { v4 as uuidv4 } from 'uuid';
import { usePreviewEditModalContext } from '@dynamic/contexts/previewEditModal';

const ScrollView: React.FC<I.PreviewDataChild> = ({ data }) => {
    const [informations, setInformations] = useState(data);
    const previewEditCampaign = usePreviewEditModalContext();

    // useEffect(() => {
    //     setInformations(syncData);
    // }, [previewEditCampaign.isOpen]);

    return (
		<S.Container>
			{informations.map((dataInfo, index) => {
                // const html = buildCreativeLine(document, dataInfo, index);
                return <Campaigns index={index} key={uuidv4()} />
            })}
		</S.Container>
	);
};

export default ScrollView;
