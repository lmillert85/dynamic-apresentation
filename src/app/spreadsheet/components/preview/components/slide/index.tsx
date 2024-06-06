import { useEffect, useState } from 'react';
import * as I from '../../interface';
import * as S from './style';
import {
	BsFillArrowLeftCircleFill,
	BsFillArrowRightCircleFill
} from 'react-icons/bs';
import Campaigns from '../campaigns';
import { buildCreativeLine } from '@dynamic/helpers/banner';
import { usePreviewEditModalContext } from '@dynamic/contexts/previewEditModal';

const SlidePreview: React.FC<I.PreviewDataChild> = ({ data }) => {
	const [informations, setInformations] = useState(data);
    const [currentPreview, setCurrentPreview] = useState(0);
	const [campaign, setCampaign] = useState(<></>);
    const previewEditModal = usePreviewEditModalContext();

    useEffect(() => {
        setInformations(syncData);
    }, [previewEditModal.isOpen]);

	useEffect(() => {
		renderCampaign();
	}, [currentPreview, previewEditModal.isOpen]);

	return (
		<S.Container>
			{currentPreview > 0 ? (
				<BsFillArrowLeftCircleFill
					className="iconArrow"
					onClick={() => setCurrentPreview(currentPreview - 1)}
				/>
			) : (
				<></>
			)}
			<div className="campaignContainer">
				{campaign}

				<span className="currentPage">{currentPreview + 1}</span>
			</div>
			{currentPreview + 1 !== informations.length ? (
				<BsFillArrowRightCircleFill
					className="iconArrow"
					onClick={() => setCurrentPreview(currentPreview + 1)}
				/>
			) : (
				<></>
			)}
		</S.Container>
	);
};

export default SlidePreview;
