import { ChangeEvent, useEffect, useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import InnerHTML from '@dynamic/components/innerHTML';
import * as S from './style';
import * as I from './interface';
import { usePreviewEditModalContext } from '@dynamic/contexts/previewEditModal';
import { useAttachModal } from '@dynamic/contexts/attachModal';
import { useTemplateData } from '@dynamic/contexts/template';
import { buildCreativeLine } from '@dynamic/helpers/banner';
import { useSpreadsheetData } from '@dynamic/contexts/spreadsheetData';
import { useCampaign } from '@dynamic/contexts/campaign';
import { Compress, getBase64Size, toImage } from '@dynamic/helpers/printElement';

const Campaigns: React.FC<I.CampaignProps> = ({ index }) => {
	const [review, setReview] = useState<I.reviewType>('InAnalysis');
	const previewEditModal = usePreviewEditModalContext();
	const { setIsOpen, setRow, row } = useAttachModal();
	const spreadsheetData = useSpreadsheetData();
	const { activeCampaign, campaign, handleChangeCampaign } = useCampaign();
	const html = activeCampaign !== null ? buildCreativeLine(campaign[activeCampaign].template.template, spreadsheetData.spreadsheetData[index].elementos , index) : "";
	
	const handleReviewCampaign = (index: number, rev: I.reviewType) => {
		if (activeCampaign === null) return;		
		var copyCampaign = JSON.parse(JSON.stringify(campaign));
		var indexAproved : number = copyCampaign[activeCampaign].aproved.findIndex(x => x === index);
		var indexReproved : number = copyCampaign[activeCampaign].reproved.findIndex(x => x === index);

		if (rev === 'Approved') {
			if (indexAproved === -1) copyCampaign[activeCampaign].aproved.push(index)
			else copyCampaign[activeCampaign].aproved.splice(indexAproved, 1);
			if (indexReproved !== -1) copyCampaign[activeCampaign].reproved.splice(indexReproved, 1);
		} if (rev === 'Reproved') {
			if (indexReproved === -1) copyCampaign[activeCampaign].reproved.push(index)
			else copyCampaign[activeCampaign].reproved.splice(indexReproved, 1);
			if (indexAproved !== -1) copyCampaign[activeCampaign].aproved.splice(indexAproved, 1);
		}

		handleChangeCampaign(copyCampaign);
		// var index = spreadsheetData.values.elementos
		// setReviewedCampaigns(rev, index);
		// setReview(rev);
	};	

	const handleEditButtonClick = (): void => {
		previewEditModal.setIndex(index);
		previewEditModal.setIsOpen(true);
		setRow(index);
		setIsOpen(false);
	};

	function handleFindStatus(index: number, rev: string) {
		if (activeCampaign === null) return false;
		if (rev === 'Approved') {
			var i : number = campaign[activeCampaign].aproved.findIndex(x => x === index);
			return i !== -1;
		} else if (rev === 'Reproved') {
			var i : number = campaign[activeCampaign].reproved.findIndex(x => x === index);
			return i !== -1;
		}
		return true;
	}

	return (
		<S.Container review={review}>
			<section>
				<p>Linha {index + 1}</p>

				<span className="controls">
					<AiOutlineCheckCircle
						style={{backgroundColor: handleFindStatus(index, 'Approved') ? 'green' : 'white'}}
						onClick={() => handleReviewCampaign(index, 'Approved')}
						className="btnCheck"
					/>
					<AiOutlineCloseCircle
						style={{backgroundColor: handleFindStatus(index, 'Reproved') ? 'red' : 'white'}}
						onClick={() => handleReviewCampaign(index, 'Reproved')}
						className="btnWrong"
					/>
				</span>
			</section>
			<InnerHTML html={html} width={300} height={600} backup={false} />
			<InnerHTML html={html} width={300} height={600} backup={true} index={index} />

			<button type="button" onClick={() => handleEditButtonClick()}>
				Editar
			</button>
		</S.Container>
	);
};

export default Campaigns;
